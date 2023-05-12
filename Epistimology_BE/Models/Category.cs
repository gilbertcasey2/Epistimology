using System;
namespace Epistimology_BE.Models
{
	public class Category
	{
		public int id { get; set; }

		public string? name { get; set; }

        public string? description { get; set; }

        public IList<Paper> papers;

		public Category()
		{
			this.papers = new List<Paper>();
		}

        public Category CopyTo(Category category)
		{
			this.name = category.name;
			this.description = category.description;

			return this;
		}
    }
}

