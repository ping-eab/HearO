import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance } from "react-native";

// ✅ Define the type for our context data
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// ✅ Create the context with a default undefined value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(Appearance.getColorScheme() || "light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
