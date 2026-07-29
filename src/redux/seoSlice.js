import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSeo } from '../api/seoApi';
import { getFromStorage, saveToStorage, updateInStorage, deleteFromStorage, getAllPages } from '../services/localStorageService';

export const fetchSeo = createAsyncThunk(
    'seo/fetchSeo',
    async (pageId, { rejectWithValue }) => {
        const local = getFromStorage(pageId);
        if (local) return { ...local, _local: true };
        try {
            const data = await getSeo(pageId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const saveSeo = createAsyncThunk(
    'seo/saveSeo',
    async (seoData) => {
        const pageId = `page_${Date.now()}`;
        const saved = saveToStorage(pageId, seoData);
        return saved;
    }
);

export const updateSeo = createAsyncThunk(
    'seo/updateSeo',
    async ({ id, data }) => {
        const updated = updateInStorage(id, data);
        return updated;
    }
);

export const deleteSeoEntry = createAsyncThunk(
    'seo/deleteSeoEntry',
    async (pageId) => {
        deleteFromStorage(pageId);
        return pageId;
    }
);

export const fetchSavedPages = createAsyncThunk(
    'seo/fetchSavedPages',
    async () => {
        return getAllPages();
    }
);

const initialState = {
    loading: false,
    error: null,
    seoData: {},
    savedPages: [],
};

const seoSlice = createSlice({
    name: 'seo',
    initialState,
    reducers: {
        setSeoData: (state, action) => {
            state.seoData = action.payload;
        },
        clearSeo: (state) => {
            state.seoData = {};
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchSeo
            .addCase(fetchSeo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSeo.fulfilled, (state, action) => {
                state.loading = false;
                state.seoData = action.payload;
            })
            .addCase(fetchSeo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // saveSeo
            .addCase(saveSeo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveSeo.fulfilled, (state, action) => {
                state.loading = false;
                state.seoData = action.payload;
                state.savedPages = getAllPages();
            })
            .addCase(saveSeo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateSeo
            .addCase(updateSeo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSeo.fulfilled, (state, action) => {
                state.loading = false;
                state.seoData = action.payload;
                state.savedPages = getAllPages();
            })
            .addCase(updateSeo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteSeoEntry
            .addCase(deleteSeoEntry.fulfilled, (state, action) => {
                state.savedPages = state.savedPages.filter((p) => p.id !== action.payload);
                if (state.seoData?.id === action.payload) {
                    state.seoData = {};
                }
            })
            // fetchSavedPages
            .addCase(fetchSavedPages.fulfilled, (state, action) => {
                state.savedPages = action.payload;
            });
    },
});

export const { setSeoData, clearSeo } = seoSlice.actions;

export default seoSlice.reducer;
