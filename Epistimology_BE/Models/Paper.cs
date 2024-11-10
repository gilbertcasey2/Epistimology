using System;
namespace Epistimology_BE.Models
{
	public class Paper
	{
		public int id { get; set; }

		public string? title { get; set; }

		public Category? category { get; set; }

		public IList<Tag> tags { get; set; }

		public IList<PaperColumnValue> values;

		public Paper()
		{
			tags = new List<Tag>();
			values = new List<PaperColumnValue>();
		}

	}
}

