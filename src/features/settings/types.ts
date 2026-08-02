export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
}

export const initialSeoSettings: SeoSettings = {
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  openGraphTitle: '',
  openGraphDescription: '',
  openGraphImage: '',
  robotsIndex: true,
  robotsFollow: true,
};

export const SEO_CHAR_LIMITS = {
  metaTitle: { recommended: 60, max: 70 },
  metaDescription: { recommended: 160, max: 180 },
  openGraphTitle: { recommended: 60, max: 90 },
  openGraphDescription: { recommended: 160, max: 200 },
} as const;