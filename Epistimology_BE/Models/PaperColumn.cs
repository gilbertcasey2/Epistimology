using System;
namespace Epistimology_BE.Models
{
	public class PaperColumn
	{
		public int id { get; set; }

		public Paper paper { get; set; }

		public Column column { get; set; }

		public String? value { get; set; }

		public PaperColumn(Column p_column, Paper p_paper)
		{
			column = p_column;
			paper = p_paper;
		}
	}
}

