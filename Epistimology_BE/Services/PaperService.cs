using System.Collections.Generic;
using System.Linq;
using Epistimology_BE.Models;
using Epistimology_BE.DataAccess;
using Epistimology_BE.Helpers;
using System.Reflection;
using Newtonsoft.Json.Linq;
using Epistimology_BE.ViewModels;

namespace Epistimology_BE.Services
{
    public interface IPaperService
    {
        IEnumerable<Paper> GetAll();
        Paper GetById(int id);
        Paper? Create(PaperVM paper);
        void Update(int id, Paper paper);
        void Delete(int id);
    }

    public class PaperService : IPaperService
    {
        private EpistimologyContext _context;

        public PaperService(
            EpistimologyContext context)
        {
            _context = context;
        }

        public IEnumerable<Paper> GetAll()
        {
            return _context.papers;
        }

        public Paper GetById(int id)
        {
            //return getPaper(id);
            return null;
        }

        public Paper? Create(PaperVM p_paper)
        {
            if (p_paper == null || p_paper.title == null)
            {
                return null;
            }

            // validate
            if (_context.papers.Any(x => x.title == p_paper.title))
                throw new AppException("Paper with the title '" + p_paper.title + "' already exists");

            Paper paper = new Paper()
            {
                title = p_paper?.title
            };
            _context.papers.Add(paper);

            // get columns
            IEnumerable<Column> columns = GetAllColumns();

            List<PaperColumnValue> paperValues = new List<PaperColumnValue>();

            for (int i = 0; i < p_paper?.values?.Length; i++)
            {
                Dictionary<string, string> field_dict = p_paper.values[i];

                string? name;
                string? value;

                if (!field_dict.TryGetValue("value", out value) || !field_dict.TryGetValue("name", out name))
                {
                    continue;
                }

                Column? col = GetColByName(name);

                if (col != null)
                {
                    PaperColumnValue paper_column = new PaperColumnValue()
                    {
                        value = value,
                    };
                    paper_column.paper = paper;
                    paperValues.Add(paper_column);
                }
            }
            _context.SaveChanges();
            return paper;
        }

        public void Update(int id, Paper new_paper)
        {
            var old_paper = getPaper(id);

            // validate
            if (new_paper.title != old_paper.title && _context.papers.Any(x => x.title == new_paper.title))
                throw new AppException("A paper with the title '" + old_paper.title + "' already exists!");

            // save paper
            _context.papers.Update(new_paper);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = getPaper(id);
            _context.papers.Remove(user);
            _context.SaveChanges();
        }

        // helper methods

        private Paper getPaper(int id)
        {
            var paper = _context.papers.Find(id);
            if (paper == null) throw new KeyNotFoundException("User not found");
            return paper;
        }

        public IEnumerable<Column> GetAllColumns()
        {
            return _context.columns;
        }

        public Column? GetColByName(string? name)
        {
            Column? column = _context.columns.Where(b => b.name == name).FirstOrDefault();
            return column;
        }
    }
}