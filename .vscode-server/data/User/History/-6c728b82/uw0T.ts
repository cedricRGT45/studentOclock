import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../index.ts';

interface IThemeState {
    value : boolean
}const initialState : IThemeState = {
    value: true,
    name: "oipiip"
}

export const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = 

        }
    }
})
