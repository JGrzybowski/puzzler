using System.Text.Json;

namespace Puzzler.Server;

public record WordSearchPosition
{
    public int Row { get; set; }
    public int Col { get; set; }
}

public class WordSearchPuzzle
{
    public int Id { get; set; }
    public char[] Array { get; set; }
    public int Rows { get; set; }
    public int Cols { get; set; }
    public WordSearchSolution[] Words { get; set; }
    public List<string> WordsFound { get; set; }

    public bool IsSolved => WordsFound.Count == Words.Length;

    public static WordSearchPuzzle GenerateExample()
    {
        var puzzleJson = """
                         {
                           "id": 0,
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
                                 "col": 3,
                                 "row": 3
                               }
                             }
                           ],
                           "wordsFound": []
                         }
                         """;
        var puzzle = JsonSerializer.Deserialize<WordSearchPuzzle>(puzzleJson,
            new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
        return puzzle;
    }
}

public class WordSearchPuzzleDto
{
    public int Id { get; set; }
    public char[] Array { get; set; }
    public int Rows { get; set; }
    public int Cols { get; set; }
    public WordSearchSolution[] FoundWords { get; set; }
    public bool IsSolved { get; set; }
}

public class WordSearchSolution
{
    public string Word { get; set; }
    public WordSearchPosition Start { get; set; }
    public WordSearchPosition End { get; set; }
}

public class WordSearchGuess
{
    public WordSearchPosition Start { get; set; }
    public WordSearchPosition End { get; set; }
}