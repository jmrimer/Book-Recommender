using System.Linq;
using BooksRUsCore.DTOs;
using Microsoft.AspNetCore.Mvc;

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