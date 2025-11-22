using API.Domain.Entities;

namespace API.Infrastructure.Data;

public class DbInitializer
{
    public static async Task Initialize(PageContext pageContext)
    {
        #region HomePages
        if (!pageContext.HomePages.Any())
        {
            var homePages = new List<HomePage>()
            {
                new HomePage(){
                    Title="title",
                    Content="content"
                }
            };

            foreach (var homePage in homePages)
            {
                pageContext.HomePages.Add(homePage);
            }
        }
        #endregion HomePages

        #region Abouts

        if (!pageContext.Abouts.Any())
        {
            var abouts = new List<About>()
            {
                new About(){Content="sample content"}
            };

            foreach (var about in abouts)
            {
                pageContext.Abouts.Add(about);
            }
        }
        #endregion Abouts

        #region Contacts

        if (!pageContext.Contacts.Any())
        {
            var contacts = new List<Contact>()
            {
                new Contact(){ContactName="contact 1", ContactValue="contact 1 content example"},
                new Contact(){ContactName="contact 2", ContactValue="contact 2 content example"},
                new Contact(){ContactName="contact 3", ContactValue="contact 3 content example"},
            };

            foreach (var contact in contacts)
            {
                pageContext.Contacts.Add(contact);
            }
        }

        #endregion Contacts

        #region Downloads

        if (!pageContext.Downloads.Any())
        {
            var downloads = new List<Downloads>()
            {
                new Downloads(){Name="Downloads 1", Description="Downloads 1 description", DownloadLink="https://www.google.pl/", UploadDate=1714514855902},
                new Downloads(){Name="Downloads 2", Description="Downloads 2 description", DownloadLink="https://www.google.pl/", UploadDate=1714514855902},
                new Downloads(){Name="Downloads 3", Description="Downloads 3 description", DownloadLink="https://www.google.pl/", UploadDate=1714514855902},
            };

            foreach (var download in downloads)
            {
                pageContext.Downloads.Add(download);
            }
        }

        #endregion Downloads

        #region Projects
        if (!pageContext.Projects.Any())
        {
            var projects = new List<Projects>()
            {
                new Projects()
                {
                    Title="project 1",
                    Description="project 1 description",
                    Github="https://www.google.pl/",
                    LastUpdate=1714514855902,
                    Photos = [ "https://picsum.photos/200", "https://picsum.photos/500", "https://picsum.photos/300",],
                    Comments =
                    [
                            new Comment(){User="user 1", Content="content 1", Date=1714514855902},
                            new Comment(){User="user 2", Content="content 2", Date=1714514855902},
                            new Comment(){User="user 3", Content="content 3", Date=1714514855902}
                    ]
                },
                       new Projects()
                {
                    Title="project 2",
                    Description="project 2 description",
                    Github="https://www.google.pl/",
                    LastUpdate=1714514855902,
                    Photos = [ "https://picsum.photos/200", "https://picsum.photos/500", "https://picsum.photos/300",],
                    Comments =
                    [
                            new Comment(){User="user 1", Content="content 1", Date=1714514855902},
                            new Comment(){User="user 2", Content="content 2", Date=1714514855902},
                            new Comment(){User="user 3", Content="content 3", Date=1714514855902}
                    ]
                },
            };

            foreach (var project in projects)
            {
                pageContext.Projects.Add(project);
            }
        }

        #endregion Projects

        pageContext.SaveChanges();
    }
}