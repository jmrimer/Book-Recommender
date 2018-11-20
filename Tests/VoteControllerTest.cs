using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
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
            var book = new Book {title = "title1", author = "author", PictureFilePath = "cover1"};
            var emotion1 = new Emotion {emotionid = 1, emotion = "rage"};
            var emotion2 = new Emotion {emotionid = 2, emotion = "joy"};

            _context.Book.Add(book);
            _context.Emotion.Add(emotion1);
            _context.Emotion.Add(emotion2);
            _context.SaveChanges();

            book = _context.Book.FirstOrDefault((b) => b.title == book.title);
            emotion1 = _context.Emotion.FirstOrDefault((e) => e.emotion == emotion1.emotion);

            var score = new EmotionScore {bookid = book.bookid, emotionid = emotion1.emotionid, score = 1};

            _context.EmotionScore.Add(score);
            _context.SaveChanges();

            Vote[] votes = {new Vote {book = book, emotion = emotion1}};

            using (var request = new HttpRequestMessage(HttpMethod.Post, "api/vote"))
            {
                var json = JsonConvert.SerializeObject(votes);
                using (var stringContent = new StringContent(json, Encoding.UTF8, "application/json"))
                {
                    request.Content = stringContent;
                    Console.Out.WriteLine("+++++++++++++++++");
                    Console.Out.WriteLine(json);
                    Console.Out.WriteLine(request);
                    using (var response = await _client
                        .SendAsync(request, HttpCompletionOption.ResponseHeadersRead)
                        .ConfigureAwait(false))
                    {
                        response.EnsureSuccessStatusCode();
                    }
                }
            }
//            var response = await _client.SendAsync(request);
//            var jsonResult = await response.Content.ReadAsStringAsync();
//            var votes = JsonConvert.DeserializeObject<Vote[]>(jsonResult);

//            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            score = _context.EmotionScore.Find(score);
            Assert.Equal(score.score, 2);
        }
    }
}