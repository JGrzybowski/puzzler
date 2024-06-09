import {useState} from "react";
import {isDiagonal, isHorizontal, isVertical} from "./guess.ts";
import {Letter} from "./letter.tsx";
import {ColRow} from "./types.ts";
import {BoardLine, FoundWordProps} from "./BoardLine.tsx";

const cellSize = 100;



interface BoardProps {
    rows: number;
    cols: number;
    array: string[];
    foundWords: FoundWordProps[];
}
export function Board({rows, cols, array, foundWords}: BoardProps) {
    const [start, setStart] = useState<ColRow | null>(null);
    const [end, setEnd] = useState<ColRow | null>(null);
    
    const boardWidth = cols * cellSize;
    const boardHeight = rows * cellSize;
    
    const onClick = (x: number, y: number) => {
        const clickedPosition = {col: x, row: y};
        if (start) {
            if (start.col === clickedPosition.col && start.row === clickedPosition.row) {
                setStart(null);
                setEnd(null);
            } else if (isHorizontal(start, clickedPosition)
                    || isVertical(start, clickedPosition)
                    || isDiagonal(start, clickedPosition)) {
                    setEnd(clickedPosition);
            }
        } else {
            setStart(clickedPosition);
        }
    }
    
    const cells = array.map((letter, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const key = `${col},${row}`;
        return (
            <Letter text={letter} x={col} y={row} key={key} onClick={onClick} cellSize={cellSize} />
        )
    });
    
    const lines = foundWords.map(word => {
        return (
            <BoardLine start={word.start} end={word.end} cellSize={cellSize} className="found-word-line" key={word.word} />
        )
    });
    
    const guessLine =(start && end) ?<BoardLine
        start={start}
        end={end}
        className="guess-word-line" 
        cellSize={cellSize}/>
    : null;
    
    return (
        <div>
            <svg width={boardWidth} height={boardHeight}>
                <rect x="0" y="0" width={boardWidth} height={boardHeight} fill="beige" />
                {cells}
                {lines}
                {guessLine}
            </svg>
            <div >
                <p>Start: {start?.col}, {start?.row}</p>
                <p>End: {end?.col}, {end?.row}</p>
            </div>
            <div>
                Found Words: {foundWords.map(word => word.word.toUpperCase()).join(", ")}
            </div>
        </div>
    )
}



