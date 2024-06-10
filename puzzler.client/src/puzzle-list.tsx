import {useNavigate} from "react-router-dom";

export function PuzzleList() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Puzzle List</h1>

            <h2>Word Search</h2>
            <button onClick={() => navigate(`/wordsearch/0`)}>0</button>

            <h2>Blokudoku</h2>
            <button onClick={() => navigate(`/blokudoku/0`)}>0</button>
        </div>
    );
}