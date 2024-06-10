interface CellProps {
    row: number;
    col: number;
    isColored: boolean;
    onClick: () => void;
}

export function Cell({row, col, isColored, onClick} : CellProps) {
    const cellClass = isColored ? "blokudoku-cell colored" : "blokudoku-cell";

    return <div className={cellClass} style={{gridRowStart: row + 2, gridColumnStart: col + 2}} onClick={onClick}></div>
}