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
using BooksRUs.Model.Core.DTOs;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]

    public class EmotionController : Controller
    {
        private readonly EmotionContext _context;

        public EmotionController(EmotionContext context)
        {
            _context = context;
        }
            
        
        [HttpGet("[action]")]
        public IQueryable<Emotion> GetAllEmotions()
        {
////            string connString = @"Server=db550.cecsresearch.org;Port=3306;Database=booksrus;Uid=svc_booksrus;Pwd=7FB*@H4pSKA)e&X(ga.;";
//            string connString = @"Server=127.0.0.1;Port=3306;Database=BooksRUs;Uid=root;";
//            IBLLFactory bllFactory = new BLLFactory(connString);
//            var emotions = bllFactory.emotionBLL;
//            return emotions.selectAllEmotions();
            var emotions = _context.Set<Emotion>(); 
            return emotions;
            
        }
    }
}