import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getCoinsByIds } from "../../api/endpoints/coins";
import CoinCard from "../../components/coins/CoinCard/CoinCard";
import { useAppSelector } from "../../store/hooks";
import Skeleton from "../../components/Skeleton/Skeleton";

function FavouritesPage() {
    const favouriteIds = useAppSelector(state => state.favourites.ids)

    const { data, isLoading, error } = useQuery({
        queryKey: ["favouriteCoins", favouriteIds.join(",")],
        queryFn: () => getCoinsByIds(favouriteIds),
        enabled: favouriteIds.length > 0,
    })

    const handleRefresh = () => {
        window.location.reload();
    };

    if (favouriteIds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <span className="material-symbols-outlined text-5xl text-text2">favorite_border</span>
                <p className="text-xl font-semibold">No favourite coins yet</p>
                <Link to="/" className="underline text-text2 transition-colors hover:text-text">
                    Go to Home and add some
                </Link>
            </div>
        )
    }

    if (isLoading) {
        return (
            <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favouriteIds.map(id => (
                    <li key={id} className="h-full">
                        <Skeleton className="h-36 rounded-xl" />
                    </li>
                ))}
            </ul>
        )
    }

    if (error) {
        return (
            <div className="py-24 flex flex-col items-center gap-3 text-red-500">
                {error.message}
                <button onClick={handleRefresh}
                    className="flex items-center gap-1 text-text2 transition-colors hover:text-text cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                    Refresh
                </button>
            </div>
        )
    }

    return (
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map(coin => (
                <li key={coin.id} className="h-full">
                    <CoinCard coin={coin} />
                </li>
            ))}
        </ul>
    )
}

export default FavouritesPage;