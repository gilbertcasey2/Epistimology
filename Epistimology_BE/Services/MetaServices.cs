using System.Collections.Generic;
using System.Linq;
using Epistimology_BE.Models;
using Epistimology_BE.DataAccess;
using Epistimology_BE.Helpers;

namespace Epistimology_BE.Services
{
    public interface IMetaServices
    {
        IEnumerable<Category> GetAllCategories();
        Category GetCategoryById(int id);
        void CreateCategory(Category paper);
        void UpdateCategory(int id, Category category);
        void DeleteCategory(int id);
        IEnumerable<Column> GetAllColumns();
        void CreateColumn(Column column);
        Column GetColByName(string name);
        int GetColCount();
    }

    public class MetaService : IMetaServices
    {
        private EpistimologyContext _context;

        public MetaService(
            EpistimologyContext context)
        {
            _context = context;
        }

        public IEnumerable<Category> GetAllCategories()
        {
            return _context.categories;
        }

        public Category GetCategoryById(int id)
        {
            return getCategory(id);
        }

        public void CreateCategory(Category category)
        {
            // validate
            if (_context.categories.Any(x => x.name == category.name))
                throw new AppException("Category with the title '" + category.name + "' already exists");

            // do any validation here 

            // save paper
            _context.categories.Add(category);
            _context.SaveChanges();
        }

        public void UpdateCategory(int id, Category new_category)
        {
            Category old_category = getCategory(id);

            // validate
            if (new_category.name != old_category.name && _context.categories.Any(x => x.name == new_category.name))
                throw new AppException("A category with the name '" + new_category.name + "' already exists!");

            // save paper
            _context.categories.Update(new_category);
            _context.SaveChanges();
        }

        public void DeleteCategory(int id)
        {
            var category = getCategory(id);
            _context.categories.Remove(category);
            _context.SaveChanges();
        }

        // helper methods

        private Category getCategory(int id)
        {
            var category = _context.categories.Find(id);
            if (category == null) throw new KeyNotFoundException("Category not found");
            return category;
        }

        public IEnumerable<Column> GetAllColumns()
        {
            return _context.columns;
        }
        public void CreateColumn(Column column)
        {
            // validate
            if (_context.columns.Any(x => x.name == column.name))
                throw new AppException("Column with the name '" + column.name + "' already exists");

            // do any validation here 

            // save paper
            _context.columns.Add(column);
            _context.SaveChanges();
        }

        public Column? GetColByName(string name)
        {
            var column = _context.columns.Where(b => b.name == name).FirstOrDefault();
            return column;
        }

        public int GetColCount()
        {
            return _context.columns.Count();
        }
    }
}