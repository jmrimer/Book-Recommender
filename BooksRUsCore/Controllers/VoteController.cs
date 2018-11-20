using System;
using System.Linq;
using System.Threading.Tasks;
using BooksRUs.Model.Core.DTOs;
using Microsoft.AspNetCore.JsonPatch.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace BooksRUsCore.Controllers
{
    [Route("api/[controller]")]
    public class VoteController : Controller
    {
        private readonly BooksRUsDBContext _context;

        public VoteController(BooksRUsDBContext context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        public IActionResult SubmitVotes(Vote[] votes)
        {
            Console.Out.WriteLine("-----------------");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
//            var emotionScores = _context.EmotionScore.Where((score) => score.bookid == votes[0].book.bookid);

//            if (emotionScores.Count().Equals(0))
//            {
//                foreach (var vote in votes)
//                {
//                    _context.EmotionScore.AddAsync(
//                        new EmotionScore
//                        {
//                            bookid = vote.book.bookid,
//                            emotionid = vote.emotion.emotionid,
//                            score = 1
//                        }
//                    );
//                }
//            }
//            else
//            {
//                foreach (EmotionScore emotionScore in emotionScores)
//                {
//                    foreach (Vote vote in votes)
//                    {
//                        if (vote.emotion.emotionid == emotionScore.emotionid)
//                        {
//                            emotionScore.score = emotionScore.score + 1;
//                            _context.Update(emotionScore);
//                        }
//                    }
//                }
//            }
//
//            _context.SaveChanges();
//
//            emotionScores = _context.EmotionScore.Where((score) => score.bookid == votes[0].book.bookid);
            return CreatedAtRoute("SubmitVotes", new {id = 1});
        }
    }
}