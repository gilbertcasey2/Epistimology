using System;
namespace Epistimology_BE.Models
{
	public interface IPaperRepository
	{
        IEnumerable<Paper> GetAll();
        Paper Add(Paper paper);
        Paper UpdatePaper(Paper paper);
    }
}

