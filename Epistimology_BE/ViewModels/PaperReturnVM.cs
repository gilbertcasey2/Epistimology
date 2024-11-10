using System;
using Epistimology_BE.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Epistimology_BE.ViewModels
{
	public class PaperReturnVM
	{
        public int id { get; set; }

        public string? title { get; set; }

        public string? categoryName { get; set; }

        //public PaperColumnVM[]? values { get; set; }

        //[JsonExtensionData]
        public Dictionary<string, string>[]? values { get; set; }

        public PaperReturnVM(int p_id, string p_title)
        {
            id = p_id;
            title = p_title;
        }

    }
}

