import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
    Divider,
    Typography,
    IconButton,
    Avatar
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { saveSeo, updateSeo, clearSeo } from '../redux/seoSlice';
import { seoValidationSchema } from '../validation/seoValidation';
import CharacterCounter from './CharacterCounter';
import LivePreview from './LivePreview';
import toast from 'react-hot-toast';

const SEOForm = ({ initialData, isEdit }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.seo);
    const fileInputRef = useRef(null);
    const urlManuallyEdited = useRef(false);
    const initialMount = useRef(true);

    const formik = useFormik({
        initialValues: {
            metaTitle: initialData?.metaTitle || '',
            metaDescription: initialData?.metaDescription || '',
            metaKeywords: initialData?.metaKeywords || '',
            canonicalUrl: initialData?.canonicalUrl || '',
            ogTitle: initialData?.ogTitle || '',
            ogDescription: initialData?.ogDescription || '',
            ogAlt: initialData?.ogAlt || '',
            robots: initialData?.robots || 'index',
            ogImage: initialData?.ogImage || '',
        },
        enableReinitialize: true,
        validationSchema: seoValidationSchema,
        onSubmit: async (values) => {
            const toastId = toast.loading('Saving...');
            try {
                if (isEdit && initialData?.id) {
                    await dispatch(updateSeo({ id: initialData.id, data: values })).unwrap();
                    toast.success('SEO Settings Updated Successfully', { id: toastId });
                } else {
                    await dispatch(saveSeo(values)).unwrap();
                    toast.success('SEO Settings Saved Successfully', { id: toastId });
                }
                urlManuallyEdited.current = false;
                initialMount.current = true;
                dispatch(clearSeo());
                formik.resetForm({
                    values: {
                        metaTitle: '',
                        metaDescription: '',
                        metaKeywords: '',
                        canonicalUrl: '',
                        ogTitle: '',
                        ogDescription: '',
                        ogAlt: '',
                        robots: 'index',
                        ogImage: '',
                    },
                });
            } catch (error) {
                const msg = error?.message || 'Something went wrong';
                toast.error(msg, { id: toastId });
            }
        },
    });

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
            if (initialData?.canonicalUrl) {
                urlManuallyEdited.current = true;
            }
            return;
        }
        if (!urlManuallyEdited.current && formik.values.metaTitle) {
            const slug = formik.values.metaTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .replace(/-+/g, '-');
            formik.setFieldValue('canonicalUrl', `https://example.com/${slug}`);
        }
    }, [formik.values.metaTitle]);

    const handleChange = (e) => {
        if (e.target.name === 'canonicalUrl') {
            urlManuallyEdited.current = true;
        }
        formik.handleChange(e);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            formik.setFieldValue('ogImage', e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        formik.setFieldValue('ogImage', '');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <form onSubmit={formik.handleSubmit} className="p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Forms Section */}
                <div className="lg:col-span-7 space-y-8">
                    {/* General SEO Section */}
                    <section className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                            <Typography variant="h5" className="font-bold text-gray-800">
                                General SEO
                            </Typography>
                        </div>

                        <div>
                            <TextField
                                fullWidth
                                id="metaTitle"
                                name="metaTitle"
                                label="Meta Title *"
                                value={formik.values.metaTitle}
                                onChange={handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.metaTitle && Boolean(formik.errors.metaTitle)}
                                helperText={formik.touched.metaTitle && formik.errors.metaTitle}
                                variant="outlined"
                                inputProps={{ maxLength: 60 }}
                            />
                            <CharacterCounter currentLength={formik.values.metaTitle.length} maxLength={60} />
                        </div>

                        <div>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                id="metaDescription"
                                name="metaDescription"
                                label="Meta Description *"
                                value={formik.values.metaDescription}
                                onChange={handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.metaDescription && Boolean(formik.errors.metaDescription)}
                                helperText={formik.touched.metaDescription && formik.errors.metaDescription}
                                variant="outlined"
                                inputProps={{ maxLength: 160 }}
                            />
                            <CharacterCounter currentLength={formik.values.metaDescription.length} maxLength={160} />
                        </div>

                        <TextField
                            fullWidth
                            id="metaKeywords"
                            name="metaKeywords"
                            label="Meta Keywords *"
                            placeholder="keyword1, keyword2, keyword3"
                            value={formik.values.metaKeywords}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.metaKeywords && Boolean(formik.errors.metaKeywords)}
                            helperText={(formik.touched.metaKeywords && formik.errors.metaKeywords) || "Separate keywords with commas"}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            id="canonicalUrl"
                            name="canonicalUrl"
                            label="Canonical URL *"
                            value={formik.values.canonicalUrl}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.canonicalUrl && Boolean(formik.errors.canonicalUrl)}
                            helperText={formik.touched.canonicalUrl && formik.errors.canonicalUrl}
                            variant="outlined"
                        />

                        <FormControl component="fieldset" error={formik.touched.robots && Boolean(formik.errors.robots)}>
                            <FormLabel component="legend" className="font-semibold text-gray-700">Robots Indexing *</FormLabel>
                            <RadioGroup
                                row
                                name="robots"
                                value={formik.values.robots}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="index" control={<Radio color="primary" />} label="Index" />
                                <FormControlLabel value="noindex" control={<Radio color="primary" />} label="No Index" />
                            </RadioGroup>
                            {formik.touched.robots && formik.errors.robots && (
                                <Typography variant="caption" color="error">{formik.errors.robots}</Typography>
                            )}
                        </FormControl>
                    </section>

                    {/* Open Graph Section */}
                    <section className="space-y-6 p-6 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border border-purple-100">
                        <div className="flex items-center gap-3 pb-2 border-b border-purple-100">
                            <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                            <Typography variant="h5" className="font-bold text-gray-800">
                                Open Graph (Social Media)
                            </Typography>
                        </div>

                        <TextField
                            fullWidth
                            id="ogTitle"
                            name="ogTitle"
                            label="Open Graph Title *"
                            value={formik.values.ogTitle}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.ogTitle && Boolean(formik.errors.ogTitle)}
                            helperText={formik.touched.ogTitle && formik.errors.ogTitle}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            id="ogDescription"
                            name="ogDescription"
                            label="Open Graph Description *"
                            value={formik.values.ogDescription}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.ogDescription && Boolean(formik.errors.ogDescription)}
                            helperText={formik.touched.ogDescription && formik.errors.ogDescription}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            id="ogAlt"
                            name="ogAlt"
                            label="Open Graph Alt Text *"
                            value={formik.values.ogAlt}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.ogAlt && Boolean(formik.errors.ogAlt)}
                            helperText={formik.touched.ogAlt && formik.errors.ogAlt}
                            variant="outlined"
                        />

                        <div>
                            <FormLabel className="font-semibold text-gray-700 mb-2 block">
                                Open Graph Image
                            </FormLabel>
                            <div className="flex items-center gap-4">
                                {formik.values.ogImage ? (
                                    <div className="relative inline-block">
                                        <Avatar
                                            src={formik.values.ogImage}
                                            alt="OG Image Preview"
                                            variant="rounded"
                                            sx={{ width: 120, height: 80 }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={handleRemoveImage}
                                            sx={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                bgcolor: 'white',
                                                '&:hover': { bgcolor: '#fef2f2' },
                                            }}
                                        >
                                            <Delete fontSize="small" color="error" />
                                        </IconButton>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        startIcon={<PhotoCamera />}
                                    >
                                        Upload Image
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={handleImageUpload}
                                        />
                                    </Button>
                                )}
                                <TextField
                                    size="small"
                                    placeholder="Or paste image URL..."
                                    value={formik.values.ogImage}
                                    onChange={formik.handleChange('ogImage')}
                                    onBlur={formik.handleBlur('ogImage')}
                                    variant="outlined"
                                    className="flex-1"
                                />
                            </div>
                            {formik.touched.ogImage && formik.errors.ogImage && (
                                <Typography variant="caption" color="error">{formik.errors.ogImage}</Typography>
                            )}
                        </div>
                    </section>
                </div>

                {/* Live Preview Section */}
                <div className="lg:col-span-5">
                    <div className="sticky top-8">
                        <LivePreview values={formik.values} />
                    </div>
                </div>
            </div>

            <Divider className="my-8" />

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 mt-8 pt-4">
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={formik.handleReset}
                    disabled={loading}
                    className="w-full sm:w-auto"
                >
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        toast('Draft saved!', { icon: '📝' });
                    }}
                    disabled={loading}
                    className="w-full sm:w-auto"
                >
                    Save Draft
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto shadow-md hover:shadow-lg"
                    sx={{
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        '&:hover': { background: 'linear-gradient(135deg, #1d4ed8, #6d28d9)' },
                    }}
                >
                    {loading ? 'Saving...' : 'Save SEO'}
                </Button>
            </div>
        </form>
    );
};

export default SEOForm;
