using System;
using Epistimology_BE.Helpers;
using static Epistimology_BE.Helpers.Constants;

namespace Epistimology_BE.Models
{
	public class Column
	{
		public int id { get; set; }

		public string? name { get; set; }

		public bool isDisplay { get; set; }

		public FIELD_SIZES fieldSize { get; set; }

		public Column()
		{
			isDisplay = false;
		}
	}
}

