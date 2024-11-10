using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Epistimology_BE.DataAccess;
using Epistimology_BE.Services;
using Newtonsoft.Json.Linq;
using Epistimology_BE.Models;
using Epistimology_BE.ViewModels;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Epistimology_BE.Controllers
{
    public class PaperController : ControllerBase
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
        public IActionResult GetAllPapers()
        {
            IEnumerable<PaperReturnVM> papers = _paperService.GetAll();
            return Ok(
                JsonConvert.SerializeObject(papers, Formatting.Indented,
                    new JsonSerializerSettings
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    })
                );
        }

        [HttpPost]
        [Route("api/addpaper")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult PostPaper([FromBody] PaperVM paper)
        {
            Paper? added_paper = _paperService.Create(paper);
            return added_paper == null ? NotFound() : Ok(added_paper);
        }

        [HttpPost]
        [Route("api/savepaper")]
        [Consumes("application/json")]
        public ActionResult SavePaper([FromBody] PaperVM paper)
        {
            Paper? updatedPaper = _paperService.Update(paper);
            return updatedPaper == null ? NotFound() : Ok(updatedPaper);
        }

    }
}

