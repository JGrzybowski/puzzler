import './blokudoku.css';
import {Cell} from "./cell.tsx";
import {useState} from "react";

function range(start: number, end: number): number[] {
    return Array.from({length: end - start + 1}, (_, i) => start + i);
}

interface BoardProps {
    rows: number;
    cols: number;
    hintRows: number[][];
    hintCols: number[][];
}

function createInitialState(rows: number, cols: number): boolean[][] {
    return range(0, rows - 1).map(() => range(0, cols - 1).map(() => false));
}

export function Board({rows, cols, hintRows, hintCols}: BoardProps) {
    const [boardState, setBoardState] = useState(createInitialState(rows, cols));

    function toggleCell(col: number, row: number) {
        return () => {
            const newBoardState = boardState.map((r, rowIndex) => r.map((cell, colIndex) => {
                if (row === rowIndex && col === colIndex) {
                    return !cell;
                }
                return cell;
            }));
            setBoardState(newBoardState);
        }
    }

    const cellSize = "50px";

    const hintRowsDivs = hintRows.map((rowHints, index) => {
        return (
            <div className="blokudoku-hint-row" style={{"gridRowStart": index + 2, "gridColumnStart": 1}}>
                {rowHints.map((hint, index) => <p key={index}>{hint}</p>)}
            </div>
        )
    });

    const hintColsDivs = hintCols.map((colHints, index) => {
        return (
            <div className="blokudoku-hint-col" style={{"gridRowStart": 1, "gridColumnStart": index + 2}}>
                {colHints.map((hint, index) => <p key={index}>{hint}</p>)}
            </div>
        )
    });

    const imageCoordinates = range(0, rows - 1).flatMap(row => range(0, cols - 1).map(col => ({col, row})));
    const cells = imageCoordinates.map((cell) => {
        const key = `${cell.col},${cell.row}`;
        return (
            <Cell key={key} row={cell.row} col={cell.col} isColored={boardState[cell.row][cell.col]}
                  onClick={toggleCell(cell.col, cell.row)}/>
        )
    });

    return (<>
            <div className="blokudoku-grid" style={{
                gridTemplateRows: `minmax(${cellSize}, auto) repeat(${rows},${cellSize})`,
                gridTemplateColumns: `minmax(${cellSize}, auto) repeat(${cols}, ${cellSize})`
            }}>
                {hintRowsDivs}
                {hintColsDivs}

                {cells}
            </div>
            <button>Guess</button>
        </>
    )
}