import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { switchTheme } from "../../store/slices/uiSlice";

function Header() {
    const theme = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()

    return (
        <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
                <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <p className="text-4xl font-black">
                            currency_bitcoin
                        </p>
                    </span>
                    <h1 className="text-xl font-extrabold">Crypto Dashboard</h1>
                </span>
                <nav className="flex items-center gap-1 text-sm">
                    <Link
                        to="/"
                        className="rounded-md px-3 py-2 transition-colors hover:bg-card hover:text-primary"
                    >
                        Home
                    </Link>
                    <Link
                        to="/favourites"
                        className="rounded-md px-3 py-2 transition-colors hover:bg-card hover:text-primary"
                    >
                        Favourites
                    </Link>
                    <button
                        onClick={() => { dispatch(switchTheme()) }}
                        className="ml-2 flex items-center gap-1 rounded-md border border-border px-3 py-2 transition-colors hover:border-primary hover:text-primary"
                    >
                        <span className="material-symbols-outlined text-lg">
                            {theme.isDark ? "light_mode" : "dark_mode"}
                        </span>
                        <span className="hidden sm:inline">{theme.isDark ? "Light" : "Dark"}</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;