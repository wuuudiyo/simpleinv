import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { getContrastColor } from '../utils/colorUtils';

export function useTheme() {
  const { theme, isLoading, loadTheme } = useThemeStore();

  // Load theme on mount
  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove('light', 'dark', 'custom');

    switch (theme.mode) {
      case 'dark':
        root.classList.add('dark');
        root.style.removeProperty('--custom-bg-color');
        root.style.removeProperty('--custom-text-color');
        break;
      case 'custom':
        root.classList.add('custom');
        if (theme.customColor) {
          root.style.setProperty('--custom-bg-color', theme.customColor);
          // Auto-adjust text color based on background
          const textMode = getContrastColor(theme.customColor);
          root.style.setProperty(
            '--custom-text-color',
            textMode === 'dark' ? '#111827' : '#F9FAFB'
          );
        }
        break;
      default: // light
        root.classList.add('light');
        root.style.removeProperty('--custom-bg-color');
        root.style.removeProperty('--custom-text-color');
    }
  }, [theme]);

  return { theme, isLoading };
}
