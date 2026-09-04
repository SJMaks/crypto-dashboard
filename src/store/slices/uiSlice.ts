import { createSlice } from "@reduxjs/toolkit"

interface ThemeState {
    isDark: boolean
}

const getInitialState = (): ThemeState => {
    const stored = localStorage.getItem('isDark')
    return { isDark: stored ? JSON.parse(stored) : [] }
}

const initialState = getInitialState()

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme(state) {
            state.isDark = !state.isDark
            localStorage.setItem('isDark', JSON.stringify(state.isDark))
        }
    }
})

export const { switchTheme } = themeSlice.actions

export default themeSlice.reducer