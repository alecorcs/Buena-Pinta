import { Colors } from './constants/Colors';
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: Colors.light.primary,
          secondary: Colors.light.secondary,
          tertiary: Colors.light.tertiary,
          success: Colors.light.success,

          text: Colors.light.text,
          background: Colors.light.background,
          activeDrawer: Colors.light.activeDrawer,
          floatButtom: Colors.light.floatButtom,
          defaultBeerCard: Colors.light.defaultBeerCard,

        },
        dark: {
          primary: Colors.dark.primary,
          secondary: Colors.dark.secondary,
          tertiary: Colors.dark.tertiary,
          success: Colors.dark.success,

          text: Colors.dark.text,
          background: Colors.dark.background,
          activeDrawer: Colors.dark.activeDrawer,
          floatButtom: Colors.dark.floatButtom,
          defaultBeerCard: Colors.dark.defaultBeerCard,
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
}