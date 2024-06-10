import {useQuery} from "@tanstack/react-query";
import {fetchPuzzle} from "./fetch-puzzle.ts";
import {Board} from "./Board.tsx";

export function WordSearchScreen() {

const puzzleId = 0;
const puzzleInfo = useQuery({ queryKey: ['wordsearch', puzzleId], queryFn: () => fetchPuzzle(puzzleId)  })

return puzzleInfo.isLoading ? (<div>Loading...</div>)
    : puzzleInfo.isError ? (<div>Error: {puzzleInfo.error.message}</div>)
        : (
                <div>
                    <h1 id="tableLabel">Word Search</h1>
                    {puzzleInfo.data.isSolved ? <div>Complete!</div> : null}
                    <Board id={puzzleInfo.data.id} enabled={!puzzleInfo.data.isSolved}
                           rows={puzzleInfo.data.rows} cols={puzzleInfo.data.cols}
                           array={puzzleInfo.data.array} foundWords={puzzleInfo.data.foundWords} />
                </div>
        );
}