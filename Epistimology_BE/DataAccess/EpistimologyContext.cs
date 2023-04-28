using System;
using Epistimology_BE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Epistimology_BE.Helpers;

namespace Epistimology_BE.DataAccess
{
	public class EpistimologyContext : DbContext
	{
        public readonly IConfiguration Configuration;
		public DbSet<Paper> papers { get; set; }
		public DbSet<Category> categories { get; set; }
        public DbSet<Column> columns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Column>().HasData(
                new Column()
                {
                    id = 1,
                    name = "Title",
                    isDisplay = true,
                    fieldSize = Constants.FIELD_SIZES.REGULAR
                }
            );
        }

        public EpistimologyContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var connectionString = Configuration.GetConnectionString("WebApiDatabase");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
    }
}

