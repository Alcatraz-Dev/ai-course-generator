"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { themes } from "@/lib/themes"; // Adjust the path as necessary

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize theme and mode from local storage or default values
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "Orange";
  });
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "dark";
  });

  // Update CSS variables when theme or mode changes
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme]?.[mode];

    if (currentTheme) {
      Object.keys(currentTheme).forEach((key) => {
        root.style.setProperty(key, currentTheme[key]);
      });

      // Save theme and mode to local storage
      localStorage.setItem("theme", theme);
      localStorage.setItem("mode", mode);
    }
  }, [theme, mode]);

  const value = {
    theme,
    setTheme,
    mode,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  return useContext(ThemeContext);
}