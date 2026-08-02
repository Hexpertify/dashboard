import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardState, DashboardStats, TrafficPoint } from './types';

const initialState: DashboardState = {
  stats: {
    indexedPages: 8432,
    organicTraffic: 12480,
    keywordsTracked: 356,
    avgPosition: 18.4,
    backlinks: 2147,
    crawlErrors: 23,
  },
  trafficData: [
    { date: 'Jan', value: 5200 },
    { date: 'Feb', value: 6100 },
    { date: 'Mar', value: 5800 },
    { date: 'Apr', value: 7200 },
    { date: 'May', value: 6700 },
    { date: 'Jun', value: 8100 },
    { date: 'Jul', value: 7800 },
    { date: 'Aug', value: 8900 },
    { date: 'Sep', value: 9400 },
    { date: 'Oct', value: 10200 },
    { date: 'Nov', value: 11300 },
    { date: 'Dec', value: 12480 },
  ],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats(state, action: PayloadAction<DashboardStats>) {
      state.stats = action.payload;
    },
    setTrafficData(state, action: PayloadAction<TrafficPoint[]>) {
      state.trafficData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setDashboardError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setStats, setTrafficData, setLoading, setDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
