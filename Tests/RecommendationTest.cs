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

namespace TestProject1
{
    public class RecommendationTest
    {
        private readonly BooksRUsDBContext _context;
        private readonly HttpClient _client;

        public RecommendationTest()
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
        public async Task GetAllRecommendationsTest()
        {
            var book = new Book {bookid = 1L, title = "title", author = "author", PictureFilePath = "picturePath"};
            var emotion = new Emotion {emotionid = 1, emotion = "joy"};
            var emotionScore = new EmotionScore {emotionscoreid = 1, emotionid = emotion.emotionid, bookid = book.bookid, score = 10};
            
            var recommendation = new Recommendation {emotion = emotion, book = book};

            _context.Emotion.Add(emotion);
            _context.Book.Add(book);
            _context.EmotionScore.Add(emotionScore);
            
            _context.SaveChanges();
            
            var request = new HttpRequestMessage(new HttpMethod("GET"), "api/recommendation/GetAllRecommendations");
            var response = await _client.SendAsync(request);
            var jsonResult = await response.Content.ReadAsStringAsync();
            var recommendations = JsonConvert.DeserializeObject<Recommendation[]>(jsonResult);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            recommendation.Should().BeEquivalentTo(recommendations[0]);
        }
    }
}