import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import CoinDetailsPage from "../pages/CoinDetailsPage/CoinDetailsPage";
import FavouritesPage from "../pages/FavouritesPage/FavouritesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: HomePage },
            { path: "coin/:id", Component: CoinDetailsPage },
            { path: "favourites", Component: FavouritesPage },
            { path: "*", Component: NotFoundPage }
        ]
    }
])

export default router