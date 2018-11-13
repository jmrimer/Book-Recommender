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
            // get all scores
//            var rankings = _context.Set<EmotionRanking>();
//            var bestRankingSQL = @"with cte as (
//            select es.emotionid,max(es.bookid) as mbookid,es.score
//                from emotionscore es
//            join(
//                select emotionid, max(score) as score
//            from emotionscore group by emotionid)
//                as mg on es.emotionid = mg.emotionid and es.score = mg.score
//            group by emotionid,score
//            order by emotionid
//                ) select c.emotionid,c.score,b.* from cte c join book b on b.bookid = c.mbookid";
//
//
//            var bestRankings = _context.Database.ExecuteSqlCommand(bestRankingSQL);
//
//            // find best scores
            Console.Out.WriteLine("===================");
//            Console.Out.WriteLine(bestRankings);
            // correlate emotion and book objects
            
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

            var emotions = _context.Set<Emotion>();
            var scores = _context.Set<EmotionScore>();
//            IQueryable<CatDto> someResultVar  = new ObjectModel.Collection(Of CatDto)).AsQueryable().UseAsDataSource().For(Of OrderLineDTO).Where(c => c.Toys.Count() > 1);
//            this.getHighestRecommendations(emotions, scores);
            
            
            foreach (Emotion emotion in emotions)
            {
                
                Console.Out.WriteLine("++++++++++++++");
            }
            foreach (var emotionScore in scores)
            {
                
                Console.Out.WriteLine("++++++++++++++");
                Console.Out.WriteLine(emotionScore.ToString());
            }
            
            // return list


            var recommendation = new Recommendation
            {
                emotion = new Emotion
                {
                    emotionid = 1,
                    emotion = "joy"
                },
                book = new Book
                {
                    bookid = 1L,
                    author = "author",
                    title = "title",
                    PictureFilePath = "picturePath"
                }
            };
//            var recommendations = Enumerable.Empty<Recommendation>().AsQueryable();
//            IQueryable<Recommendation> recs = new List<Recommendation>
//            {
//                recommendation
//            }.AsQueryable();
            
            var recList = new List<Recommendation>();
            recList.Add(recommendation);
            
            var queryRec = recList.AsQueryable();
            
            return queryRec;
        }
    }
}