interface ColRow {
    col: number;
    row: number;
}

export function isHorizontal(start: ColRow, end: ColRow): boolean {
    return start.row === end.row;
}

export function isVertical(start: ColRow, end: ColRow): boolean {
    return start.col === end.col;
}

export function isDiagonal(start: ColRow, end: ColRow): boolean {
    return Math.abs(start.col - end.col) === Math.abs(start.row - end.row);
}