namespace Puzzler.Server;

public static class BlokudokuApiExtensions
{
    public static void RegisterBlokudokuPuzzleApi(this WebApplication app)
    {
        app.ServeBlokudokuPuzzle();
        app.GuessBlokudokuPuzzle();
    }
    
    public static RouteHandlerBuilder ServeBlokudokuPuzzle(this WebApplication app)
    {
        return app.MapGet("api/blokudoku/{id}", (int id, BlokudokuPuzzle puzzle) =>
        {
            if (id != 0)
                return Results.NotFound();

            var puzzleDto = new BlokudokuPuzzleDto
            {
                Id = puzzle.Id,
                Rows = puzzle.Rows,
                Cols = puzzle.Cols,
                HintRows = puzzle.HintRows,
                HintCols = puzzle.HintCols,
                IsSolved = puzzle.IsSolved
            };

            return Results.Ok(puzzleDto);
        }).WithOpenApi();
    }

    public static RouteHandlerBuilder GuessBlokudokuPuzzle(this WebApplication app)
    {
        return app.MapPost("api/blokudoku/{id}/guess", async (int id, BlokudokuPuzzle puzzle, BlokudokuGuess guess) =>
        {
            if (id != 0)
                return Results.NotFound();

            if(puzzle.IsSolved)
                return Results.BadRequest("Puzzle already solved");
            
            var isSolutionCorrect = puzzle.Solution.Intersect(guess.SelectedCells).Count() == puzzle.Solution.Length;
            
            if (!isSolutionCorrect)
                return Results.NotFound();

            puzzle.IsSolved = true;

            return Results.Ok();
        }).WithOpenApi();
    }
}