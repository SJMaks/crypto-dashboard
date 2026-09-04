import { Link } from "react-router";

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <span className="material-symbols-outlined text-6xl text-text2">search_off</span>
            <h3 className="text-xl font-bold">404 - Page not found</h3>
            <Link to="/" className="underline text-text2 transition-colors hover:text-text">
                Back to Home
            </Link>
        </div>
    );
}

export default NotFoundPage;