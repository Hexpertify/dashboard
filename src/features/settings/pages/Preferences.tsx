import { ThemeSwitcher } from '../components/ThemeSwitcher';

export function Preferences() {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Preferences</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Customize your experience and default settings.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
          <ThemeSwitcher />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Language & Region</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Language
              </label>
              <select
                id="language"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Timezone
              </label>
              <select
                id="timezone"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>UTC</option>
                <option>America/New_York</option>
                <option>America/Los_Angeles</option>
                <option>Europe/London</option>
                <option>Europe/Paris</option>
                <option>Asia/Tokyo</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date Format
              </label>
              <select
                id="dateFormat"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="timeFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Format
              </label>
              <select
                id="timeFormat"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>12-hour</option>
                <option>24-hour</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editor Preferences</h2>
          <div className="space-y-4">
            {[
              { id: 'autoSave', label: 'Auto-save changes', description: 'Automatically save drafts every 30 seconds', default: true },
              { id: 'spellCheck', label: 'Spell check', description: 'Enable browser spell checking in text areas', default: true },
              { id: 'lineNumbers', label: 'Show line numbers', description: 'Display line numbers in code editors', default: false },
              { id: 'wordWrap', label: 'Word wrap', description: 'Wrap long lines in editors', default: true },
              { id: 'minimap', label: 'Show minimap', description: 'Display code minimap on the right side', default: false },
            ].map((item) => (
              <label key={item.id} className="flex items-start justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={item.default}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 shrink-0 mt-0.5"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data & Privacy</h2>
          <div className="space-y-4">
            {[
              { id: 'analytics', label: 'Usage analytics', description: 'Help improve the product by sharing anonymous usage data', default: true },
              { id: 'crashReports', label: 'Crash reports', description: 'Automatically send crash reports for debugging', default: true },
              { id: 'marketing', label: 'Marketing emails', description: 'Receive product updates and tips via email', default: false },
            ].map((item) => (
              <label key={item.id} className="flex items-start justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={item.default}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 shrink-0 mt-0.5"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}