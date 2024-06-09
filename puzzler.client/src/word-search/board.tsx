import {useState} from "react";
import {isDiagonal, isHorizontal, isVertical} from "./guess.ts";

const cellSize = 100;

interface ColRow {
    col: number;
    row: number;
}

interface FoundWordProps {
    word: string;
    start: {col: number, row: number};
    end: {col: number, row: number};
}
export function FoundWord({start, end, word}: FoundWordProps) {
    const x1 = (start.col + 0.5) * cellSize;
    const y1 = (start.row + 0.5) * cellSize;
    const x2 = (end.col + 0.5) * cellSize;
    const y2 = (end.row + 0.5) * cellSize;
    return (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth="6" key={word} />
    );
}

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
            <Letter text={letter} x={col} y={row} key={key} onClick={onClick}  />
        )
    });
    
    const lines = foundWords.map(FoundWord);
    
    const guessLine =(start && end) ?<line
        x1={(start?.col + 0.5) * cellSize}
        y1={(start?.row + 0.5) * cellSize}
        x2={(end?.col + 0.5) * cellSize}
        y2={(end?.row + 0.5) * cellSize}
        stroke="yellow"
        strokeWidth="6" />
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

interface LetterProps {
    text: string;
    x: number;
    y: number;
    onClick: (x: number, y: number) => void;
}
export function Letter({text, x, y, onClick}: LetterProps) {
    const cellX = (x+0.5) * cellSize;
    const cellY = (y+0.75) * cellSize;
    
    const setPosition = () => onClick(x, y);
    
    return (
        <text x={cellX} y={cellY} 
              fill="black"
              fontSize={cellSize}
              textAnchor="middle"
              onClick={setPosition}
        >{text}</text>
    )
}

