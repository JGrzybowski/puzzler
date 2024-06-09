interface LetterProps {
    cellSize: number;
    text: string;
    x: number;
    y: number;
    onClick: (x: number, y: number) => void;
}
export function Letter({text, x, y, onClick, cellSize}: LetterProps) {
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