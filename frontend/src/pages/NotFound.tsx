import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center text-slate-950 dark:text-white">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">404</p>
        <h1 className="mt-3 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">The page you requested is not available.</p>
        <Link to="/">
          <Button className="mt-6">Return home</Button>
        </Link>
      </div>
    </main>
  );
}
