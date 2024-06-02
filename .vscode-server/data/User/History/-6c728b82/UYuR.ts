import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../index.ts';

interface IThemeState {
    value : boolean
}

const initialState : IThemeState = {
    value: true,
}

export const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
        }
    }
})

export const {toggle} = themeSlice.actions