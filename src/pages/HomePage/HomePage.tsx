import { useQuery } from "@tanstack/react-query";
import { getCoins } from "../../api/endpoints/coins";
import type { GetCoinsParams } from "../../api/types/coinTypes";
import CoinList from "../../components/coins/CoinList/CoinList";
import { useAppSelector } from "../../store/hooks";
import Skeleton from "../../components/Skeleton/Skeleton";

const PER_PAGE = 12

function HomePage() {
    const currentPage = useAppSelector(state => state.coinList.currPage)

    const params: GetCoinsParams = {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: PER_PAGE.toString(),
        page: currentPage.toString(),
        price_change_percentage: '24h'
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['coins', params],
        queryFn: () => getCoins(params)
    })

    const handleRefresh = () => {
        window.location.reload();
    };

    if (isLoading) {
        return (
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="h-36 rounded-xl" />
                ))}
            </div>
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
        <div className="flex-1 flex">
            {
                data && <CoinList coins={data} />
            }
        </div>
    );
}

export default HomePage;