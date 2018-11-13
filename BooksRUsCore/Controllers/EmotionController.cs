﻿using System.Linq;
using BooksRUs.Model.Core;
using BooksRUs.Model.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]
    public class EmotionController : Controller
    {
        private readonly BooksRUsDBContext _context;

        public EmotionController(BooksRUsDBContext context)
        {
            _context = context;
        }


        [HttpGet("[action]")]
        public IQueryable<Emotion> GetAllEmotions()
        {
            var emotions = _context.Set<Emotion>();
            return emotions;
        }
    }
}