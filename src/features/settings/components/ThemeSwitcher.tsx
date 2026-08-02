import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="w-24 h-10" aria-hidden="true" />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">Theme:</span>
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1" role="radiogroup" aria-label="Theme selection">
        {(['light', 'dark', 'system'] as Theme[]).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              theme === t
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            role="radio"
            aria-checked={theme === t}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}