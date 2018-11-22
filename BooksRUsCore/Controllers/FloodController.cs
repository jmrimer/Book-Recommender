using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BooksRUs.Model.Core;
using Google.Apis.Books.v1;
using Google.Apis.Books.v1.Data;
using Google.Apis.Requests;
using Google.Apis.Services;
using Google.Apis.Util;
using Microsoft.AspNetCore.Mvc;

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

            List<Book> books = new List<Book>();
            IList<Volume> volumes = await getVolumes();

            foreach (Volume volume in volumes)
            {
                Console.Out.WriteLine(volume.VolumeInfo.Title);
                books.Add(serializeToBook(volume));
            }

            await saveBooks(books);
        }

        public async Task<IList<Volume>> getVolumes()
        {
            var service = new BooksService(new BaseClientService.Initializer());

            var request = service.Volumes.List("a");
            request.MaxResults = 40;

            Volumes volumes = await request.ExecuteAsync();
            return volumes.Items;
        }

        public Book serializeToBook(Volume volume)
        {
            Book book = new Book()
            {
                author = volume.VolumeInfo.Authors != null ? volume.VolumeInfo.Authors[0] : "unknown author",
                title = volume.VolumeInfo.Title ?? "unknown title",
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