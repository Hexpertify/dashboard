import * as Yup from 'yup';

export const seoValidationSchema = Yup.object({
    metaTitle: Yup.string()
        .required('Meta Title is required')
        .max(60, 'Maximum 60 characters allowed'),
    metaDescription: Yup.string()
        .required('Meta Description is required')
        .max(160, 'Maximum 160 characters allowed'),
    metaKeywords: Yup.string()
        .required('Meta Keywords are required'),
    canonicalUrl: Yup.string()
        .url('Must be a valid URL')
        .required('Canonical URL is required'),
    ogTitle: Yup.string()
        .required('Open Graph Title is required'),
    ogDescription: Yup.string()
        .required('Open Graph Description is required'),
    ogAlt: Yup.string()
        .required('Open Graph Alt Text is required'),
    robots: Yup.string()
        .required('Robots Indexing is required'),
    ogImage: Yup.string()
        .test('is-valid-url-or-data', 'Must be a valid URL or data URL', (value) => {
            if (!value) return true;
            return value.startsWith('data:image/') || /^https?:\/\/.+/.test(value);
        }),
});
