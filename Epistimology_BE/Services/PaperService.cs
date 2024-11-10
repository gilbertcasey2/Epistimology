using System.Collections.Generic;
using System.Linq;
using Epistimology_BE.Models;
using Epistimology_BE.DataAccess;
using Epistimology_BE.Helpers;
using System.Reflection;
using Newtonsoft.Json.Linq;
using Epistimology_BE.ViewModels;
using Microsoft.EntityFrameworkCore;
using Azure;
using System.Collections;

namespace Epistimology_BE.Services
{
    public interface IPaperService
    {
        IEnumerable<PaperReturnVM> GetAll();
        Paper GetById(int id);
        Paper? Create(PaperVM paper);
        Paper? Update(PaperVM paper);
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

        public IEnumerable<PaperReturnVM> GetAll()
        {
            List<Paper> papers = _context.papers.Include(v => v.values).ThenInclude(c => c.column).ToList();
            List<PaperReturnVM> paperVMs = new List<PaperReturnVM>();
            foreach (Paper paper in papers)
            {
                PaperReturnVM paperVM = new PaperReturnVM(paper.id, paper.title);
                Dictionary<string, string>[] colValues = new Dictionary<string, string>[paper.values.Count];
                for (int i = 0; i < paper.values.Count; i++)
                {
                    string? colName = paper.values[i].column?.name;
                    string? colValue = paper.values[i].value;
                    if (colName == null)
                    {
                        return null;
                    }
                    colValues[i] = new Dictionary<string, string>();
                    colValues[i].Add("name", colName);
                    colValues[i].Add("value", colValue);
                }
                paperVM.values = colValues;
                paperVMs.Add(paperVM);
            }
            return paperVMs;

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

            Column? titleCol = GetColByName("Title");

            Paper paper = new Paper();

            // Give it value for title column
            PaperColumnValue title = new PaperColumnValue()
            {
                value = p_paper.title,
                column = titleCol
            };
            paper.values.Add(title);

            _context.papers.Add(paper);

            List<PaperColumnValue> paperValues = new List<PaperColumnValue>();

            for (int i = 0; i < p_paper.values?.Length; i++)
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
                        paper = paper
                    };
                    paper_column.column = col;
                    paper.values.Add(paper_column);
                }
            }
            _context.SaveChanges();
            return paper;
        }

        public Paper? Update(PaperVM new_paper)
        {
            var old_paper = getPaper(new_paper.id);

            if (old_paper == null)
            {
                return null;
            }

            List<PaperColumnValue> newVals = new List<PaperColumnValue>();

            // validate
            if (new_paper.title != old_paper.title && _context.papers.Any(x => x.title == new_paper.title))
                throw new AppException("A paper with the title '" + old_paper.title + "' already exists!");

            for (int i = 0; i < new_paper.values?.Length; i++)
            {
                Dictionary<string, string> field_dict = new_paper.values[i];

                string? name;
                string? value;

                if (!field_dict.TryGetValue("value", out value) || !field_dict.TryGetValue("name", out name))
                {
                    continue;
                }

                Column? col = GetColByName(name);

                PaperColumnValue paper_column = new PaperColumnValue()
                {
                    value = value,
                    paper = old_paper
                };
                paper_column.column = col;
                newVals.Add(paper_column);
            }
            
            old_paper.values = newVals;

            // save paper
            _context.papers.Update(old_paper);
            _context.SaveChanges();
            return old_paper;
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
            var paper = _context.papers.Include(v => v.values).ThenInclude(c => c.column).FirstOrDefault(x => x.id == id);
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