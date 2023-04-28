using System;
using Epistimology_BE.Models;
using Epistimology_BE.Services;

namespace Epistimology_BE.DataAccess
{
	public class SeedDatabase
	{
        private IPaperService _paperService;
		private IMetaServices _metaService;
        public SeedDatabase(IPaperService paperService, IMetaServices metaServices)
		{
			_paperService = paperService;
			_metaService = metaServices;
            CreateColumns();
        }

		private void CreateColumns()
		{
			int count = _metaService.GetColCount() + 1;
            string title = "Title";
			Column col = _metaService.GetColByName(title); 

			if (col == null)
			{
				Column newCol = new Column()
				{
					id = count,
					name = "Title",
					isDisplay = true
				};
				_metaService.CreateColumn(newCol);
            }
            
        }
	}
}

