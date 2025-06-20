import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface ThemesContextType {
  theme: string;
  changeTheme: (themeName: string) => Promise<void>;
}

const ThemesContext = createContext<ThemesContextType | undefined>(undefined);

export const ThemesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("christmas");
  console.log(theme);

  useEffect(() => {
    const activeTheme = localStorage.getItem("activeTheme");

    if (activeTheme) {
      setTheme(activeTheme);
    } else {
      localStorage.setItem("activeTheme", "christmas");
    }
  }, []);

  const changeTheme = async (themeName: string) => {
    try {
      setTheme(themeName);
      localStorage.setItem("activeTheme", themeName);
    } catch (error) {
      console.log(error);
      toast.error("Theme change error");
    }
  };

  return (
    <ThemesContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};

export const useThemes = () => {
  const context = useContext(ThemesContext);

  if (context === undefined) {
    throw new Error("useTheme must be user within an AuthProvider");
  }
  return context;
};
