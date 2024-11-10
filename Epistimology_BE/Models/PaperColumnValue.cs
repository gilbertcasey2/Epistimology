using System;
using System.ComponentModel.DataAnnotations;

namespace Epistimology_BE.Models
{
    public class PaperColumnValue
    {
        [Key]
        public int id { get; set; }

        public string? value { get; set; }

        public Paper? paper { get; set; }

        public Column? column { get; set; }

    }
}

