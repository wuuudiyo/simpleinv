import { create } from 'zustand';
import type { ThemeSettings, ThemeMode } from '../../shared/types/settings';
import { SETTING_KEYS, DEFAULT_THEME } from '../../shared/types/settings';

interface ThemeState {
  theme: ThemeSettings;
  isLoading: boolean;
  loadTheme: () => Promise<void>;
  setTheme: (theme: ThemeSettings) => Promise<void>;
  setMode: (mode: ThemeMode) => Promise<void>;
  setCustomColor: (color: string) => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: DEFAULT_THEME,
  isLoading: true,

  loadTheme: async () => {
    set({ isLoading: true });
    try {
      const savedTheme = await window.api.settings.get(SETTING_KEYS.THEME);
      set({ theme: savedTheme ?? DEFAULT_THEME, isLoading: false });
    } catch (error) {
      console.error('Failed to load theme:', error);
      set({ theme: DEFAULT_THEME, isLoading: false });
    }
  },

  setTheme: async (theme: ThemeSettings) => {
    set({ theme });
    await window.api.settings.set(SETTING_KEYS.THEME, theme);
  },

  setMode: async (mode: ThemeMode) => {
    const { theme, setTheme } = get();
    await setTheme({ ...theme, mode });
  },

  setCustomColor: async (color: string) => {
    const { theme, setTheme } = get();
    await setTheme({ ...theme, mode: 'custom', customColor: color });
  },
}));
