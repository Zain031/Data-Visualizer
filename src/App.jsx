import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Components/Main";
import Pokemon from "./Components/Pokemon";
import CatchPage from "./Page/CatchPage";
import { Navbar } from "./Components/Navbar";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Main />,
        },
        {
            path: "/pokemon/:name",
            element: (
                <>
                    <Main />
                    <Pokemon />
                </>
            ),
        },
        {
            path: "/catch/:name",
            element: (
                <>
                    <Navbar />
                    <CatchPage />
                </>
            ),
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
