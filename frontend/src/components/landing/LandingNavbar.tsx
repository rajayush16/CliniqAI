import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeLogo } from "../common/ThemeLogo";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = ["Features", "How it works", "Sources", "Pricing", "About"];

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 text-slate-950 backdrop-blur-md transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-50">
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <ThemeLogo to="/" size="nav" className="h-14 w-56 sm:w-60" />

        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item}
              href={item === "How it works" ? "#how-it-works" : "#sources"}
              className="text-sm font-semibold !text-slate-700 transition-colors duration-200 hover:!text-blue-600 dark:!text-slate-200 dark:hover:!text-cyan-400"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login" className="hidden text-sm font-semibold !text-slate-800 transition-colors duration-200 hover:!text-blue-600 dark:!text-slate-100 dark:hover:!text-cyan-400 sm:inline">
            Log in
          </Link>
          <Link to="/signup" className="hidden sm:inline-flex">
            <Button size="sm" className="h-11 rounded-xl px-5 shadow-cyan-500/20">
              Start for free
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
