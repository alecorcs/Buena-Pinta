import type { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'Buena Pinta',
  slug: 'buena-pinta',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'buena-pinta',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    icon: {
      dark: "./assets/icons/ios-dark.png",
      light: "./assets/icons/ios-light.png",
      tinted: "./assets/icons/ios-tinted.png",
    }
  },
  android: {
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: "./assets/icons/adaptive-icon.png",
      monochromeImage: "./assets/icons/adaptive-icon.png",
      backgroundColor: "#ffffff",
    }
  },
  web: {
    bundler: 'metro',
    output: 'static',
  },
  plugins: [
    'expo-router',
    [
      "expo-splash-screen",
      {
        image: "./assets/icons/splash-icon-dark.png",
        imageWidth: 200,
        resizeMode: "contain",
        bacgroundColor: "#ffffff",
        dark: {
          image: "./assets/icos/splash-icon-light.png",
          backgroundColor: "#000000"
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
