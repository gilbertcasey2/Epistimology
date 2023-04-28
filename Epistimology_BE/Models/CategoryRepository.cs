using System;
using Microsoft.EntityFrameworkCore;

namespace Epistimology_BE.Models
{
	public class CategoryRepository : ICategoryRepository
	{
        private List<Category> categories = new List<Category>();
        private int _nextId = 1;

        public CategoryRepository()
        {
            Add(new Category
            {
                id = _nextId,
                name = "All",
                description = "Generic papers on general Social Physics and Systems thinking."
            });
            Add(new Category
            {
                id = _nextId,
                name = "Generic",
                description = "Generic papers on general Social Physics and Systems thinking."
            });
            Add(new Category
            {
                id = _nextId,
                name= "Sensor-Specific",
                description="Papers helping me firgure out how to get data from sensors."
            });
            Add(new Category
            {
                id = _nextId,
                name = "Environmental",
                description = "Papers diving into using computational social science for environmental conservation and climate change."
            });
        }

        public IEnumerable<Category> GetAll()
        {
            return categories;
        }

        public Category Add(Category category)
        {
            if (category == null)
            {
                throw new ArgumentNullException("item");
            }
            category.id = _nextId++;
            categories.Add(category);
            return category;
        }

        public Category UpdateCategory(Category category)
        {
            return null;
        }

        public Category Delete(int? category_id)
        {
            //if(category_id == null)
            //{
            //    throw new ArgumentNullException("bad delete id");
            //}

            //var student = await _context.Students
            //    .AsNoTracking()
            //    .FirstOrDefaultAsync(m => m.ID == id);
            //if (student == null)
            //{
            //    return NotFound();
            //}

            //if (saveChangesError.GetValueOrDefault())
            //{
            //    ViewData["ErrorMessage"] =
            //        "Delete failed. Try again, and if the problem persists " +
            //        "see your system administrator.";
            //}
            return null;
        }

    }
}

