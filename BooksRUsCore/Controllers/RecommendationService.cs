using System.Collections.Generic;
using System.Linq;
using BooksRUs.Model.Core;
using BooksRUs.Model.Core.DTOs;

namespace BooksRUsCore.Controllers
{
    public class RecommendationService
    {
        public RecommendationService()
        {
        }

        public List<Recommendation> getHighestRecommendations(
            IQueryable<Emotion> emotions,
            IQueryable<Book> books,
            IQueryable<EmotionScore> scores
        )
        {
            var emotionList = emotions.ToList();
            var scoreList = scores.ToList();
            var bookList = books.ToList();

            var recommendations = new List<Recommendation>();
            var bestScores = new List<EmotionScore>();
            bool found = false;

            foreach (EmotionScore score in scoreList)
            {
                foreach (EmotionScore bestScore in bestScores)
                {
                    if (bestScore.emotionid == score.emotionid)
                    {
                        found = true;
                        if (score.score > bestScore.score)
                        {
                            bestScores.Add(score);
                            bestScores.Remove(bestScore);
                            break;
                        }
                    }
                }

                if (!found) { bestScores.Add(score); }

                found = false;
            }

            foreach (EmotionScore score in bestScores)
            {
                recommendations.Add(new Recommendation
                {
                    emotion = emotionList.Find(emotion => emotion.emotionid == score.emotionid),
                    book = bookList.Find(book => book.bookid == score.bookid)
                });
            }

            return recommendations;
        }
    }
}