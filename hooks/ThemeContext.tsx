
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<Theme>(colorScheme ?? "light");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("app-theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
        setColorScheme(storedTheme);
      } else {
        // Si no hay tema guardado, usamos el del sistema
        setTheme(colorScheme as Theme);
      }
    };
    loadTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 Guardar el tema cada vez que cambia
  useEffect(() => {
    AsyncStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    setColorScheme(next);
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <View className={theme} style={{ flex: 1 }}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext debe usarse dentro de ThemeProviderCustom");
  return ctx;
};