using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using BooksRUsCore;
using BooksRUsCore.DTOs;
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
        public async Task AddOrUpdateTest()
        {
            
        }
        
        [Fact]
        public async Task SubmitVotesTest()
        {
            var book = new Book {title = "title1", author = "author", PictureFilePath = "cover1"};
            var emotion1 = new Emotion {emotionid = 1, emotion = "rage"};
            var emotion2 = new Emotion {emotionid = 2, emotion = "joy"};

            _context.Book.Add(book);
            _context.Emotion.Add(emotion1);
            _context.Emotion.Add(emotion2);
            _context.SaveChanges();

            book = _context.Book.FirstOrDefault((b) => b.title == book.title);
            emotion1 = _context.Emotion.FirstOrDefault((e) => e.emotion == emotion1.emotion);

            var score = new EmotionScore {emotionscoreid = 1, bookid = book.bookid, emotionid = emotion1.emotionid, score = 3};

            _context.EmotionScore.Add(score);
            _context.SaveChanges();
            
            score = _context.EmotionScore.Find(1L);
            Assert.Equal(3, score.score);

            Vote[] votes = {new Vote {book = book, emotion = emotion1}};
  
            using (var request = new HttpRequestMessage(HttpMethod.Post, "api/vote"))
            {
                var json = JsonConvert.SerializeObject(votes);
                using (var stringContent = new StringContent(json, Encoding.UTF8, "application/json"))
                {
                    request.Content = stringContent;
                    using (var response = await _client
                        .SendAsync(request, HttpCompletionOption.ResponseHeadersRead)
                        .ConfigureAwait(false))
                    {
                        response.EnsureSuccessStatusCode();
                    }
                }
            }

            score = _context.EmotionScore.Find(1L);
            Assert.Equal(4, score.score);
        }
    }
}