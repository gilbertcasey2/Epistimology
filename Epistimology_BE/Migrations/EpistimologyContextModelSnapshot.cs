﻿// <auto-generated />
using Epistimology_BE.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Epistimology_BE.Migrations
{
    [DbContext(typeof(EpistimologyContext))]
    partial class EpistimologyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Epistimology_BE.Models.Category", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("description")
                        .HasColumnType("longtext");

                    b.Property<string>("name")
                        .HasColumnType("longtext");

                    b.HasKey("id");

                    b.ToTable("categories");
                });

            modelBuilder.Entity("Epistimology_BE.Models.Column", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("fieldSize")
                        .HasColumnType("int");

                    b.Property<bool>("isDisplay")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("name")
                        .HasColumnType("longtext");

                    b.HasKey("id");

                    b.ToTable("columns");

                    b.HasData(
                        new
                        {
                            id = 1,
                            fieldSize = 0,
                            isDisplay = true,
                            name = "Title"
                        });
                });

            modelBuilder.Entity("Epistimology_BE.Models.Paper", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("title")
                        .HasColumnType("longtext");

                    b.HasKey("id");

                    b.ToTable("papers");
                });
#pragma warning restore 612, 618
        }
    }
}
