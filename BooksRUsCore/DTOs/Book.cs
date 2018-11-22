using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BooksRUsCore.DTOs
{
    public class Book
    {
        public long bookid { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public int genreid { get; set; }
        public string PictureFilePath { get; set; }
        public string bookDescription { get; set; }
    }
}
