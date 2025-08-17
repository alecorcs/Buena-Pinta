
import { ThemeProviderCustom, useThemeContext } from '@/hooks/ThemeContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import "../global.css"; // Import global styles

function LayoutContent() {

  const { theme } = useThemeContext();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView className='flex-1 bg-light-background dark:bg-dark-background'>
      <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProviderCustom>
      <LayoutContent />
    </ThemeProviderCustom>
  );
}
