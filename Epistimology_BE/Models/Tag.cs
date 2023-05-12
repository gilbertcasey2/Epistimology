using System;
namespace Epistimology_BE.Models
{
	public class Tag
	{
		public int id { get; set; }

		public string? name { get; set; }

		public string? color { get; set; }

        public IList<Paper> papers { get; set; }

        public Tag()
        {
            this.papers = new List<Paper>();
        }

        public Tag CopyTo(Tag tag)
        {
            this.name = tag.name;
            this.color = tag.color;

            return this;
        }
    }
}

