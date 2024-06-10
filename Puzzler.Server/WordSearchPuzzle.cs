namespace Puzzler.Server;

public class WordSearchPosition
{
    public int Row { get; set; }
    public int Col { get; set; }
}

public class WordSearchPuzzle
{
    public char[] Array { get; set; }
    public int Rows { get; set; }
    public int Cols { get; set; }
    public WordSearchSolution[] Words { get; set; }
    public string[] WordsFound { get; set; }
}

public class WordSearchPuzzleDto
{
    public char[] Array { get; set; }
    public int Rows { get; set; }
    public int Cols { get; set; }
    public WordSearchSolution[] WordsFound { get; set; }
}

public class WordSearchSolution
{
    public string Word { get; set; } 
    public WordSearchPosition Start { get; set; }
    public WordSearchPosition End { get; set; }
}

public class WordSearchGuess
{
    public (int,int) Start { get; set; } 
    public (int,int) End { get; set; }
}

