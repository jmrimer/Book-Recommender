using System.Collections.Generic;
using System.Linq;
using BooksRUsCore.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BooksRUsCore.Controllers
{
    [Route("api/ratings")]
    public class RatingsController
    {
        private readonly BooksRUsDBContext _context;

        public RatingsController(BooksRUsDBContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IQueryable<Rating> GetAllRatings(int id)
        {
            List<EmotionScore> scores = _context.Set<EmotionScore>().ToList();

            var sortedScores = new RatingsService().sort(scores, id);
            var ratings = new RatingsService().generateRatings(_context, sortedScores);
            return ratings.AsQueryable();
        }
    }
}