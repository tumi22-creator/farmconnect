// src/hooks/use-color-scheme.ts
import { useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export function useColorScheme(): ColorSchemeName {
  const [scheme, setScheme] = useState<ColorSchemeName>(Appearance.getColorScheme() ?? "light");

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setScheme(colorScheme ?? "light");
    });
    return () => sub.remove();
  }, []);

  return scheme;
}

export default useColorScheme;
