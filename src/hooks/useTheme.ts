import { useEffect, useState } from "react";

type Theme = "dark-theme" | "light-theme";
const STORAGE_KEY = "theme";

export const useTheme = () => {
  const getInitialTheme = (): Theme => {
    const stored = sessionStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) return stored;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return prefersDark ? "dark-theme" : "light-theme";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === "dark-theme" ? "light-theme" : "dark-theme"));
  };

  useEffect(() => {
    const body = document.body;

    body.classList.remove("dark-theme", "light-theme");
    body.classList.add(theme);

    sessionStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isDark = theme === "dark-theme";

  return { theme, isDark, toggleTheme };
};
