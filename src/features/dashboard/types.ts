export interface DashboardStats {
  indexedPages: number;
  organicTraffic: number;
  keywordsTracked: number;
  avgPosition: number;
  backlinks: number;
  crawlErrors: number;
}

export interface TrafficPoint {
  date: string;
  value: number;
}

export interface DashboardState {
  stats: DashboardStats | null;
  trafficData: TrafficPoint[];
  loading: boolean;
  error: string | null;
}
