namespace Puzzler.Server.WordSearch;

public class PuzzleDto
{
    public int Id { get; set; }
    public char[] Array { get; set; }
    public int Rows { get; set; }
    public int Cols { get; set; }
    public Solution[] FoundWords { get; set; }
    public bool IsSolved { get; set; }
}