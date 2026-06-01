export const Colors = {
  light: {
    mono: {
      50:  "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827"
    },
    background: "#ffffff",
    text: "#111827",
    primary: "#2563eb"
  },
  dark: {
    mono: {
      50:  "#0b1220",
      100: "#0f1724",
      200: "#111827",
      300: "#1f2937",
      400: "#374151",
      500: "#4b5563",
      600: "#6b7280",
      700: "#9ca3af",
      800: "#d1d5db",
      900: "#f3f4f6"
    },
    background: "#0b1220",
    text: "#e6eef8",
    primary: "#60a5fa"
  }
} as const;

export type ThemeName = keyof typeof Colors;
export type Theme = typeof Colors.light;
