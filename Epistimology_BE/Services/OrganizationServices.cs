using System.Collections.Generic;
using System.Linq;
using Epistimology_BE.Models;
using Epistimology_BE.DataAccess;
using Epistimology_BE.Helpers;

namespace Epistimology_BE.Services
{
    public interface IOrganizationServices
    {
        // Categories
        IEnumerable<Category> GetAllCategories();
        Category GetCategoryById(int id);
        void CreateCategory(Category paper);
        void UpdateCategory(int id, Category category);
        void DeleteCategory(int id);

        // Columns 
        IEnumerable<Column> GetAllColumns();
        void CreateColumn(Column column);
        void UpdateColumn(int id, Column column);
        void DeleteColumn(int id);
        Column? GetColByName(string name);
        int GetColCount();

        // Tags
        IEnumerable<Tag> GetAllTags();
        void CreateTag(Tag tag);
        void UpdateTag(int id, Tag tag);
        void DeleteTag(int id);
    }

    public class OrganizationService : IOrganizationServices
    {
        private EpistimologyContext _context;

        public OrganizationService(
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
            if (new_category.name?.ToLower() != old_category.name?.ToLower() && _context.categories.Any(x => x.name == new_category.name))
                throw new AppException("A category with the name '" + new_category.name + "' already exists!");

            old_category.CopyTo(new_category);

            // save paper
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


        /** Column Methods */

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

            // save column
            _context.columns.Add(column);
            _context.SaveChanges();
        }

        public void UpdateColumn(int id, Column new_column)
        {
            Column old_column = getColumn(id);

            // validate
            if (new_column.name?.ToLower() != old_column.name?.ToLower() && _context.columns.Any(x => x.name == new_column.name))
                throw new AppException("A category with the name '" + new_column.name + "' already exists!");

            old_column.CopyTo(new_column);

            // save paper
            _context.SaveChanges();
        }

        public void DeleteColumn(int id)
        {
            Column column = getColumn(id);
            _context.columns.Remove(column);
            _context.SaveChanges();
        }

        // helper methods

        private Column getColumn(int id)
        {
            Column? column = _context.columns.Find(id);
            if (column == null) throw new KeyNotFoundException("Column not found");
            return column;
        }

        public Column? GetColByName(string name)
        {
            Column? column = _context.columns.Where(b => b.name == name).FirstOrDefault();
            return column;
        }

        public int GetColCount()
        {
            return _context.columns.Count();
        }

        /** Tag Methods */

        public IEnumerable<Tag> GetAllTags()
        {
            return _context.tags;
        }
        public void CreateTag(Tag tag)
        {
            // validate
            if (_context.tags.Any(x => x.name == tag.name))
                throw new AppException("Column with the name '" + tag.name + "' already exists");

            // do any validation here 

            // save column
            _context.tags.Add(tag);
            _context.SaveChanges();
        }

        public void UpdateTag(int id, Tag new_tag)
        {
            Tag old_tag = getTag(id);

            // validate
            if (new_tag.name?.ToLower() != old_tag.name?.ToLower() && _context.tags.Any(x => x.name == new_tag.name))
                throw new AppException("A category with the name '" + new_tag.name + "' already exists!");

            old_tag.CopyTo(new_tag);

            // save tag
            _context.SaveChanges();
        }

        public void DeleteTag(int id)
        {
            Tag tag = getTag(id);
            _context.tags.Remove(tag);
            _context.SaveChanges();
        }

        // helper methods

        private Tag getTag(int id)
        {
            Tag? tag = _context.tags.Find(id);
            if (tag == null) throw new KeyNotFoundException("Column not found");
            return tag;
        }
    }
}