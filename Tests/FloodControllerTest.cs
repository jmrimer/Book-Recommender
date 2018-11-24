using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using BooksRUs.Model.Core;
using BooksRUsCore;
using BooksRUsCore.Controllers;
using BooksRUsCore.DTOs;
using Google.Apis.Books.v1;
using Google.Apis.Books.v1.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Tests
{
    public class FloodControllerTest
    {
        private readonly BooksRUsDBContext _context;
        private readonly HttpClient _client;

        public FloodControllerTest()
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
        public async Task Retrieve40BooksTest()
        {
            FloodController subject = new FloodController(_context);
            IList<Volume> volumes = await subject.getVolumes();
           
            Assert.Equal(40, volumes.Count);
        }

        [Fact]
        public async Task SerializeVolumeIntoBookTest()
        {
            FloodController subject = new FloodController(_context);
            IList<Volume> books = await subject.getVolumes();
            Book book = subject.serializeToBook(books[0]);
            Assert.Equal(books[0].VolumeInfo.Authors[0], book.author);
            Assert.Equal(books[0].VolumeInfo.Title, book.title);
        }

        [Fact]
        public async Task SaveBooksTest()
        {
            FloodController subject = new FloodController(_context);
            List<Book> books = new List<Book>()
            {
                new Book{author = "a1", title = "title1", pictureFilePath = "pic1"},
                new Book{author = "a2", title = "title2", pictureFilePath = "pic2"},
                new Book{author = "a3", title = "title3", pictureFilePath = "pic3"},
            };
            await subject.saveBooks(books);

            var actualBooks = _context.Set<Book>();
            
            Assert.Equal(3, actualBooks.Count());
        }

        [Fact]
        public async Task GetAndSave10Books()
        {
            var request = new HttpRequestMessage(new HttpMethod("GET"), "api/flood");
            var response = await _client.SendAsync(request);
            
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal(40, _context.Set<Book>().Count());
        }
        
    }
}