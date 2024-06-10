namespace Puzzler.Server.Blokudoku;

public class PuzzleDto
{
    public int Id { get; set; }
    public int Rows { get; set; }
    public int Cols { get; set; }
    public int[][] HintRows { get; set; }
    public int[][] HintCols { get; set; }
    public bool IsSolved { get; set; }
}