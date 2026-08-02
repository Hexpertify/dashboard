import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialSeoSettings } from './types';
import type { SeoSettings } from './types';

interface SettingsState {
  seo: SeoSettings;
  isDirty: boolean;
}

const initialState: SettingsState = {
  seo: initialSeoSettings,
  isDirty: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSeoField: {
      reducer(state, action: PayloadAction<{ field: keyof SeoSettings; value: string | boolean }>) {
        state.seo[action.payload.field] = action.payload.value as never;
        state.isDirty = true;
      },
      prepare: (field: keyof SeoSettings, value: string | boolean) => ({
        payload: { field, value },
      }),
    },
    setSeoSettings(state, action: PayloadAction<Partial<SeoSettings>>) {
      state.seo = { ...state.seo, ...action.payload };
      state.isDirty = true;
    },
    resetSeoSettings(state) {
      state.seo = { ...initialSeoSettings };
      state.isDirty = false;
    },
    syncMetaToOpenGraph(state) {
      state.seo.openGraphTitle = state.seo.metaTitle;
      state.seo.openGraphDescription = state.seo.metaDescription;
      state.isDirty = true;
    },
    markSeoClean(state) {
      state.isDirty = false;
    },
  },
});

export const {
  updateSeoField,
  setSeoSettings,
  resetSeoSettings,
  syncMetaToOpenGraph,
  markSeoClean,
} = settingsSlice.actions;

export default settingsSlice.reducer;