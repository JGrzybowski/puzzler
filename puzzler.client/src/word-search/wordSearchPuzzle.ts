export interface WordSearchPuzzle {
    array: string[];
    rows: number;
    cols: number;
    foundWords: {
        word: string;
        start: {col: number, row: number};
        end: {col: number, row: number};
    }[];
    isSolved: boolean;
}