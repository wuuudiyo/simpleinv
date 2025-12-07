import { HexColorPicker } from 'react-colorful';
import { useThemeStore } from '../../stores/themeStore';
import type { ThemeMode } from '../../../shared/types/settings';

const modes: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light Mode' },
  { value: 'dark', label: 'Dark Mode' },
  { value: 'custom', label: 'Eigene Farbe' },
];

export function ThemeSelector() {
  const { theme, setMode, setCustomColor } = useThemeStore();

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900 dark:text-gray-100">Design</h3>

      <div className="space-y-2">
        {modes.map((mode) => (
          <label key={mode.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value={mode.value}
              checked={theme.mode === mode.value}
              onChange={() => setMode(mode.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">{mode.label}</span>
          </label>
        ))}
      </div>

      {theme.mode === 'custom' && (
        <div className="pt-2 space-y-3">
          <HexColorPicker
            color={theme.customColor ?? '#3B82F6'}
            onChange={setCustomColor}
          />
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div
              className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: theme.customColor ?? '#3B82F6' }}
            />
            <span>{theme.customColor ?? '#3B82F6'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
