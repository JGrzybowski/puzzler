namespace Puzzler.Server;

public static class WordSearchApiExtensions
{
    public static void RegisterWordSearchPuzzleApi(this WebApplication app)
    {
        app.ServeWordSearchPuzzle();
        app.GuessWordSearchPuzzle();
    }
    
    public static RouteHandlerBuilder ServeWordSearchPuzzle(this WebApplication app)
    {
        return app.MapGet("api/wordsearch/{id}", (int id, WordSearchPuzzle puzzle) =>
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
    }

    public static RouteHandlerBuilder GuessWordSearchPuzzle(this WebApplication app)
    {
        return app.MapPost("api/wordsearch/{id}/guess", async (int id, WordSearchPuzzle puzzle, WordSearchGuess guess) =>
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
    }
}