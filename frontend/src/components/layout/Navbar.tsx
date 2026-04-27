import { NavLink } from "react-router-dom";
import { Menu, Search, Sparkles } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { ThemeLogo } from "../common/ThemeLogo";
import { ThemeToggle } from "../common/ThemeToggle";

export function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-white/70 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 lg:hidden">
          <Menu className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          <ThemeLogo to="/app" size="compact" />
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400 lg:flex">
          <Search className="h-4 w-4" />
          PubMed and Europe PMC only
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-cyan-50 px-3 py-2 text-xs font-bold text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-200 sm:flex">
            <Sparkles className="h-3.5 w-3.5" />
            AI evidence agent
          </div>
          <ThemeToggle />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-950 dark:text-white">{user?.name ?? "Doctor"}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role ?? "doctor"}</p>
          </div>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-slate-200/70 px-3 py-2 dark:border-slate-800 lg:hidden">
        {[
          ["/app", "Dashboard"],
          ["/app/ask", "Ask"],
          ["/app/history", "History"],
          ["/app/saved-papers", "Saved"],
          ["/app/settings", "Settings"],
        ].map(([href, label]) => (
          <NavLink key={href} to={href} end={href === "/app"} className="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
