import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { THEME_STORAGE_KEY, THEMES } from '../utils/constants';
import { isBrowser } from '../utils/helpers';

const ThemeContext = createContext(undefined);

const getSystemTheme = () => {
  if (!isBrowser() || !window.matchMedia) return THEMES.LIGHT;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
};

const getStoredTheme = () => {
  if (!isBrowser()) return null;
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return Object.values(THEMES).includes(storedTheme) ? storedTheme : null;
};

export function ThemeProvider({ children, defaultTheme }) {
  const [theme, setThemeState] = useState(() => defaultTheme || getStoredTheme() || getSystemTheme());

  const setTheme = useCallback((nextTheme) => {
    setThemeState((currentTheme) => {
      const resolvedTheme = typeof nextTheme === 'function' ? nextTheme(currentTheme) : nextTheme;
      return Object.values(THEMES).includes(resolvedTheme) ? resolvedTheme : currentTheme;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  }, [setTheme]);

  useEffect(() => {
    if (!isBrowser()) return;
    document.documentElement.dataset.annTheme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    isDarkMode: theme === THEMES.DARK,
    isLightMode: theme === THEMES.LIGHT,
    setTheme,
    toggleTheme,
  }), [setTheme, theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };
