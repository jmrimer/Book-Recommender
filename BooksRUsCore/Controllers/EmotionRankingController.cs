using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BooksRUsCore.DTOs;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]
    public class EmotionRankingController : Controller
    {
        private readonly BooksRUsDBContext _context;
        public EmotionRankingController(BooksRUsDBContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<EmotionRanking> findBestRanking()
        {


            var emotionRankings = _context.Set<EmotionRanking>();
            
            var results = from x in emotionRankings
                   group x by x.emotionid into h
                    select h.OrderByDescending(z => z.score).FirstOrDefault();

            return results.ToList();

            //string connString = @"Server=db550.cecsresearch.org;Port=3306;Database=booksrus;Uid=svc_booksrus;Pwd=7FB*@H4pSKA)e&X(ga.;";
            //IBLLFactory emotionRankingBLL = new BLLFactory(connString);
            //List<string> seenEmotions = new List<string>();
            //List<EmotionRanking> bestRankings = new List<EmotionRanking>();
            //var emotionRanking = emotionRankingBLL.emotionRankingBLL;
            //var rankings = emotionRanking.findBestRankings();
            //foreach (EmotionRanking rank in rankings)
            //{
            //    if (!seenEmotions.Contains(rank.emotion))
            //    {
            //        seenEmotions.Add(rank.emotion);
            //        bestRankings.Add(rank);
            //    }
            //}
            //return bestRankings;
        }
    }
}