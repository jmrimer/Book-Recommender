using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using BooksRUs.Model.Core;
using BooksRUs.Model.Core.DTOs;
using BooksRUsCore;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Xunit;

namespace Tests
{
    public class VoteControllerTest
    {
        private readonly BooksRUsDBContext _context;
        private readonly HttpClient _client;

        public VoteControllerTest()
        {
            var builder = new WebHostBuilder()
                .UseEnvironment("Testing")
                .UseStartup<Startup>();

            var server = new TestServer(builder);

            var options = new DbContextOptionsBuilder<BooksRUsDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = server.Host.Services.GetService(typeof(BooksRUsDBContext)) as BooksRUsDBContext;
            _client = server.CreateClient();
        }

        [Fact]
        public async Task SubmitVotesTest()
        {
            var book = new Book
            {
                title = "title1",
                author = "author",
                PictureFilePath = "cover1"
            };

            var emotion1 = new Emotion
            {
                emotionid = 1,
                emotion = "rage"
            };
            var emotion2 = new Emotion
            {
                emotionid = 2,
                emotion = "joy"
            };

            _context.Book.Add(book);
            _context.Emotion.Add(emotion1);
            _context.Emotion.Add(emotion2);
            _context.SaveChanges();

            book = _context.Book.Find(book);
            emotion1 = _context.Emotion.Find(emotion1);
            
            var score = new EmotionScore
            {
                bookid = book.bookid,
                emotionid = emotion1.emotionid,
                score = 1
            };

            _context.EmotionScore.Add(score);
            _context.SaveChanges();
            
            var request = new HttpRequestMessage(new HttpMethod("POST"), "api/vote/SubmitVotes");
            var response = await _client.SendAsync(request);
            var jsonResult = await response.Content.ReadAsStringAsync();
            var votes = JsonConvert.DeserializeObject<Vote[]>(jsonResult);

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            score = _context.EmotionScore.Find(score);
            //check emotion score responses
            Assert.Equal(score.score, 2);
        }
    }
}