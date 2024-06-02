import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
        theme: themeReducer,
        user: userReducer,
    }
})