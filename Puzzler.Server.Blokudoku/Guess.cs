namespace Puzzler.Server.Blokudoku;

public record Guess
{
    public Position[] SelectedCells { get; set; }
}