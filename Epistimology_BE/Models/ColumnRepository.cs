using System;
namespace Epistimology_BE.Models
{
	public class ColumnRepository : IColumnRepository
	{
        private List<Column> columns = new List<Column>();
        private int _nextId = 1;

        public ColumnRepository()
        {

            Add(new Column
            {
                id = _nextId,
                name = "Title",
                isDisplay = true
            });

            Add(new Column
            {
                id = _nextId,
                name = "citation",
                isDisplay = true
            });

            Add(new Column
            {
                id = _nextId,
                name = "discipline",
                isDisplay = true
            });

            Add(new Column
            {
                id = _nextId,
                name = "pAbstract",
                isDisplay = true
            });

            Add(new Column
            {
                id = _nextId,
                name = "notes",
                isDisplay = true
            });
            Add(new Column
            {
                id = _nextId,
                name = "keyConcepts",
                isDisplay = true
            });
            Add(new Column
            {
                id = _nextId,
                name = "interestRating",
                isDisplay = true
            });
            Add(new Column
            {
                id = _nextId,
                name = "year",
                isDisplay = true
            });
            Add(new Column
            {
                id = _nextId,
                name = "keyWords",
                isDisplay = true
            });
            Add(new Column
            {
                id = _nextId,
                name = "authors",
                isDisplay = true
            });
    }

        public IEnumerable<Column> GetAll()
        {
            return columns;
        }

        public Column Add(Column Column)
        {
            if (Column == null)
            {
                throw new ArgumentNullException("item");
            }
            Column.id = _nextId++;
            columns.Add(Column);
            return Column;
        }

        public Column UpdateColumn(Column column)
        {
            return column;
        }

        public Column GetColumn(string columnName)
        {
            Column column = columns.Where(c => c.name == columnName).First();
            return column;
        }
    }
}

