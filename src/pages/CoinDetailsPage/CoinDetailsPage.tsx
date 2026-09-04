import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getCoinById, getCoinChartData } from "../../api/endpoints/coins";
import { formatCurrency, getColorByChange } from "../../utils/Formatters";
import FavouriteButton from "../../components/coins/FavouriteButton/FavouriteButton";
import Skeleton from "../../components/Skeleton/Skeleton";

interface ChartDataPoint {
    date: string;
    price: number;
}

function CoinDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false)

    const { data: coin, isLoading: coinLoading, error: coinError } = useQuery({
        queryKey: ["coin", id],
        queryFn: () => getCoinById(id ?? "bitcoin"),
        enabled: !!id,
    });

    const { data: chartRaw, isLoading: chartLoading, error: chartError } = useQuery({
        queryKey: ["coinChart", id],
        queryFn: () => getCoinChartData(id ?? "bitcoin", 7),
        enabled: !!id,
    });

    const chartData: ChartDataPoint[] = chartRaw?.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
        price,
    })) ?? [];

    const handleRefresh = () => {
        window.location.reload();
    };

    if (coinLoading || chartLoading) {
        return (
            <div className="w-full">
                <Skeleton className="mb-6 h-5 w-20" />
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-14 w-14 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                    </div>
                    <Skeleton className="h-9 w-9" />
                </div>
                <Skeleton className="mb-6 h-64 rounded-xl" />
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Skeleton className="h-20 rounded-xl" />
                    <Skeleton className="h-20 rounded-xl" />
                    <Skeleton className="h-20 rounded-xl" />
                </div>
            </div>
        )
    }

    if (coinError || chartError || !coin) {
        return (
            <div className="py-24 flex flex-col items-center gap-3 text-red-500">
                {coinError?.message || chartError?.message || "Coin not found"}
                <button onClick={handleRefresh}
                    className="flex items-center gap-1 text-text2 transition-colors hover:text-text cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                    Refresh
                </button>
            </div>
        )
    }

    const { name, symbol, image, market_data, description } = coin;
    const {
        current_price,
        price_change_percentage_24h,
        market_cap,
        total_volume,
        circulating_supply,
    } = market_data;

    const changeColor = getColorByChange(price_change_percentage_24h);

    return (
        <div className="w-full">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-1 text-text2 transition-colors hover:text-text cursor-pointer"
            >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Back
            </button>

            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card">
                        {
                            !imageLoaded && <Skeleton className="h-10 w-10 rounded-full" />
                        }
                        <img
                            src={image.large}
                            alt={name}
                            className={`h-10 w-10 rounded-full ${imageLoaded ? "" : "hidden"}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">
                            {name} <span className="font-medium text-text2">({symbol.toUpperCase()})</span>
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-semibold">
                                {formatCurrency(current_price.usd, "usd")}
                            </span>
                            <span className={`text-sm font-medium ${changeColor}`}>
                                {price_change_percentage_24h?.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>
                <FavouriteButton coinId={coin.id} className="text-3xl" />
            </div>

            <div className="mb-6 rounded-xl border border-border bg-card p-4" style={{ height: 250 }}>
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis
                                domain={['auto', 'auto']}
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                                width={70}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--color-card)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "12px",
                                    color: "var(--color-text)",
                                }}
                                formatter={(value) => {
                                    if (typeof value === 'number' && !isNaN(value)) {
                                        return `$${value.toLocaleString()}`;
                                    }
                                    return value;
                                }}
                                labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Line name="Price" type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center text-text2">No chart data</div>
                )}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4">
                    <span className="text-sm text-text2">Market Cap</span>
                    <p className="text-lg font-semibold">
                        {formatCurrency(market_cap.usd, "usd")}
                    </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <span className="text-sm text-text2">Volume (24h)</span>
                    <p className="text-lg font-semibold">
                        {formatCurrency(total_volume.usd, "usd")}
                    </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <span className="text-sm text-text2">Circulating Supply</span>
                    <p className="text-lg font-semibold">
                        {circulating_supply?.toLocaleString() || "—"}
                    </p>
                </div>
            </div>

            {description?.en && (
                <div>
                    <h2 className="mb-2 text-lg font-bold">About {name}</h2>
                    <p
                        className="text-text2 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: description.en }}
                    />
                </div>
            )}
        </div>
    );
}

export default CoinDetailsPage;