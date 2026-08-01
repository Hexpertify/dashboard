import React from 'react';
import { Typography } from '@mui/material';

const CharacterCounter = ({ currentLength, maxLength }) => {
    const isNearLimit = currentLength >= maxLength * 0.9;
    const isOverLimit = currentLength > maxLength;

    let color = 'text-gray-500';
    if (isOverLimit) {
        color = 'text-red-500';
    } else if (isNearLimit) {
        color = 'text-orange-500';
    }

    return (
        <Typography
            variant="caption"
            className={`text-right block w-full mt-1 font-medium ${color}`}
        >
            {currentLength} / {maxLength}
        </Typography>
    );
};

export default CharacterCounter;
