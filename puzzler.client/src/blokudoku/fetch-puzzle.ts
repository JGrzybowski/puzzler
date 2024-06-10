export async function fetchPuzzle(puzzleId: number) {
    const response = await fetch('/api/blokudoku/' + puzzleId)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}