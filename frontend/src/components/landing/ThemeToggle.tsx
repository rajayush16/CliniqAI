import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-11 w-[86px] items-center justify-center gap-2 rounded-full border border-slate-300/80 bg-white/80 p-1 text-slate-700 shadow-sm backdrop-blur-md transition hover:border-cyan-400 hover:bg-white dark:border-cyan-100/30 dark:bg-white/[0.1] dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] dark:hover:border-cyan-200/70 dark:hover:bg-white/[0.16]"
    >
      <span
        className={
          theme === "light"
            ? "grid h-7 w-7 place-items-center rounded-full bg-white text-amber-500 shadow-sm transition"
            : "grid h-7 w-7 place-items-center rounded-full text-slate-500 transition dark:text-cyan-50/70"
        }
      >
        <Sun className="h-4 w-4" />
      </span>
      <span
        className={
          theme === "dark"
            ? "grid h-7 w-7 place-items-center rounded-full bg-white text-amber-500 shadow-sm transition"
            : "grid h-7 w-7 place-items-center rounded-full text-slate-500 transition dark:text-cyan-50/70"
        }
      >
        <Moon className="h-4 w-4" />
      </span>
    </button>
  );
}
