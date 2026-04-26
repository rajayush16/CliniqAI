import { NavLink } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import { BrandLogo } from "../common/BrandLogo";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-[#dbe6f2] bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 lg:hidden">
          <Menu className="h-5 w-5 text-[#4d6178]" />
          <BrandLogo to="/app" size="compact" />
        </div>
        <div className="hidden items-center gap-2 rounded-md border border-[#dbe6f2] bg-[#f8fbfe] px-3 py-2 text-sm text-[#8293a7] lg:flex">
          <Search className="h-4 w-4" />
          PubMed and Europe PMC only
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-[#18324f]">{user?.name ?? "Doctor"}</p>
            <p className="text-xs text-[#8293a7]">{user?.role ?? "doctor"}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} aria-label="Log out">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-[#eef3f8] px-3 py-2 lg:hidden">
        {[
          ["/app", "Dashboard"],
          ["/app/ask", "Ask"],
          ["/app/history", "History"],
          ["/app/saved-papers", "Saved"],
          ["/app/settings", "Settings"],
        ].map(([href, label]) => (
          <NavLink key={href} to={href} end={href === "/app"} className="rounded-md px-3 py-1.5 text-sm font-medium text-[#4d6178]">
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
