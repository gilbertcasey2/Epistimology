﻿// <auto-generated />
using System;
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
                            fieldSize = 1,
                            isDisplay = true,
                            name = "Title"
                        });
                });

            modelBuilder.Entity("Epistimology_BE.Models.Paper", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("categoryid")
                        .HasColumnType("int");

                    b.Property<string>("title")
                        .HasColumnType("longtext");

                    b.HasKey("id");

                    b.HasIndex("categoryid");

                    b.ToTable("papers");
                });

            modelBuilder.Entity("Epistimology_BE.Models.PaperColumnValue", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("columnid")
                        .HasColumnType("int");

                    b.Property<int?>("paperid")
                        .HasColumnType("int");

                    b.Property<string>("value")
                        .HasColumnType("longtext");

                    b.HasKey("id");

                    b.HasIndex("columnid");

                    b.HasIndex("paperid");

                    b.ToTable("paperValues");
                });

            modelBuilder.Entity("Epistimology_BE.Models.Tag", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("color")
                        .HasColumnType("longtext");

                    b.Property<string>("name")
                        .HasColumnType("longtext");

                    b.HasKey("id");

                    b.ToTable("tags");
                });

            modelBuilder.Entity("PaperTag", b =>
                {
                    b.Property<int>("papersid")
                        .HasColumnType("int");

                    b.Property<int>("tagsid")
                        .HasColumnType("int");

                    b.HasKey("papersid", "tagsid");

                    b.HasIndex("tagsid");

                    b.ToTable("PaperTag");
                });

            modelBuilder.Entity("Epistimology_BE.Models.Paper", b =>
                {
                    b.HasOne("Epistimology_BE.Models.Category", "category")
                        .WithMany("papers")
                        .HasForeignKey("categoryid");

                    b.Navigation("category");
                });

            modelBuilder.Entity("Epistimology_BE.Models.PaperColumnValue", b =>
                {
                    b.HasOne("Epistimology_BE.Models.Column", "column")
                        .WithMany("values")
                        .HasForeignKey("columnid");

                    b.HasOne("Epistimology_BE.Models.Paper", "paper")
                        .WithMany("values")
                        .HasForeignKey("paperid");

                    b.Navigation("column");

                    b.Navigation("paper");
                });

            modelBuilder.Entity("PaperTag", b =>
                {
                    b.HasOne("Epistimology_BE.Models.Paper", null)
                        .WithMany()
                        .HasForeignKey("papersid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Epistimology_BE.Models.Tag", null)
                        .WithMany()
                        .HasForeignKey("tagsid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Epistimology_BE.Models.Category", b =>
                {
                    b.Navigation("papers");
                });

            modelBuilder.Entity("Epistimology_BE.Models.Column", b =>
                {
                    b.Navigation("values");
                });

            modelBuilder.Entity("Epistimology_BE.Models.Paper", b =>
                {
                    b.Navigation("values");
                });
#pragma warning restore 612, 618
        }
    }
}
