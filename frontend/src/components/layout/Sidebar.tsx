import { NavLink } from "react-router-dom";
import { BookMarked, History, LayoutDashboard, Search, Settings, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import { BrandLogo } from "../common/BrandLogo";
import { ThemeToggle } from "../common/ThemeToggle";
import { UserProfileCard } from "../common/UserProfileCard";
import { useAuth } from "../../hooks/useAuth";

const items = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/ask", label: "Ask Question", icon: Search },
  { href: "/app/history", label: "History", icon: History },
  { href: "/app/saved-papers", label: "Saved Papers", icon: BookMarked },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden w-72 border-r border-white/70 bg-white/72 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/72 lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-slate-200/70 px-6 dark:border-slate-800">
        <BrandLogo to="/app" size="nav" />
      </div>
      <div className="mx-4 mt-4 rounded-2xl border border-cyan-200/60 bg-gradient-to-br from-cyan-50 to-blue-50 p-4 dark:border-cyan-400/20 dark:from-cyan-400/10 dark:to-blue-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
          <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
          Medical AI workspace
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">Citation-first answers from trusted clinical literature.</p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/app"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                isActive
                  ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10 dark:bg-cyan-400 dark:text-slate-950 dark:shadow-cyan-400/20"
                  : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white",
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-3 border-t border-slate-200/70 p-4 dark:border-slate-800">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/60 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/50">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Appearance</span>
          <ThemeToggle />
        </div>
        <UserProfileCard user={user} onLogout={logout} />
      </div>
    </aside>
  );
}
