using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epistimology_BE.Models;
using Epistimology_BE.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Epistimology_BE.Controllers
{
    public class OrganizationController : Controller
    {

        private readonly ILogger<OrganizationController> _logger;
        private IOrganizationServices _organizationDataService;

        public OrganizationController(ILogger<OrganizationController> logger, IOrganizationServices organizationDataService)
        {
            _logger = logger;
            _organizationDataService = organizationDataService;
        }

        /** Category Methods */

        [HttpGet]
        [Route("api/categories")]
        public IEnumerable<Models.Category> GetAllCategories()
        {
            var catList = _organizationDataService.GetAllCategories();
            return catList;
        }

        [HttpPost]
        [Route("api/addcategory")]
        [Consumes("application/json")]
        public IActionResult AddCategory([FromBody] Models.Category item)
        {
            _organizationDataService.CreateCategory(item);
            return Ok(new { message = "Paper created." });
        }

        [HttpPost]
        [Route("api/deletecategory")]
        [Consumes("application/json")]
        public IActionResult DeleteCategory([FromBody] int id)
        {

            _organizationDataService.DeleteCategory(id);
            return Ok(new { message = "Category updated." });
        }

        [HttpPost]
        [Route("api/editcategory")]
        [Consumes("application/json")]
        public IActionResult EditCategory([FromBody] Category category)
        {

            _organizationDataService.UpdateCategory(category.id, category);
            return Ok(new { message = "Category updated." });
        }
        

        /** Column Methods */

        [HttpGet]
        [Route("api/columns")]
        public IEnumerable<Models.Column> GetAllColumns()
        {
            var columnList = _organizationDataService.GetAllColumns();
            return columnList;
        }

        [HttpPost]
        [Route("api/addcolumn")]
        [Consumes("application/json")]
        public IActionResult AddColumn([FromBody] Models.Column item)
        {
            _organizationDataService.CreateColumn(item);
            return Ok(new { message = "Column created." });
        }

        [HttpPost]
        [Route("api/deletecolumn")]
        [Consumes("application/json")]
        public IActionResult DeleteColumn([FromBody] int id)
        {

            _organizationDataService.DeleteColumn(id);
            return Ok(new { message = "column updated." });
        }

        [HttpPost]
        [Route("api/editcolumn")]
        [Consumes("application/json")]
        public IActionResult EditColumn([FromBody] Column column)
        {

            _organizationDataService.UpdateColumn(column.id, column);
            return Ok(new { message = "column updated." });
        }

        /** Tag Methods */

        [HttpGet]
        [Route("api/tags")]
        public IEnumerable<Models.Tag> GetAllTags()
        {
            var tagList = _organizationDataService.GetAllTags();
            return tagList;
        }

        [HttpPost]
        [Route("api/addtag")]
        [Consumes("application/json")]
        public IActionResult AddTag([FromBody] Models.Tag item)
        {
            _organizationDataService.CreateTag(item);
            return Ok(new { message = "Tag created." });
        }

        [HttpPost]
        [Route("api/deletetag")]
        [Consumes("application/json")]
        public IActionResult DeleteTag([FromBody] int id)
        {
            _organizationDataService.DeleteTag(id);
            return Ok(new { message = "column updated." });
        }

        [HttpPost]
        [Route("api/edittag")]
        [Consumes("application/json")]
        public IActionResult EditTag([FromBody] Tag tag)
        {
            _organizationDataService.UpdateTag(tag.id, tag);
            return Ok(new { message = "column updated." });
        }
    }
}

