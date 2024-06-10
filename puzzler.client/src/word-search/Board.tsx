import {useState} from "react";
import {isDiagonal, isHorizontal, isVertical} from "./guess.ts";
import {Letter} from "./letter.tsx";
import {ColRow} from "./types.ts";
import {BoardLine, FoundWordProps} from "./BoardLine.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const cellSize = 100;

interface BoardProps {
    id: number;
    rows: number;
    cols: number;
    array: string[];
    foundWords: FoundWordProps[];
    enabled: boolean;
}

function fetchGuess(puzzleId: number, guess: { start: ColRow, end: ColRow }) {
    return fetch(`/api/wordsearch/${puzzleId}/guess`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guess)
    });
}

export function Board({id, rows, cols, array, foundWords, enabled}: BoardProps) {
    const queryClient = useQueryClient();

    const [start, setStart] = useState<ColRow | null>(null);
    const [end, setEnd] = useState<ColRow | null>(null);

    const boardWidth = cols * cellSize;
    const boardHeight = rows * cellSize;

    const guessMutation = useMutation({
        mutationFn: (guess: { start: ColRow, end: ColRow }) => fetchGuess(id, guess),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['wordsearch', id]});
        }
    })

    const onClick = (x: number, y: number) => {
        if (!enabled) {
            return;
        }
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
            <Letter text={letter} x={col} y={row} key={key} onClick={onClick} cellSize={cellSize}/>
        )
    });

    const lines = foundWords.map(word => {
        return (
            <BoardLine start={word.start} end={word.end} cellSize={cellSize} className="found-word-line"
                       key={word.word}/>
        )
    });

    const guessLine = (start && end) ? <BoardLine
            start={start}
            end={end}
            className="guess-word-line"
            cellSize={cellSize}/>
        : null;

    return (
        <div>
            <svg width={boardWidth} height={boardHeight}>
                <rect x="0" y="0" width={boardWidth} height={boardHeight} fill="beige"/>
                {cells}
                {lines}
                {enabled && guessLine}
            </svg>
            <div>
                Found Words: {foundWords.map(word => word.word.toUpperCase()).join(", ")}
            </div>
            {enabled ? <>
                <div>
                    <p>Start: {start?.col}, {start?.row}</p>
                    <p>End: {end?.col}, {end?.row}</p>
                </div>
                <button onClick={() => {
                    if (start && end) {
                        guessMutation.mutate({start, end});
                        setStart(null);
                        setEnd(null);
                    }
                }}>Guess
                </button>
            </> : null}
        </div>
    )
}



