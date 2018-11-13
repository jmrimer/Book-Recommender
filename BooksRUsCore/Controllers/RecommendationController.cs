using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using BooksRUs.Model.Core;
using BooksRUs.Model.Core.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Text;
using Microsoft.EntityFrameworkCore;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]
    public class RecommendationController
    {
        private readonly BooksRUsDBContext _context;

        public RecommendationController(BooksRUsDBContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IQueryable<Recommendation> GetAllRecommendations()
        {
            var emotions = _context.Set<Emotion>();
            var books = _context.Set<Book>();
            var scores = _context.Set<EmotionScore>();

            return new RecommendationService()
                .getHighestRecommendations(emotions, books, scores)
                .AsQueryable();
        }
    }
}