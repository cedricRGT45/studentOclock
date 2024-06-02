import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import type {RootState} from '../../index.ts'

interface IThemeState {
    isDark : boolean,
    mainColor : string
}

const initialState : IThemeState = {
    isDark : true,
    mainColor : "red",
}

export const themeSlice = createSlice({

    name : 'theme',
    initialState,
    reducers: {
        toggle: (state) => {
            state.isDark = !state.isDark
        },
        changeColor: (state, action : PayloadAction<string>) => {
            state.mainColor = action.payload
        }
    }

})

export const {toggle, changeColor} = themeSlice.actions;

export default themeSlice.reducer;