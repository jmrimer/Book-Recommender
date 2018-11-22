using BooksRUsCore.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BooksRUsCore
{
    public class BooksRUsDBContext : DbContext
    {
        public BooksRUsDBContext(DbContextOptions<BooksRUsDBContext> options)
            : base(options)
        {
        }

        public DbSet<Emotion> Emotion { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<EmotionScore> EmotionScore { get; set; }
    }
}