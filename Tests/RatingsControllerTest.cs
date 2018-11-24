using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    public class RatingsControllerTest
    {
        private readonly BooksRUsDBContext _context;
        private readonly HttpClient _client;

        public RatingsControllerTest()
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
        public async Task GetAllRatingsTest()
        {
            Book book1 = new Book(1L, "t1","a1","pic1");
            Book book2 = new Book(2L, "t2","a2","pic2");
            Book book3 = new Book(3L, "t3","a3","pic3");
            Book[] books = {book1, book2, book3};
            _context.Book.AddRange(books);
            
            EmotionScore book1Score = new EmotionScore(1L, 1, 1L, 10);
            EmotionScore book2Score = new EmotionScore(2L, 1, 2L, 40);
            EmotionScore book3Score = new EmotionScore(3L, 1, 3L, 30);
            EmotionScore[] scores = {book1Score, book2Score, book3Score};
            _context.EmotionScore.AddRange(scores);
            _context.EmotionScore.AddRange(scores);
            _context.SaveChanges();
            
            var request = new HttpRequestMessage(new HttpMethod("GET"), "api/ratings/1");
            var response = await _client.SendAsync(request);
            var jsonResult = await response.Content.ReadAsStringAsync();
            var ratings = JsonConvert.DeserializeObject<Rating[]>(jsonResult);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            ratings[0].Should().BeEquivalentTo(new Rating(1, book2));
            ratings[1].Should().BeEquivalentTo(new Rating(2, book3));
            ratings[2].Should().BeEquivalentTo(new Rating(3, book1));
        }
    }
}