import type { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addFavourite, removeFavourite } from "../../../store/slices/favouritesSlice";

interface FavouriteButtonProps {
    coinId: string
    className?: string
}

function FavouriteButton({ coinId, className }: FavouriteButtonProps) {
    const isFavourite = useAppSelector(state => state.favourites.ids.includes(coinId))
    const dispatch = useAppDispatch()

    const toggleFavourite = (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        if (isFavourite) {
            dispatch(removeFavourite(coinId))
        } else {
            dispatch(addFavourite(coinId))
        }
    }

    return (
        <button
            onClick={toggleFavourite}
            className={`material-symbols-outlined transition-colors duration-200 ${isFavourite ? "text-red-500" : "text-text2 hover:text-red-500"} ${className ?? ""}`}
        >
            {isFavourite ? "favorite" : "favorite_border"}
        </button>
    )
}

export default FavouriteButton;