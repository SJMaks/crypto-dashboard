import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FavouritesState {
    ids: string[]
}

const getInitialState = (): FavouritesState => {
    const stored = localStorage.getItem('favouriteIds')
    return { ids: stored ? JSON.parse(stored) : [] }
}

const initialState = getInitialState()

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            if (!state.ids.includes(action.payload)) {
                state.ids.push(action.payload)
                localStorage.setItem('favouriteIds', JSON.stringify(state.ids))
            }
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.ids = state.ids.filter(id => id !== action.payload)
            localStorage.setItem('favouriteIds', JSON.stringify(state.ids))
        }
    }
})

export const { addFavourite, removeFavourite } = favouritesSlice.actions

export default favouritesSlice.reducer