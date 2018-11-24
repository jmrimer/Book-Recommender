using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BooksRUsCore;
using BooksRUsCore.Controllers;
using BooksRUsCore.DTOs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Tests
{
    public class RatingsServiceTest
    {
        
        private readonly BooksRUsDBContext _context;
        private readonly HttpClient _client;

        public RatingsServiceTest()
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
        public async Task GetSortedScoresTest()
        {
            List<EmotionScore> inputScores = new List<EmotionScore>()
            {
                new EmotionScore(1L, 1, 1L, 10),
                new EmotionScore(2L, 1, 2L, 20),
                new EmotionScore(3L, 2, 3L, 30),
                new EmotionScore(4L, 1, 3L, 30),
            };

            List<EmotionScore> actualScores = new RatingsService().sort(inputScores, 1);
            Assert.Equal(3, actualScores.Count());
            Assert.Equal(actualScores.ElementAt(0).emotionscoreid, 4L);
            Assert.Equal(actualScores.ElementAt(2).emotionscoreid, 1L);
        }

        [Fact]
        public async Task GenerateRatingsTest()
        {
            Book book1 = new Book(1L, "t1","a1","pic1");
            Book book2 = new Book(2L, "t2","a2","pic2");
            Book book3 = new Book(3L, "t3","a3","pic3");
            Book[] books = {book1, book2, book3};
            _context.Book.AddRange(books);
            _context.SaveChanges();
            
            EmotionScore book1Score = new EmotionScore(1L, 1, 1L, 10);
            EmotionScore book2Score = new EmotionScore(2L, 1, 2L, 40);
            EmotionScore book3Score = new EmotionScore(3L, 1, 3L, 30);
            List<EmotionScore> scores = new List<EmotionScore>{book2Score, book3Score, book1Score};

            List<Rating> ratings = new RatingsService().generateRatings(_context, scores);
            Assert.Equal(ratings.ElementAt(0).book.author, "a2");
        }
    }
}