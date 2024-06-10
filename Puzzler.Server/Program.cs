using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Puzzler.Server;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.AddServiceDefaults();

        // Add services to the container.
        builder.Services.AddAuthorization();

        builder.Services.AddSingleton(WordSearchPuzzle.GenerateExample());

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        app.MapDefaultEndpoints();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapGet("api/wordsearch/{id}", async (int id, WordSearchPuzzle puzzle) =>
        {
            if (id != 0)
                return Results.NotFound();

            var puzzleDto = new WordSearchPuzzleDto
            {
                Id = puzzle.Id,
                Array = puzzle.Array,
                Rows = puzzle.Rows,
                Cols = puzzle.Cols,
                FoundWords = puzzle.WordsFound.Select(foundWord => puzzle.Words.First(w => w.Word == foundWord))
                    .ToArray(),
                IsSolved = puzzle.IsSolved
            };

            return Results.Ok(puzzleDto);
        }).WithOpenApi();

        app.MapPost("api/wordsearch/{id}/guess", async (int id, WordSearchPuzzle puzzle, WordSearchGuess guess) =>
        {
            if (id != 0)
                return Results.NotFound();

            var foundWord = puzzle.Words.SingleOrDefault(w =>
                w.Start == guess.Start && w.End == guess.End || w.Start == guess.End && w.End == guess.Start);

            if (foundWord == null)
                return Results.NotFound();

            if (puzzle.WordsFound.Contains(foundWord.Word))
                return Results.BadRequest("Word already found");

            puzzle.WordsFound.Add(foundWord.Word);

            return Results.Ok();
        }).WithOpenApi();

        app.MapFallbackToFile("/index.html");

        app.Run();
    }
}