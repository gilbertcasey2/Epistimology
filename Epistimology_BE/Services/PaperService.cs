using System.Collections.Generic;
using System.Linq;
using Epistimology_BE.Models;
using Epistimology_BE.DataAccess;
using Epistimology_BE.Helpers;

namespace Epistimology_BE.Services
{
    public interface IPaperService
    {
        IEnumerable<Paper> GetAll();
        Paper GetById(int id);
        void Create(Paper paper);
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

        public void Create(Paper paper)
        {
            // validate
            if (_context.papers.Any(x => x.title == paper.title))
                throw new AppException("Paper with the title '" + paper.title + "' already exists");

            // do any validation here 

            // save paper
            _context.papers.Add(paper);
            _context.SaveChanges();
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
    }
}