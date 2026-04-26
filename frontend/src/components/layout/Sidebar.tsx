import { NavLink } from "react-router-dom";
import { BookMarked, History, LayoutDashboard, Search, Settings } from "lucide-react";
import { cn } from "../../lib/utils";
import { BrandLogo } from "../common/BrandLogo";

const items = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/ask", label: "Ask Question", icon: Search },
  { href: "/app/history", label: "History", icon: History },
  { href: "/app/saved-papers", label: "Saved Papers", icon: BookMarked },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-[#dbe6f2] bg-white lg:block">
      <div className="flex h-20 items-center border-b border-[#e6edf5] px-6">
        <BrandLogo to="/app" size="nav" />
      </div>
      <nav className="space-y-1 p-4">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/app"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                isActive ? "bg-[#edf5ff] text-[#1f5fbf]" : "text-[#4d6178] hover:bg-[#f5f8fb] hover:text-[#18324f]",
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
