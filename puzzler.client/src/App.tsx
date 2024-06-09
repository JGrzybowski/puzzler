import { useState } from 'react';
import './App.css';
import {WordSearchPuzzle} from "./word-search/wordSearchPuzzle.ts";
import {wordSearchExample} from "./word-search/example.ts";
import {Board} from "./word-search/board.tsx";



function App() {
    const [puzzle, setPuzzle] = useState<WordSearchPuzzle>(wordSearchExample);

   
    return (
        <div>
            <h1 id="tableLabel">Word Search</h1>
            <Board rows={puzzle.rows} cols={puzzle.cols} array={puzzle.array} foundWords={puzzle.foundWords} />
        </div>
    );
}

export default App;