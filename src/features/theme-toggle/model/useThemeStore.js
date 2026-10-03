import { create } from "zustand";
import { persist } from "zustand/middleware";

export const THEMES = {
  light: "light",
  dark: "dark",
};

function getSystemTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? THEMES.dark : THEMES.light;
}

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: getSystemTheme(),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === THEMES.dark ? THEMES.light : THEMES.dark,
        })),
    }),
    { name: "theme" },
  ),
);
