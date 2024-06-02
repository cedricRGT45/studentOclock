import {createSlice} from '@reduxjs/toolkit'

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
        changeColor
    }

})

export const {toggle} = themeSlice.actions;

{
    name : "changeColor",
    payload : "blue"
}

export default themeSlice.reducer;