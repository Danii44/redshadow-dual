"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  switchable?: boolean;
}

function resolveTheme(mode: ThemeMode): Theme {
  if (typeof window !== "undefined" && mode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return mode === "dark" ? "dark" : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  switchable = true,
}: ThemeProviderProps) {
  const getInitialMode = (): ThemeMode => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("themeMode");
      if (stored === "light" || stored === "dark" || stored === "system") return stored;
    }
    return defaultTheme;
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialMode);
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(getInitialMode()));

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");

    if (typeof window !== "undefined") {
      window.localStorage.setItem("themeMode", mode);
    }
  }, [theme, mode]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (mode !== "system") {
      setTheme(mode);
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateModeTheme = () => {
      setTheme(media.matches ? "dark" : "light");
    };

    updateModeTheme();
    if (media.addEventListener) {
      media.addEventListener("change", updateModeTheme);
    } else {
      media.addListener(updateModeTheme);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", updateModeTheme);
      } else {
        media.removeListener(updateModeTheme);
      }
    };
  }, [mode]);

  const toggleTheme = () => {
    setMode(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, setMode, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
