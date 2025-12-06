import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useThemeStore } from '../../stores/themeStore';
import type { ThemeMode } from '../../../shared/types/settings';

const modes: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'custom', label: 'Custom', icon: '🎨' },
];

export function ThemeToggle() {
  const { theme, setMode, setCustomColor } = useThemeStore();
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPicker]);

  const handleModeClick = (mode: ThemeMode) => {
    if (mode === 'custom') {
      setShowPicker(!showPicker);
      if (theme.mode !== 'custom') {
        setMode('custom');
      }
    } else {
      setShowPicker(false);
      setMode(mode);
    }
  };

  return (
    <div className="relative" ref={pickerRef}>
      {/* Mode Selector */}
      <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
        {modes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => handleModeClick(mode.value)}
            className={`
              px-3 py-1.5 text-sm rounded-md transition-colors
              ${theme.mode === mode.value
                ? 'bg-white dark:bg-gray-600 shadow-sm'
                : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
            title={mode.label}
          >
            {mode.icon}
          </button>
        ))}
      </div>

      {/* Color Picker for Custom Mode */}
      {showPicker && theme.mode === 'custom' && (
        <div className="absolute right-0 top-full mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <HexColorPicker
            color={theme.customColor ?? '#3B82F6'}
            onChange={setCustomColor}
          />
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            {theme.customColor ?? '#3B82F6'}
          </div>
        </div>
      )}
    </div>
  );
}
