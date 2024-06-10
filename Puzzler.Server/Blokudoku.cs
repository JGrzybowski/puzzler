using System.Text.Json;

namespace Puzzler.Server;

public record BlokudokuPosition
{
    public int Row { get; set; }
    public int Col { get; set; }
}

public class BlokudokuPuzzle
{
    public int Id { get; set; }
    public int Rows { get; set; }
    public int Cols { get; set; }
    public int[][] HintRows { get; set; }
    public int[][] HintCols { get; set; }
    public BlokudokuPosition[] Solution { get; set; }
    public bool IsSolved { get; set; }

    public static BlokudokuPuzzle GenerateExample()
    {
        var puzzleJson = """
                         {
                         "id": 0,
                         "rows": 7,
                         "cols": 5,
                         "hintRows": [[1], [3], [2, 2], [3], [1], [2], [1]],
                         "hintCols": [[1], [3], [2, 4], [3, 1], [1]],
                         "solution": [
                             {"col": 2, "row": 0},
                             {"col": 1, "row": 1},
                             {"col": 2, "row": 1},
                             {"col": 3, "row": 1},
                             {"col": 0, "row": 2},
                             {"col": 1, "row": 2},
                             {"col": 3, "row": 2},
                             {"col": 4, "row": 2},
                             {"col": 1, "row": 3},
                             {"col": 2, "row": 3},
                             {"col": 3, "row": 3},
                             {"col": 2, "row": 4},
                             {"col": 2, "row": 5},
                             {"col": 3, "row": 5},
                             {"col": 2, "row": 6}
                         ],
                         "isSolved": false
                         }
                         """;
        var puzzle = JsonSerializer.Deserialize<BlokudokuPuzzle>(puzzleJson,
            new JsonSerializerOptions() { PropertyNameCaseInsensitive = true,});
        return puzzle;
    }
}

public record BlokudokuGuess
{
    public BlokudokuPosition[] SelectedCells { get; set; }
}

public class BlokudokuPuzzleDto
{
    public int Id { get; set; }
    public int Rows { get; set; }
    public int Cols { get; set; }
    public int[][] HintRows { get; set; }
    public int[][] HintCols { get; set; }
    public bool IsSolved { get; set; }
}