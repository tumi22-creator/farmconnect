import { Colors, ThemeName } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useTheme() {
  const scheme = useColorScheme(); // expected: "light" | "dark" | "unspecified"
  const themeName = (scheme === "unspecified" ? "light" : scheme) as ThemeName;

  // Defensive: return Colors[themeName] or fallback to light
  return Colors[themeName] ?? Colors.light;
}
