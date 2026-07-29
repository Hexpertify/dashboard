import React, { useEffect, useCallback } from 'react';
import { Typography } from '@mui/material';
import SEOForm from '../components/SEOForm';
import SavedEntriesList from '../components/SavedEntriesList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeo, fetchSavedPages, deleteSeoEntry, setSeoData, clearSeo } from '../redux/seoSlice';
import toast from 'react-hot-toast';

const SEOSettings = () => {
    const dispatch = useDispatch();
    const { seoData, loading, error, savedPages } = useSelector((state) => state.seo);

    useEffect(() => {
        dispatch(fetchSavedPages());
    }, [dispatch]);

    useEffect(() => {
        if (error && !seoData?._local) {
            toast.error('Failed to load SEO data');
        }
    }, [error]);

    const handleLoadEntry = useCallback((page) => {
        dispatch(fetchSeo(page.id));
    }, [dispatch]);

    const handleDeleteEntry = useCallback((pageId) => {
        dispatch(deleteSeoEntry(pageId));
        toast.success('Entry deleted');
    }, [dispatch]);

    const handleNewEntry = useCallback(() => {
        dispatch(clearSeo());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
                    <div className="flex items-center gap-3">
                        <Typography variant="h4" className="font-extrabold text-white">
                            SEO Settings
                        </Typography>
                        {seoData?._local && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-yellow-200 text-yellow-900 rounded-full">
                                Offline Mode
                            </span>
                        )}
                    </div>
                    <Typography variant="subtitle1" className="text-blue-100 mt-2">
                        Manage meta tags and open graph settings for this page.
                    </Typography>
                </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-6 pb-10">
                {loading && !seoData?.id ? (
                    <div className="flex justify-center p-10 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <Typography>Loading SEO data...</Typography>
                    </div>
                ) : (
                    <>
                        <SavedEntriesList
                            pages={savedPages}
                            onLoad={handleLoadEntry}
                            onDelete={handleDeleteEntry}
                            onNew={handleNewEntry}
                        />
                        <SEOForm initialData={seoData} isEdit={Boolean(seoData?.id)} />
                    </>
                )}
            </div>
        </div>
    );
};

export default SEOSettings;
