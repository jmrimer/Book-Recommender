using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BooksRUs.Model;
using BooksRUs.Model.Core.Contracts;
using BooksRUs.Model.Core;
using BooksRUs.Model.Core.Contracts.Helpers;
using BooksRUs.Model.Core.Helpers;
using BooksRUs.Model.Core.DTOs;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]

    public class EmotionScoreController : Controller
    {
        [HttpGet("[action]")]
        public List<EmotionScore> GetAllEmotionScores ()
        {
            string connString = @"Server=db550.cecsresearch.org;Port=3306;Database=booksrus;Uid=svc_booksrus;Pwd=7FB*@H4pSKA)e&X(ga.;";
            IBLLFactory emotionScoreBLL = new BLLFactory(connString);
            var emotionScore = emotionScoreBLL.emotionScoreBLL;           
            return emotionScore.selectAllEmotionScores();
        }

    }
}