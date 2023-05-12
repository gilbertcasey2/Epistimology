using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Epistimology_BE.DataAccess;
using Epistimology_BE.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Epistimology_BE.Controllers
{
    public class PaperController : Controller
    {

        private readonly ILogger<PaperController> _logger;

        private IPaperService _paperService;

        //static readonly Models.IPaperRepository paperRepo = new Models.PaperRepository();

        public PaperController(ILogger<PaperController> logger, IPaperService paperService)
        {
            _logger = logger;
            _paperService = paperService;
        }

        [HttpGet]
        [Route("api/papers")]
        public IEnumerable<Models.Paper> GetAllPapers()
        {
            var paperList = _paperService.GetAll();
            return paperList;
        }

        [HttpPost]
        [Route("api/addpaper")]
        [Consumes("application/json")]
        public IActionResult PostPaper([FromBody] Models.Paper paper, List<Models.PaperColumnValue> values)
        {
            _paperService.Create(paper, values);
            return Ok(new { message = "Paper created." });
        }

        //[HttpPost]
        //[Route("api/savepaper")]
        //[Consumes("application/json")]
        //public Models.PaperModel SavePaper([FromBody] Models.PaperModel item)
        //{

        //    return paperRepo.UpdatePaper(item);
        //}

    }
}

