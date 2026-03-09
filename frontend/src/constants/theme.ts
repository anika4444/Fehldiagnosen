/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const smaragdGruen = "#059669";
const minzGruen = "#D1FAE5";
const dunklesMoos = "#064E3B";
const elfenbein = "#F9FAFB";
const sonnenGold = "#F59E0B";
const darkBackground = "#151718";
const darkSurface = "#1F2937";
const smaragdHell = "#10B981";

export const Colors = {
  light: {
    text: dunklesMoos,
    textwithbackground: elfenbein,
    background: elfenbein,
    surface: minzGruen,
    primary: smaragdGruen,
    accent: sonnenGold,
    tint: smaragdGruen,
    icon: dunklesMoos,
    tabIconDefault: "#9CA3AF",
    tabIconSelected: smaragdHell,
  },
  dark: {
    text: elfenbein,
    textwithbackground: elfenbein,
    background: darkBackground,
    surface: darkSurface,
    primary: smaragdGruen,
    accent: sonnenGold,
    tint: smaragdHell,
    icon: elfenbein,
    tabIconDefault: "#6B7280",
    tabIconSelected: smaragdHell,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
