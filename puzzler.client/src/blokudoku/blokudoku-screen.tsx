import {Board} from "./board.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchPuzzle} from "./fetch-puzzle.ts";

export function BlokudokuScreen() {

    const puzzleId = 0;
    const puzzleInfo = useQuery({queryKey: ['blokudoku', puzzleId], queryFn: () => fetchPuzzle(puzzleId)})

    return puzzleInfo.isLoading ? (<div>Loading...</div>)
        : puzzleInfo.isError ? (<div>Error: {puzzleInfo.error.message}</div>)
            : (
                <div>
                    <h1 id="tableLabel">Blokudoku</h1>
                    {puzzleInfo.data.isSolved ? <div>Complete!</div> : null}
                    <Board id={puzzleInfo.data.id} enabled={!puzzleInfo.data.isSolved}
                           rows={puzzleInfo.data.rows} cols={puzzleInfo.data.cols}
                           hintRows={puzzleInfo.data.hintRows} hintCols={puzzleInfo.data.hintCols}/>
                </div>
            );
}