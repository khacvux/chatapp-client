import create from "zustand";
import jwt from "jwt-decode";
import { persist } from "zustand/middleware";
import { signin, signup } from "../apis";
import { IPreferenceStore, SystemThemeTypes, ThemeTypes } from "../dtos";

export const usePreferenceStore = create<IPreferenceStore>()(
  persist(
    (set, get) => ({
      theme: ThemeTypes.Light,
      systemTheme: SystemThemeTypes.Light,
      setTheme: (type) => {
        set({
          theme: type,
        });
      },
      setSystemTheme: () => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          set({
            systemTheme: SystemThemeTypes.Dark,
          });
        } else {
          set({
            systemTheme: SystemThemeTypes.Light,
          });
        }
      },
    }),
    {
      name: "preference-storage",
    }
  )
);
