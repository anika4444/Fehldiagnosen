/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const emeraldGreen = "#059669";
const mintGreen = "#D1FAE5";
const darkMoss = "#064E3B";
const ivory = "#F9FAFB";
const sunGold = "#F59E0B";
const darkBackground = "#151718";
const darkSurface = "#1F2937";
const lightEmerald = "#10B981";
const redAccent = "#EF4444";
const darkRedAccent = "#F87171";
const lightRedAccent = "#FEE2E2";
const fadeRedAccent = "rgba(239, 68, 68, 0.15)";

export const Colors = {
  light: {
    text: darkMoss,
    textwithbackground: ivory,
    background: ivory,
    surface: mintGreen,
    primary: emeraldGreen,
    accent: sunGold,
    tint: emeraldGreen,
    icon: darkMoss,
    tabIconDefault: "#9CA3AF",
    tabIconSelected: lightEmerald,
    closeIconColor: redAccent,
    closeBgColor: lightRedAccent,
  },
  dark: {
    text: ivory,
    textwithbackground: ivory,
    background: darkBackground,
    surface: darkSurface,
    primary: emeraldGreen,
    accent: sunGold,
    tint: lightEmerald,
    icon: ivory,
    tabIconDefault: "#6B7280",
    tabIconSelected: lightEmerald,
    closeIconColor: darkRedAccent,
    closeBgColor: fadeRedAccent,
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
