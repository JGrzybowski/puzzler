using System.Text.Json;

namespace Puzzler.Server.WordSearch;

public class Puzzle
{
    public int Id { get; set; }
    public char[] Array { get; set; }
    public int Rows { get; set; }
    public int Cols { get; set; }
    public Solution[] Words { get; set; }
    public List<string> WordsFound { get; set; }

    public bool IsSolved => WordsFound.Count == Words.Length;

    public static Puzzle GenerateExample()
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
        var puzzle = JsonSerializer.Deserialize<Puzzle>(puzzleJson,
            new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
        return puzzle;
    }
}