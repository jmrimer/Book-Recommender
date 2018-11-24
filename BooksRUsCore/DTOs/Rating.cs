namespace BooksRUsCore.DTOs
{
    public class Rating
    {
        public int rank;
        public Book book;

        public Rating(int rank, Book book)
        {
            this.rank = rank;
            this.book = book;
        }
    }
}