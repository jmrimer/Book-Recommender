using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BooksRUsCore.DTOs
{
    public class EmotionScore
    {
        public long emotionscoreid { get; set; }
        public int emotionid { get; set; }
        public long bookid { get; set; }
        public double score { get; set; }
    }
}
