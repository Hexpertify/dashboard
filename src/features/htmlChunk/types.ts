export type PageStatus = 'draft' | 'published' | 'archived';

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
}

export interface Chunk {
  id: string;
  name: string;
  content: string;
}

export interface VersionRecord {
  version: number;
  updatedBy: string;
  updatedAt: string;
  summary: string;
  title: string;
  identifierUrl: string;
  seo: PageSeo;
  chunks: Chunk[];
}

export interface PageRecord {
  id: string;
  title: string;
  identifierUrl: string;
  status: PageStatus;
  seo: PageSeo;
  chunks: Chunk[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
  versions: VersionRecord[];
}

export interface PageFormData {
  title: string;
  identifierUrl: string;
  status: PageStatus;
  seo: PageSeo;
  chunks: Chunk[];
}

export interface HtmlChunkState {
  pages: PageRecord[];
  loading: boolean;
  error: string | null;
}

export interface PreviewData {
  title: string;
  identifierUrl: string;
  seo: PageSeo;
  chunks: Chunk[];
}

export const initialPageSeo: PageSeo = {
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  openGraphTitle: '',
  openGraphDescription: '',
  openGraphImage: '',
  robotsIndex: true,
  robotsFollow: true,
};

export const initialPageFormData: PageFormData = {
  title: '',
  identifierUrl: '',
  status: 'draft',
  seo: initialPageSeo,
  chunks: [],
};
