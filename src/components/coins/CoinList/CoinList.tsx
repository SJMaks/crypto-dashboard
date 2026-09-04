import type { Coin } from "../../../api/types/coinTypes";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import CoinCard from "../CoinCard/CoinCard";
import { prevPage, nextPage } from "../../../store/slices/coinsSlice";

interface CoinListProps {
    coins: Coin[]
}

function CoinList({ coins }: CoinListProps) {
    const currentPage = useAppSelector(state => state.coinList.currPage)
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-1 flex-col items-center justify-between gap-6">
            <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {coins?.map(coin => {
                    return (
                        <li key={coin.id} className="h-full">
                            <CoinCard coin={coin} />
                        </li>
                    )
                })}
            </ul>
            <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
                <button onClick={() => dispatch(prevPage())} className="material-symbols-outlined h-9 w-9 rounded-lg transition-colors hover:bg-primary">
                    arrow_back
                </button>
                <p className="flex h-9 w-9 items-center justify-center text-sm font-semibold">{currentPage}</p>
                <button onClick={() => dispatch(nextPage())} className="material-symbols-outlined h-9 w-9 rounded-lg transition-colors hover:bg-primary">
                    arrow_forward
                </button>
            </div>
        </div>
    );
}

export default CoinList;