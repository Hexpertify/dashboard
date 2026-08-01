import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Chunk, HtmlChunkState, PageFormData, PageRecord, PageStatus, VersionRecord } from './types';

const now = new Date().toISOString();

const initialState: HtmlChunkState = {
  pages: [
    {
      id: 'pg_privacy_policy',
      title: 'Privacy Policy',
      identifierUrl: 'privacy-policy',
      status: 'published',
      seo: {
        metaTitle: 'Privacy Policy | Hexpertify',
        metaDescription: 'Read the Hexpertify privacy policy to understand how we collect, use, and protect your personal information.',
        metaKeywords: 'privacy policy, data protection, hexpertify',
        openGraphTitle: 'Privacy Policy | Hexpertify',
        openGraphDescription: 'Learn how Hexpertify protects your personal information.',
        openGraphImage: 'https://hexpertify.com/og/privacy-policy.jpg',
        robotsIndex: true,
        robotsFollow: true,
      },
      chunks: [
        { id: 'chk_pp_1', name: 'Intro', content: '<h2>Your privacy matters</h2><p>This policy explains what information we collect and how we use it.</p>' },
        { id: 'chk_pp_2', name: 'Data Collection', content: '<h3>Information we collect</h3><ul><li>Account details</li><li>Usage data</li><li>Cookies</li></ul>' },
      ],
      createdAt: '2026-01-10T09:00:00Z',
      updatedAt: '2026-07-25T14:30:00Z',
      createdBy: 'John Doe',
      lastModifiedBy: 'Alice Johnson',
      versions: [
        {
          version: 2,
          updatedBy: 'Alice Johnson',
          updatedAt: '2026-07-25T14:30:00Z',
          summary: 'Updated data collection section and refreshed meta description',
          title: 'Privacy Policy',
          identifierUrl: 'privacy-policy',
          seo: {
            metaTitle: 'Privacy Policy | Hexpertify',
            metaDescription: 'Read the Hexpertify privacy policy to understand how we collect, use, and protect your personal information.',
            metaKeywords: 'privacy policy, data protection, hexpertify',
            openGraphTitle: 'Privacy Policy | Hexpertify',
            openGraphDescription: 'Learn how Hexpertify protects your personal information.',
            openGraphImage: 'https://hexpertify.com/og/privacy-policy.jpg',
            robotsIndex: true,
            robotsFollow: true,
          },
          chunks: [
            { id: 'chk_pp_1', name: 'Intro', content: '<h2>Your privacy matters</h2><p>This policy explains what information we collect and how we use it.</p>' },
            { id: 'chk_pp_2', name: 'Data Collection', content: '<h3>Information we collect</h3><ul><li>Account details</li><li>Usage data</li><li>Cookies</li></ul>' },
          ],
        },
        {
          version: 1,
          updatedBy: 'John Doe',
          updatedAt: '2026-01-10T09:00:00Z',
          summary: 'Initial page creation',
          title: 'Privacy Policy',
          identifierUrl: 'privacy-policy',
          seo: {
            metaTitle: 'Privacy Policy | Hexpertify',
            metaDescription: 'Read the Hexpertify privacy policy.',
            metaKeywords: 'privacy policy',
            openGraphTitle: 'Privacy Policy | Hexpertify',
            openGraphDescription: 'Learn how Hexpertify protects your personal information.',
            openGraphImage: 'https://hexpertify.com/og/privacy-policy.jpg',
            robotsIndex: true,
            robotsFollow: true,
          },
          chunks: [
            { id: 'chk_pp_1', name: 'Intro', content: '<h2>Your privacy matters</h2><p>This policy explains what information we collect and how we use it.</p>' },
          ],
        },
      ],
    },
    {
      id: 'pg_career_guidance',
      title: 'Career Guidance',
      identifierUrl: 'career-guidance',
      status: 'published',
      seo: {
        metaTitle: 'Career Guidance | Hexpertify',
        metaDescription: 'Expert career guidance to help you choose the right path, build skills, and land your dream job.',
        metaKeywords: 'career guidance, career advice, job search',
        openGraphTitle: 'Career Guidance | Hexpertify',
        openGraphDescription: 'Get expert advice on choosing and growing your career.',
        openGraphImage: 'https://hexpertify.com/og/career-guidance.jpg',
        robotsIndex: true,
        robotsFollow: true,
      },
      chunks: [
        { id: 'chk_cg_1', name: 'Hero', content: '<h2>Shape your future with confidence</h2><p>Personalized guidance for every stage of your career journey.</p>' },
        { id: 'chk_cg_2', name: 'Services', content: '<h3>What we offer</h3><p>Resume reviews, interview coaching, and skill roadmaps.</p>' },
        { id: 'chk_cg_3', name: 'CTA', content: '<p><a href="/contact">Book a free consultation</a></p>' },
      ],
      createdAt: '2026-02-18T11:20:00Z',
      updatedAt: '2026-07-28T10:15:00Z',
      createdBy: 'John Doe',
      lastModifiedBy: 'John Doe',
      versions: [
        {
          version: 3,
          updatedBy: 'John Doe',
          updatedAt: '2026-07-28T10:15:00Z',
          summary: 'Added consultation CTA chunk',
          title: 'Career Guidance',
          identifierUrl: 'career-guidance',
          seo: {
            metaTitle: 'Career Guidance | Hexpertify',
            metaDescription: 'Expert career guidance to help you choose the right path, build skills, and land your dream job.',
            metaKeywords: 'career guidance, career advice, job search',
            openGraphTitle: 'Career Guidance | Hexpertify',
            openGraphDescription: 'Get expert advice on choosing and growing your career.',
            openGraphImage: 'https://hexpertify.com/og/career-guidance.jpg',
            robotsIndex: true,
            robotsFollow: true,
          },
          chunks: [
            { id: 'chk_cg_1', name: 'Hero', content: '<h2>Shape your future with confidence</h2><p>Personalized guidance for every stage of your career journey.</p>' },
            { id: 'chk_cg_2', name: 'Services', content: '<h3>What we offer</h3><p>Resume reviews, interview coaching, and skill roadmaps.</p>' },
            { id: 'chk_cg_3', name: 'CTA', content: '<p><a href="/contact">Book a free consultation</a></p>' },
          ],
        },
        {
          version: 2,
          updatedBy: 'Jane Smith',
          updatedAt: '2026-04-02T15:45:00Z',
          summary: 'Rewrote services section copy',
          title: 'Career Guidance',
          identifierUrl: 'career-guidance',
          seo: {
            metaTitle: 'Career Guidance | Hexpertify',
            metaDescription: 'Expert career guidance to help you choose the right path.',
            metaKeywords: 'career guidance',
            openGraphTitle: 'Career Guidance | Hexpertify',
            openGraphDescription: 'Get expert advice on choosing and growing your career.',
            openGraphImage: 'https://hexpertify.com/og/career-guidance.jpg',
            robotsIndex: true,
            robotsFollow: true,
          },
          chunks: [
            { id: 'chk_cg_1', name: 'Hero', content: '<h2>Shape your future with confidence</h2><p>Personalized guidance for every stage of your career journey.</p>' },
            { id: 'chk_cg_2', name: 'Services', content: '<h3>What we offer</h3><p>Resume reviews, interview coaching, and skill roadmaps.</p>' },
          ],
        },
        {
          version: 1,
          updatedBy: 'John Doe',
          updatedAt: '2026-02-18T11:20:00Z',
          summary: 'Initial page creation',
          title: 'Career Guidance',
          identifierUrl: 'career-guidance',
          seo: {
            metaTitle: 'Career Guidance | Hexpertify',
            metaDescription: 'Expert career guidance.',
            metaKeywords: 'career guidance',
            openGraphTitle: 'Career Guidance | Hexpertify',
            openGraphDescription: 'Get expert advice on choosing and growing your career.',
            openGraphImage: 'https://hexpertify.com/og/career-guidance.jpg',
            robotsIndex: true,
            robotsFollow: true,
          },
          chunks: [
            { id: 'chk_cg_1', name: 'Hero', content: '<h2>Shape your future with confidence</h2><p>Personalized guidance for every stage of your career journey.</p>' },
          ],
        },
      ],
    },
    {
      id: 'pg_corporate_training',
      title: 'Corporate Training',
      identifierUrl: 'corporate-training',
      status: 'draft',
      seo: {
        metaTitle: 'Corporate Training | Hexpertify',
        metaDescription: 'Upskill your teams with tailored corporate training programs delivered by industry experts.',
        metaKeywords: 'corporate training, team upskilling, workshops',
        openGraphTitle: 'Corporate Training | Hexpertify',
        openGraphDescription: 'Tailored training programs for modern teams.',
        openGraphImage: 'https://hexpertify.com/og/corporate-training.jpg',
        robotsIndex: true,
        robotsFollow: true,
      },
      chunks: [
        { id: 'chk_ct_1', name: 'Intro', content: '<h2>Build a stronger team</h2><p>Custom corporate programs for every department.</p>' },
      ],
      createdAt: '2026-06-05T08:40:00Z',
      updatedAt: '2026-06-05T08:40:00Z',
      createdBy: 'Alice Johnson',
      lastModifiedBy: 'Alice Johnson',
      versions: [
        {
          version: 1,
          updatedBy: 'Alice Johnson',
          updatedAt: '2026-06-05T08:40:00Z',
          summary: 'Initial page creation',
          title: 'Corporate Training',
          identifierUrl: 'corporate-training',
          seo: {
            metaTitle: 'Corporate Training | Hexpertify',
            metaDescription: 'Upskill your teams with tailored corporate training programs delivered by industry experts.',
            metaKeywords: 'corporate training, team upskilling, workshops',
            openGraphTitle: 'Corporate Training | Hexpertify',
            openGraphDescription: 'Tailored training programs for modern teams.',
            openGraphImage: 'https://hexpertify.com/og/corporate-training.jpg',
            robotsIndex: true,
            robotsFollow: true,
          },
          chunks: [
            { id: 'chk_ct_1', name: 'Intro', content: '<h2>Build a stronger team</h2><p>Custom corporate programs for every department.</p>' },
          ],
        },
      ],
    },
  ],
  loading: false,
  error: null,
};

