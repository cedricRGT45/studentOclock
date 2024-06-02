import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../index.ts';

interface IThemeState {
    isDark : boolean
}

const initialState : IThemeState = {
    isDark: true,
}

export const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers: {
        toggle: (state) => {
            state.isDark = !state.isDark;
        }
    }
})

export const {toggle} = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.isDark

export default themeSlice.reducer;