import { useThemeContext } from "@/hooks/ThemeContext";

export const useColorScheme = () => {
    const { theme } = useThemeContext();
    return theme;
};