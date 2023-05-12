using System;
namespace Epistimology_BE.Models
{
    public class PaperColumnValue
    {
        public int id { get; set; }

        public string? value { get; set; }

        public string? name { get; set; }

        public Paper paper { get; set; }

        public Column column { get; set; }

        public PaperColumnValue(Paper p_paper, Column p_column) : this()
        {
            paper = p_paper;
            column = p_column;
        }

        /// EF constructor
        private PaperColumnValue() : base()
        {
            paper = new Paper();
            column = new Column();
        }
    }
}

