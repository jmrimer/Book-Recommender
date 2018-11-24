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
        public string pictureFilePath { get; set; }
        public string bookDescription { get; set; }

        public Book()
        {
        }

        public Book(string title, string author, string pictureFilePath)
        {
            this.title = title;
            this.author = author;
            this.pictureFilePath = pictureFilePath;
        }

        public Book(long bookid, string title, string author, string pictureFilePath)
        {
            this.bookid = bookid;
            this.title = title;
            this.author = author;
            this.pictureFilePath = pictureFilePath;
        }

        public Book(string title, string author, int genreid, string pictureFilePath)
        {
            this.title = title;
            this.author = author;
            this.genreid = genreid;
            this.pictureFilePath = pictureFilePath;
        }
    }
    
    
}
