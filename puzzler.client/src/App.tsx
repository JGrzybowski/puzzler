import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {WordSearchScreen} from "./word-search/word-search-screen.tsx";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {PuzzleList} from "./puzzle-list.tsx";


const queryClient = new QueryClient()
const router = createBrowserRouter([
    {
        path: "/",
        element: <PuzzleList/>,


    }, {
        path: "wordsearch/:id",
        element: <WordSearchScreen/>,
    }
])

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools buttonPosition="bottom-right"/>
        </QueryClientProvider>
    );
}

export default App;