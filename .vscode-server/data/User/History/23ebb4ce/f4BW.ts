import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
        theme: themeReducer,
    }
})

export type RootState