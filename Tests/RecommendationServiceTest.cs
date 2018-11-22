using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BooksRUsCore.Controllers;
using BooksRUsCore.DTOs;
using FluentAssertions;
using Microsoft.Rest.TransientFaultHandling;
using Xunit;

namespace TestProject1
{
    public class RecommedationServiceTest
    {
        [Fact]
        public async Task getHighestRecommendationsTest()
        {
            List<Recommendation> actualRecs;
            Emotion emotion1 = new Emotion {emotion = "joy", emotionid = 1};
            Emotion emotion2 = new Emotion {emotion = "rage", emotionid = 2};
            Book book1 = new Book {bookid = 1L, author = "author1", title = "title1"};
            Book book2 = new Book {bookid = 2L, author = "author2", title = "title2"};
            EmotionScore score1 = new EmotionScore
            {
                emotionscoreid = 1L,
                emotionid = emotion1.emotionid,
                bookid = book1.bookid,
                score = 1
            };
            EmotionScore score2 = new EmotionScore
            {
                emotionscoreid = 2L,
                emotionid = emotion1.emotionid,
                bookid = book2.bookid,
                score = 2
            };
            EmotionScore score3 = new EmotionScore
            {
                emotionscoreid = 1L,
                emotionid = emotion2.emotionid,
                bookid = book1.bookid,
                score = 2
            };
            EmotionScore score4 = new EmotionScore
            {
                emotionscoreid = 2L,
                emotionid = emotion2.emotionid,
                bookid = book2.bookid,
                score = 1
            };


            var emotionList = new List<Emotion>();
            emotionList.Add(emotion1);
            emotionList.Add(emotion2);
            IQueryable<Emotion> emotions = emotionList.AsQueryable();

            var bookList = new List<Book>();
            bookList.Add(book1);
            bookList.Add(book2);
            IQueryable<Book> books = bookList.AsQueryable();

            var scoreList = new List<EmotionScore>();
            scoreList.Add(score1);
            scoreList.Add(score2);
            scoreList.Add(score3);
            scoreList.Add(score4);
            IQueryable<EmotionScore> scores = scoreList.AsQueryable();

            Recommendation[] expectedRecs =
            {
                new Recommendation {emotion = emotion1, book = book2},
                new Recommendation {emotion = emotion2, book = book1}
            };

            var subject = new RecommendationService();
            actualRecs = subject.getHighestRecommendations(emotions, books, scores);

            actualRecs.Should().BeEquivalentTo(expectedRecs);
        }
    }
}