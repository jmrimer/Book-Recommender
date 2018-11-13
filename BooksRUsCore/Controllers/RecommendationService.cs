using System.Collections.Generic;
using System.Linq;
using BooksRUs.Model.Core.DTOs;

namespace BooksRUsCore.Controllers
{
    public class RecommendationService
    {
        public RecommendationService()
        {
        }

        public List<Recommendation> getHighestRecommendations(IQueryable<Emotion> emotions, IQueryable<EmotionScore> scores)
        {
            var recommendations = new List<Recommendation>();
            var bestScores = new List<EmotionScore>();
            
            foreach (EmotionScore score in scores)
            {
                foreach (Emotion emotion in emotions)
                {
                    // collect all into emotion
                    
                    // if the emotions is in, compare it
                    
                        // if greater, replace
                    // else add it
                }
            }
            
//            string connString = @"Server=db550.cecsresearch.org;Port=3306;Database=booksrus;Uid=svc_booksrus;Pwd=7FB*@H4pSKA)e&X(ga.;";
//            IBLLFactory emotionRankingBLL = new BLLFactory(connString);
//            List<string> seenEmotions = new List<string>();
//            List<EmotionRanking> bestRankings = new List<EmotionRanking>();
//            var emotionRanking = emotionRankingBLL.emotionRankingBLL;
//            var rankings = emotionRanking.findBestRankings();
//            foreach (EmotionRanking rank in rankings)
//            {
//                if (!seenEmotions.Contains(rank.emotion))
//                {
//                    seenEmotions.Add(rank.emotion);
//                    bestRankings.Add(rank);
//                }
//            }
//            return bestRankings;
            return recommendations;
        }
    }
}