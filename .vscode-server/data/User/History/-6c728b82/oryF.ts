import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../index.ts';

const initialState = true;

export const themeSlice = createSlive({
    name : 'theme',
initialState,
})
