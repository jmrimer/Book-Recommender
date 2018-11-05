using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BooksRUs.Model;
using BooksRUs.Model.Core.Contracts;
using BooksRUs.Model.Core;
using BooksRUs.Model.Core.Contracts.Helpers;
using BooksRUs.Model.Core.Helpers;
using System.Collections.Generic;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]
    public class EmotionRankingController : Controller
    {
        [HttpGet("[action]")]
        public List<EmotionRanking> findBestRanking()
        {
            string connString = @"Server=db550.cecsresearch.org;Port=3306;Database=booksrus;Uid=svc_booksrus;Pwd=7FB*@H4pSKA)e&X(ga.;";
            IBLLFactory emotionRankingBLL = new BLLFactory(connString);
            var emotionRanking = emotionRankingBLL.emotionRankingBLL;
            return emotionRanking.findBestRankings();
        }
    }
}