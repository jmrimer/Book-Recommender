using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BooksRUsCore.DTOs
{
    public class EmotionRanking
    {
        public long bookid { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public int genreid { get; set; }
        public string PictureFilePath { get; set; }
        public string bookDescription { get; set; }
        public long emotionid { get; set; }
        public string emotion { get; set; }
        public long emotionscoreid { get; set; }
        public double score { get; set; }
    }
}
