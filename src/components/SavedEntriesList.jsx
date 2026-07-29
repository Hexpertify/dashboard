import React from 'react';
import { Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';

const SavedEntriesList = ({ pages, onLoad, onDelete, onNew }) => {
    if (pages.length === 0) return null;

    return (
        <Card variant="outlined" className="shadow-sm border-gray-200 mb-6">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <Typography variant="subtitle2" className="font-semibold text-gray-700">
                        Saved Pages ({pages.length})
                    </Typography>
                    <Button size="small" startIcon={<Add />} onClick={onNew}>
                        Add New
                    </Button>
                </div>
                <div className="space-y-2">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                <Typography variant="body2" className="truncate font-medium text-gray-800">
                                    {page.metaTitle}
                                </Typography>
                                <Typography variant="caption" className="text-gray-400 flex-shrink-0">
                                    {new Date(page.updatedAt).toLocaleDateString()}
                                </Typography>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                                <IconButton size="small" onClick={() => onLoad(page)} title="Edit">
                                    <Edit fontSize="small" className="text-gray-500" />
                                </IconButton>
                                <IconButton size="small" onClick={() => onDelete(page.id)} title="Delete">
                                    <Delete fontSize="small" className="text-red-400" />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default SavedEntriesList;
