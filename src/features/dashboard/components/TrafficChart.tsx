import { useMemo } from 'react';
import { useAppSelector } from '@/app/hooks';
import { formatNumber } from '@/utils/helpers';

interface TrafficChartProps {
  height?: number;
}

export function TrafficChart({ height = 300 }: TrafficChartProps) {
  const data = useAppSelector((state) => state.dashboard.trafficData);

  const { points, linePath, areaPath, maxValue, minValue } = useMemo(() => {
    const width = 800;
    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    if (data.length === 0) {
      return { points: [], linePath: '', areaPath: '', maxValue: 0, minValue: 0 };
    }

    const values = data.map((d) => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;

    const stepX = chartWidth / (data.length - 1 || 1);

    const points = data.map((d, i) => {
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((d.value - minValue) / range) * chartHeight;
      return { x, y, ...d };
    });

    const linePath = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(' ');

    const areaPath =
      points.length > 0
        ? `${linePath} L${points[points.length - 1].x.toFixed(1)},${(padding.top + chartHeight).toFixed(1)} L${points[0].x.toFixed(1)},${(padding.top + chartHeight).toFixed(1)} Z`
        : '';

    return { points, linePath, areaPath, maxValue, minValue };
  }, [data, height]);

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">No traffic data available</p>
      </div>
    );
  }

  const yTicks = [maxValue, (maxValue + minValue) / 2, minValue];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Organic Traffic Overview</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monthly organic sessions for the current year</p>
        </div>
        <span className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="w-3 h-3 bg-blue-600 rounded-full" aria-hidden="true" />
          Sessions
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 800 300"
          style={{ height: `${height}px`, minWidth: '600px', width: '100%' }}
          role="img"
          aria-label="Organic traffic chart"
        >
          <defs>
            <linearGradient id="trafficArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75, 1].map((f) => (
            <line
              key={f}
              x1="50"
              x2="780"
              y1={300 * f}
              y2={300 * f}
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeDasharray="4 4"
            />
          ))}

          {areaPath && <path d={areaPath} fill="url(#trafficArea)" />}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="4" fill="#2563eb" stroke="#fff" strokeWidth="2">
                <title>{`${p.date}: ${formatNumber(p.value)} sessions`}</title>
              </circle>
              <text x={p.x} y={290} textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.6">
                {p.date}
              </text>
            </g>
          ))}

          {yTicks.map((tick) => (
            <text key={tick} x={44} y={20 + (1 - (tick - minValue) / (maxValue - minValue || 1)) * 240} textAnchor="end" fontSize="11" fill="currentColor" fillOpacity="0.6">
              {formatNumber(tick)}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
