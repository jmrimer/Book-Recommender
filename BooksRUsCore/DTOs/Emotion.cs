using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BooksRUsCore.DTOs
{
    public class Emotion
    {
        public int emotionid { get; set; }
        public string emotion { get; set; }

        public Emotion()
        {
        }

        public Emotion(int emotionid, string emotion)
        {
            this.emotionid = emotionid;
            this.emotion = emotion;
        }
    }
}
