using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BooksRUs.Model;
using BooksRUs.Model.Core.Contracts;
using BooksRUs.Model.Core;
using BooksRUs.Model.Core.Contracts.Helpers;
using BooksRUs.Model.Core.Helpers;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        [HttpGet("[action]")]
        public List<Book> GetAllBooks()
        {
            string connString = @"Server=db550.cecsresearch.org;Port=3306;Database=booksrus;Uid=svc_booksrus;Pwd=7FB*@H4pSKA)e&X(ga.;";
            IBLLFactory bookBll = new BLLFactory(connString);
            var book = bookBll.bookBLL;
            IListToJsonString json = new ListToJsonString();
            return book.selectAllBook();            
        }
    }
}