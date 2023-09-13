using System;
namespace Epistimology_BE.Models
{
    public class PaperColumnValue
    {
        public int? id { get; set; }

        public string? value { get; set; }

        public Paper? paper { get; set; }

        public Column? column { get; set; }


    }
}

