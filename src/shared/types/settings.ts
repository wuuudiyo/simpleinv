export type ThemeMode = 'light' | 'dark' | 'custom';

export interface ThemeSettings {
  mode: ThemeMode;
  customColor?: string;
}

export interface AppSettings {
  theme: ThemeSettings;
}

export interface AppInfo {
  version: string;
  dbPath: string;
}

export const SETTING_KEYS = {
  THEME: 'theme',
} as const;

export const DEFAULT_THEME: ThemeSettings = {
  mode: 'light',
};
