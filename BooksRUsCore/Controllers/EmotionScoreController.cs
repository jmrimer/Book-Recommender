using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BooksRUsCore.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]

    public class EmotionScoreController : Controller
    {

        private readonly BooksRUsDBContext _context;
        public EmotionScoreController(BooksRUsDBContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<EmotionScore> GetAllEmotionScores ()
        {
            return _context.Set<EmotionScore>().ToList();

            //string connString = @"Server=db550.cecsresearch.org;Port=3306;Database=booksrus;Uid=svc_booksrus;Pwd=7FB*@H4pSKA)e&X(ga.;";
            //IBLLFactory emotionScoreBLL = new BLLFactory(connString);
            //var emotionScore = emotionScoreBLL.emotionScoreBLL;           
            //return emotionScore.selectAllEmotionScores();
        }

    }
}