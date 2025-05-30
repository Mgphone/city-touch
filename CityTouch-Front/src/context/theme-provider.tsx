import React, { createContext, useContext, useState, useEffect } from "react";

type Theme =
  | "light"
  | "dark"
  | "system"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  //checker
  useEffect(() => {
    if (theme === "system") {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.className = systemDark ? "dark" : "light";
    } else if (theme === "light" || theme === "dark") {
      document.documentElement.className = theme;
    } else {
      document.documentElement.className = `theme-${theme}`;
    }
    localStorage.setItem("theme", theme);

    console.log("Theme applied:", document.documentElement.className);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
