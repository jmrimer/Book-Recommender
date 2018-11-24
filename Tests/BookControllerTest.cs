using System;
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
    public class BookControllerTest
    {
        private readonly BooksRUsDBContext _context;
        private readonly HttpClient _client;

        public BookControllerTest()
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
        public async Task GetAllBooksTest()
        {
            var book = new Book
            {
                title = "title1",
                author = "author",
                pictureFilePath = "cover1"
            };

            _context.Book.Add(book);
            _context.SaveChanges();

            var request = new HttpRequestMessage(new HttpMethod("GET"), "api/book/GetAllBooks");
            var response = await _client.SendAsync(request);
            var jsonResult = await response.Content.ReadAsStringAsync();
            var books = JsonConvert.DeserializeObject<Book[]>(jsonResult);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            book.Should().BeEquivalentTo(books[0]);
        }
    }
}