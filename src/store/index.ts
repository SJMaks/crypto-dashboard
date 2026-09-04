import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/uiSlice";
import coinListReducer from "./slices/coinsSlice";
import favouritesReducer from "./slices/favouritesSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        coinList: coinListReducer,
        favourites: favouritesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;