import { configureStore } from '@reduxjs/toolkit';
import seoReducer from './seoSlice';

export const store = configureStore({
    reducer: {
        seo: seoReducer,
    },
});
