import {Board} from "./board.tsx";
import {example} from "./example.ts";

export function BlokudokuScreen() {
    const game = example;

    return (
        <div>
            <h1>Blokudoku</h1>
            <Board rows={game.rows} cols={game.cols} hintRows={game.hintRows} hintCols={game.hintCols}/>
        </div>
    );
}