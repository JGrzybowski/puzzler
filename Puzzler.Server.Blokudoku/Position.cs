namespace Puzzler.Server.Blokudoku;

public record Position
{
    public int Row { get; set; }
    public int Col { get; set; }
}