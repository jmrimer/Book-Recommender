using System.Linq;
using BooksRUsCore.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly BooksRUsDBContext _context;

        public BookController(BooksRUsDBContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IQueryable<Book> GetAllBooks()
        {
            var books = _context.Set<Book>();
            return books;
        }
    }
}