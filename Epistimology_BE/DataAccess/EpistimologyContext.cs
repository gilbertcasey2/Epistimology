using System;
using Epistimology_BE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Epistimology_BE.Helpers;
using System.Diagnostics;

namespace Epistimology_BE.DataAccess
{
	public class EpistimologyContext : DbContext
	{
        public readonly IConfiguration Configuration;
		public DbSet<Paper> papers { get; set; }
		public DbSet<Category> categories { get; set; }
        public DbSet<Column> columns { get; set; }
        public DbSet<Tag> tags { get; set; }
        public DbSet<PaperColumnValue> paperValues { get; set; }

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

            // configures paper to values one-to-many relationship
            modelBuilder.Entity<PaperColumnValue>()
                .HasOne<Paper>(p => p.paper)
                .WithMany(v => v.values);

            // configures column to values one-to-many relationship
            modelBuilder.Entity<PaperColumnValue>()
                .HasOne<Column>(c => c.column)
                .WithMany(v => v.values);

            // configures category to papers one-to-many relationship
            modelBuilder.Entity<Paper>()
                .HasOne<Category>(c => c.category)
                .WithMany(p => p.papers);

            // configures tags to papers many-to-many relationship
            modelBuilder.Entity<Paper>()
                .HasMany<Tag>(c => c.tags)
                .WithMany(p => p.papers);
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

