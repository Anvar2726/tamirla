import { THEMES, useThemeStore } from "./model/useThemeStore";
import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const nextThemeLabel = theme === THEMES.dark ? "Light theme" : "Dark theme";

  return (
    <button type="button" className={styles.button} onClick={toggleTheme}>
      {nextThemeLabel}
    </button>
  );
}
