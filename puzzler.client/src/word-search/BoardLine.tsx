export interface FoundWordProps {
    word: string;
    start: {col: number, row: number};
    end: {col: number, row: number};
    cellSize: number;
}

interface BoardLineProps {
    start: {col: number, row: number};
    end: {col: number, row: number};
    cellSize: number;
    className?: string;
}
export function BoardLine({start, end, cellSize, className}: BoardLineProps) {
    const x1 = (start.col + 0.5) * cellSize;
    const y1 = (start.row + 0.5) * cellSize;
    const x2 = (end.col + 0.5) * cellSize;
    const y2 = (end.row + 0.5) * cellSize;
    
    return (
        <line x1={x1} y1={y1} x2={x2} y2={y2} className={className} strokeWidth="6" />
    );
}

