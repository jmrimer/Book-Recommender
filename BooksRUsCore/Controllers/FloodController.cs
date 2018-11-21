using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using BooksRUs.Model.Core;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Books;
using Google.Apis.Books.v1;
using Google.Apis.Books.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util;

namespace BooksRUsCore.Controllers
{
    [Route("api/flood")]
    public class FloodController
    {
        private readonly BooksRUsDBContext _context;
        private static String url = "https://www.googleapis.com/books/v1/volumes?q={filter=free-ebooks}";

        public FloodController(BooksRUsDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task Get()
        {
            var service = new BooksService(new BaseClientService.Initializer());
            var volumes = await service.Volumes.List(
                    "filter=free-ebooks"
                )
                .ExecuteAsync();

            List<Book> books = new List<Book>();
            
            foreach (Volume volume in volumes.Items)
            {
                books.Add(serializeToBook(volume));
            }
            
            await saveBooks(books);
        }

        public async Task<IList<Volume>> getBooks()
        {
            var service = new BooksService(new BaseClientService.Initializer());
            var volumes = await service.Volumes
                .List("filter=free-ebooks")
                .ExecuteAsync();
            return volumes.Items;
        }

        public Book serializeToBook(Volume volume)
        {
            Book book = new Book()
            {
                author = volume.VolumeInfo.Authors != null ? volume.VolumeInfo.Authors[0] : "unknown author",
                title = volume.VolumeInfo.Title ?? "unknown title" ,
                PictureFilePath = getPicturePath(volume),
                genreid = 1,
            };

            return book;
        }

        public async Task saveBooks(List<Book> books)
        {
            await _context.Book.AddRangeAsync(books);
            await _context.SaveChangesAsync();
        }

        public string getPicturePath(Volume volume)
        {
            if (volume.VolumeInfo.ImageLinks == null)
            {
                return "";
            }
            if (volume.VolumeInfo.ImageLinks.Medium != null)
            {
                return volume.VolumeInfo.ImageLinks.Medium;
            }

            if (volume.VolumeInfo.ImageLinks.Large != null)
            {
                return volume.VolumeInfo.ImageLinks.Large;
            }

            if (volume.VolumeInfo.ImageLinks.ExtraLarge != null)
            {
                return volume.VolumeInfo.ImageLinks.ExtraLarge;
            }

            if (volume.VolumeInfo.ImageLinks.Small != null)
            {
                return volume.VolumeInfo.ImageLinks.Small;
            }

            if (volume.VolumeInfo.ImageLinks.Thumbnail != null)
            {
                return volume.VolumeInfo.ImageLinks.Thumbnail;
            }

            if (volume.VolumeInfo.ImageLinks.SmallThumbnail != null)
            {
                return volume.VolumeInfo.ImageLinks.SmallThumbnail;
            }

            return "";
        }
    }
}