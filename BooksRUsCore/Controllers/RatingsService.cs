using System.Collections.Generic;
using System.Linq;
using BooksRUsCore.DTOs;

namespace BooksRUsCore.Controllers
{
    public class RatingsService
    {
        public List<EmotionScore> sort(List<EmotionScore> scores, int emotionId)
        {
            var emotionScores = scores.FindAll(score => score.emotionid.Equals(emotionId));
            return emotionScores.OrderByDescending(score => score.score).ToList();
        }

        public List<Rating> generateRatings(BooksRUsDBContext context, List<EmotionScore> scores)
        {
            List<Rating> ratings = new List<Rating>();
            int rank = 1;
            scores.ForEach(score =>
                {
                    ratings.Add(new Rating(rank, context.Book.Find(score.bookid)));
                    rank++;
                }
            );
            return ratings;
        }
    }
}