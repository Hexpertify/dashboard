import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const LivePreview = ({ values }) => {
    const { metaTitle, metaDescription, canonicalUrl, ogTitle, ogDescription, ogImage } = values;

    let displayDomain = 'yoursite.com';
    try {
        if (canonicalUrl) {
            const urlObj = new URL(canonicalUrl);
            displayDomain = urlObj.hostname;
        }
    } catch (error) {
        displayDomain = canonicalUrl;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                <Typography variant="h5" className="font-bold text-gray-800">
                    Live SEO Preview
                </Typography>
            </div>

           
            <Card variant="outlined" className="shadow-sm border-gray-200">
                <CardContent className="space-y-2">
                    <Typography variant="subtitle2" color="textSecondary" className="uppercase font-semibold text-xs tracking-wider">
                        Google Search Preview
                    </Typography>
                    <div className="pt-2">
                        <Typography variant="body2" className="text-sm text-gray-600 truncate">
                            {canonicalUrl || 'https://www.yoursite.com/page'}
                        </Typography>
                        <Typography variant="h6" className="text-xl text-blue-800 hover:underline cursor-pointer truncate font-normal leading-tight mt-1">
                            {metaTitle || 'Your Page Meta Title Will Appear Here'}
                        </Typography>
                        <Typography variant="body2" className="text-sm text-gray-700 mt-1 line-clamp-2">
                            {metaDescription || 'Add a compelling meta description to encourage users to click on your search result. Keep it descriptive and under 160 characters.'}
                        </Typography>
                    </div>
                </CardContent>
            </Card>

          
            <Card variant="outlined" className="shadow-sm border-gray-200 overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <Typography variant="subtitle2" color="textSecondary" className="uppercase font-semibold text-xs tracking-wider">
                            Social Media Preview (Facebook / LinkedIn)
                        </Typography>
                    </div>
                    <div>
                        <div className={`w-full h-52 ${ogImage ? '' : 'bg-gray-200'} flex items-center justify-center text-gray-400 overflow-hidden`}>
                            {ogImage ? (
                                <img src={ogImage} alt="OG Preview" className="w-full h-full object-cover" />
                            ) : (
                                '1200 x 630 Image'
                            )}
                        </div>
                        <div className="p-4 bg-gray-50 bg-opacity-50">
                            <Typography variant="body2" className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                                {displayDomain}
                            </Typography>
                            <Typography variant="subtitle1" className="font-bold text-gray-900 leading-tight truncate">
                                {ogTitle || metaTitle || 'Open Graph Title'}
                            </Typography>
                            <Typography variant="body2" className="text-sm text-gray-600 mt-1 line-clamp-1">
                                {ogDescription || metaDescription || 'Open graph description placeholder text.'}
                            </Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LivePreview;
