export enum ThemeTypes {
  Dark = "dark",
  Light = "light",
  System = "system",
}

export enum SystemThemeTypes {
  Dark = "dark",
  Light = "light",
}

export interface IPreferenceStore {
  theme: ThemeTypes;
  systemTheme: SystemThemeTypes;
  setTheme: (type: ThemeTypes) => void;
  setSystemTheme: () => void;
}
