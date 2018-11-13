using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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
    public class EmotionTest
    {
        private readonly BooksRUsDBContext _context;
        private readonly HttpClient _client;

        public EmotionTest()
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
        public async Task GetAllEmotionsTest()
        {
            var emotion = new Emotion
            {
                emotionid = 1,
                emotion = "rage"
            };

            _context.Emotion.Add(emotion);
            _context.SaveChanges();

            var request = new HttpRequestMessage(new HttpMethod("GET"), "api/emotion/GetAllEmotions");
            var response = await _client.SendAsync(request);
            var jsonResult = await response.Content.ReadAsStringAsync();
            var emotions = JsonConvert.DeserializeObject<Emotion[]>(jsonResult);
            
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            emotion.Should().BeEquivalentTo(emotions[0]);
        }
    }
}