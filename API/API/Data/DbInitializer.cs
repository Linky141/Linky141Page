using API.Entities;

namespace API.data;

public class DbInitializer
{
    public static async Task Initialize(PageContext pageContext)
    {
        #region HomePages
        if (!pageContext.HomePages.Any())
        {
            var homePages = new List<HomePage>(){
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
        #endregion

        #region about

        pageContext.SaveChanges();
    }
}