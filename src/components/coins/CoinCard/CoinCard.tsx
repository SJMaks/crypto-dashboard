import { useState } from "react";
import { Link } from "react-router";
import type { Coin } from "../../../api/types/coinTypes";
import { formatCurrency, getColorByChange } from "../../../utils/Formatters";
import FavouriteButton from "../FavouriteButton/FavouriteButton";
import Skeleton from "../../Skeleton/Skeleton";

interface CoinProps {
    coin: Coin
}

function CoinCard({ coin }: CoinProps) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const trendFixed = parseFloat(coin.price_change_percentage_24h?.toFixed(2))
    const changeColor = getColorByChange(trendFixed)

    return (
        <Link to={`/coin/${coin.id}`} className="block h-full">
            <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary hover:shadow-lg">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold">
                            {coin.market_cap_rank}
                        </span>
                        {
                            !imageLoaded && <Skeleton className="h-8 w-8 rounded-full" />
                        }
                        <img
                            src={coin.image}
                            alt={coin.symbol}
                            className={`h-8 w-8 shrink-0 ${imageLoaded ? "" : "hidden"}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                        <div className="min-w-0">
                            <p className="truncate font-semibold">{coin.name}</p>
                            <p className="text-xs uppercase text-text2">{coin.symbol}</p>
                        </div>
                    </div>
                    <FavouriteButton coinId={coin.id} />
                </div>
                <div className="flex items-end justify-between gap-2">
                    <div>
                        <p className="text-xl font-bold">{formatCurrency(coin.current_price, "usd")}</p>
                        <p className="text-sm text-text2">MCap: {formatCurrency(coin.market_cap, "usd")}</p>
                    </div>
                    {
                        !Number.isNaN(trendFixed) && (
                            <div className="flex items-center gap-1 text-sm font-semibold">
                                <span className={`material-symbols-outlined ${changeColor}`}>
                                    {trendFixed > 0 ? "trending_up" :
                                        (trendFixed < 0 ? "trending_down" : "trending_flat")}
                                </span>
                                <p className={changeColor}>{trendFixed}%</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </Link>
    );
}

export default CoinCard;