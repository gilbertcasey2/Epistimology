using System;
namespace Epistimology_BE.Models
{
    public interface IColumnRepository
    {
        IEnumerable<Column> GetAll();
        Column Add(Column category);
        Column UpdateColumn(Column category);
        Column GetColumn(string columnName);
    }
}

