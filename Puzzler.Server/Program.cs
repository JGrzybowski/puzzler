
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

        app.MapGet("api/wordsearch/{id}", async (int id) =>
        {
            if (id != 0)
                return Results.NotFound();

            var puzzleJson = """
                             {
                               "array": [
                                 "G","N","L","S","P",
                                 "Y","O","X","N","A",
                                 "F","X","A","N","N",
                                 "E","T","N","T","D",
                                 "N","Q","J","P","A"
                               ],
                               "rows": 5,
                               "cols": 5,
                               "words": [
                                 {
                                   "word": "panda",
                                   "start": {
                                     "col": 4,
                                     "row": 0
                                   },
                                   "end": {
                                     "col":4,"row":4
                                   }
                                 },
                                 {
                                   "word": "goat",
                                   "start": {
                                     "col": 0,
                                     "row": 0
                                   },
                                   "end": {
                                     "col": 0,
                                     "row": 3
                                   }
                                 }
                               ],
                               "wordsFound": ["panda"]
                             }
                             """;
            var puzzle = JsonSerializer.Deserialize<WordSearchPuzzle>(puzzleJson, new JsonSerializerOptions(){PropertyNameCaseInsensitive = true});
            if (puzzle == null)
            {
                return Results.NotFound();
            }

            var puzzleDto = new WordSearchPuzzleDto
            {
                Array = puzzle.Array,
                Rows = puzzle.Rows,
                Cols = puzzle.Cols,
                WordsFound = puzzle.WordsFound.Select(foundWord => puzzle.Words.First(w => w.Word == foundWord)).ToArray()
            };

            return Results.Ok(puzzleDto);
        }).WithOpenApi();
        
        app.MapFallbackToFile("/index.html");

        app.Run();
    }
}
