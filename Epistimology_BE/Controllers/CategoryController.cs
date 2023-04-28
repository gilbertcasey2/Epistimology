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
    public class CategoryController : Controller
    {

        private readonly ILogger<CategoryController> _logger;
        private IMetaServices _metaDataService;

        public CategoryController(ILogger<CategoryController> logger, IMetaServices metaDataService)
        {
            _logger = logger;
            _metaDataService = metaDataService;
        }

        [HttpGet]
        [Route("api/categories")]
        public IEnumerable<Models.Category> GetAllCategories()
        {
            var catList = _metaDataService.GetAllCategories();
            return catList;
        }

        [HttpPost]
        [Route("api/addcategory")]
        [Consumes("application/json")]
        public IActionResult AddCategory([FromBody] Models.Category item)
        {
            _metaDataService.CreateCategory(item);
            return Ok(new { message = "Paper created." });
        }

        [HttpPost]
        [Route("api/savecategory")]
        [Consumes("application/json")]
        public IActionResult SaveCategory([FromBody] Models.Category item)
        {

            _metaDataService.UpdateCategory(item.id, item);
            return Ok(new { message = "Category updated." });
        }

        [HttpPost]
        [Route("api/deletecategory")]
        [Consumes("application/json")]
        public IActionResult DeleteCategory([FromBody] int id)
        {

            _metaDataService.DeleteCategory(id);
            return Ok(new { message = "Category updated." });
        }

        [HttpPost]
        [Route("api/editcategory")]
        [Consumes("application/json")]
        public IActionResult EditCategory([FromBody] Category category)
        {

            _metaDataService.UpdateCategory(category.id, category);
            return Ok(new { message = "Category updated." });
        }
        

        [HttpGet]
        [Route("api/columns")]
        public IEnumerable<Models.Column> GetAllColumns()
        {
            var columnList = _metaDataService.GetAllColumns();
            return columnList;
        }
    }
}

