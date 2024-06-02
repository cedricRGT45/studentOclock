import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../index.ts';

interface IThemeState {
    value : boolean
};

export const themeSlice = createSlive({
    name : 'theme',
    initialState,
    reducers: {
        toggle: (state) => {

        }
    }
})