const toVersion = (page: PageRecord, actor: string, summary: string): VersionRecord => ({
  version: (page.versions[0]?.version ?? 0) + 1,
  updatedBy: actor,
  updatedAt: now,
  summary,
  title: page.title,
  identifierUrl: page.identifierUrl,
  seo: page.seo,
  chunks: page.chunks,
});

const htmlChunkSlice = createSlice({
  name: 'htmlChunk',
  initialState,
  reducers: {
    addPage(state, action: PayloadAction<{ data: PageFormData; actor: string }>) {
      const { data, actor } = action.payload;
      const page: PageRecord = {
        id: `pg_${Date.now().toString(36)}`,
        ...data,
        createdAt: now,
        updatedAt: now,
        createdBy: actor,
        lastModifiedBy: actor,
        versions: [],
      };
      page.versions = [toVersion(page, actor, 'Initial page creation')];
      state.pages.unshift(page);
    },
    updatePage(state, action: PayloadAction<{ id: string; data: PageFormData; actor: string; summary?: string }>) {
      const { id, data, actor, summary } = action.payload;
      const index = state.pages.findIndex((p) => p.id === id);
      if (index !== -1) {
        const current = state.pages[index];
        const updated: PageRecord = {
          ...current,
          ...data,
          updatedAt: now,
          lastModifiedBy: actor,
        };
        updated.versions = [toVersion(updated, actor, summary ?? 'Updated page'), ...current.versions];
        state.pages[index] = updated;
      }
    },
    deletePage(state, action: PayloadAction<string>) {
      state.pages = state.pages.filter((p) => p.id !== action.payload);
    },
    setPageStatus(state, action: PayloadAction<{ id: string; status: PageStatus; actor?: string }>) {
      const { id, status, actor } = action.payload;
      const index = state.pages.findIndex((p) => p.id === id);
      if (index !== -1) {
        const current = state.pages[index];
        const updated: PageRecord = {
          ...current,
          status,
          updatedAt: now,
          lastModifiedBy: actor ?? current.lastModifiedBy,
        };
        if (status === 'published' && current.status !== 'published') {
          const summary = current.status === 'draft' ? 'Page published' : 'Page re-published';
          updated.versions = [toVersion(updated, actor ?? current.lastModifiedBy, summary), ...current.versions];
        }
        state.pages[index] = updated;
      }
    },
    reorderChunks(state, action: PayloadAction<{ id: string; chunks: Chunk[] }>) {
      const index = state.pages.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.pages[index].chunks = action.payload.chunks;
      }
    },
    restoreVersion(state, action: PayloadAction<{ id: string; version: number; actor: string }>) {
      const { id, version, actor } = action.payload;
      const index = state.pages.findIndex((p) => p.id === id);
      if (index === -1) return;
      const current = state.pages[index];
      const snapshot = current.versions.find((v) => v.version === version);
      if (!snapshot) return;
      const restored: PageRecord = {
        ...current,
        title: snapshot.title,
        identifierUrl: snapshot.identifierUrl,
        seo: snapshot.seo,
        chunks: snapshot.chunks,
        updatedAt: now,
        lastModifiedBy: actor,
      };
      restored.versions = [toVersion(restored, actor, `Restored to version ${version}`), ...current.versions];
      state.pages[index] = restored;
    },
    setHtmlChunkLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setHtmlChunkError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  addPage,
  updatePage,
  deletePage,
  setPageStatus,
  reorderChunks,
  restoreVersion,
  setHtmlChunkLoading,
  setHtmlChunkError,
} = htmlChunkSlice.actions;

export default htmlChunkSlice.reducer;
