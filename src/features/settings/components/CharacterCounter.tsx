import LinearProgress from '@mui/material/LinearProgress';

interface CharacterCounterProps {
  value: string;
  maxLength?: number;
  recommendedLength?: number;
}

export function CharacterCounter({ value, maxLength, recommendedLength }: CharacterCounterProps) {
  const length = value.length;
  const isOverRecommended = !!recommendedLength && length > recommendedLength;
  const isOverMax = !!maxLength && length > maxLength;

  const progressColor: 'error' | 'warning' | 'primary' = isOverMax ? 'error' : isOverRecommended ? 'warning' : 'primary';

  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className={`text-xs ${
          isOverMax
            ? 'text-red-600 dark:text-red-400'
            : isOverRecommended
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {length} characters
        {recommendedLength && ` (recommended: ~${recommendedLength})`}
        {maxLength && ` / ${maxLength} max`}
      </span>
      {maxLength && (
        <div className="flex-1 max-w-xs">
          <LinearProgress
            variant="determinate"
            value={Math.min((length / maxLength) * 100, 100)}
            color={progressColor}
            sx={{ height: 6, borderRadius: 9999, backgroundColor: 'rgba(128, 128, 128, 0.2)' }}
          />
        </div>
      )}
    </div>
  );
}
