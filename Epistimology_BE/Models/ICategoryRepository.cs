using System;
namespace Epistimology_BE.Models
{
    public interface ICategoryRepository
    {
        IEnumerable<Category> GetAll();
        Category Add(Category category);
        Category UpdateCategory(Category category);
    }
}

