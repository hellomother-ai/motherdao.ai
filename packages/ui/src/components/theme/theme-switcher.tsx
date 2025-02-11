import { Moon, Sun } from "lucide-react";

import { Button } from "..";
import { useTheme } from "./";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";
  const ThemeIcon = isLight ? Sun : Moon;

  return (
    <Button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      size="icon"
      variant="link"
      className="text-tertiary-300 dark:text-tertiary-300-highlight"
    >
      <ThemeIcon size={24} />
    </Button>
  );
}
