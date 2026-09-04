import { createSlice } from "@reduxjs/toolkit"

interface CoinListState {
    currPage: number
}

const initialState: CoinListState = {
    currPage: 1
}

const coinListSlice = createSlice({
    name: 'coinList',
    initialState,
    reducers: {
        prevPage(state) {
            if (state.currPage > 1) state.currPage--
        },
        nextPage(state) {
            state.currPage++
        }
    }
})

export const { prevPage, nextPage } = coinListSlice.actions

export default coinListSlice.reducer