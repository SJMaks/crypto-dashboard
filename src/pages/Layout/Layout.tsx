import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../../store/hooks";

const Layout = () => {
    const theme = useAppSelector(state => state.theme)

    return (
        <div className={`${theme.isDark ? "dark" : ""} flex min-h-screen flex-col bg-background text-text transition-colors`}>
            <Header />
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 md:px-8">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;