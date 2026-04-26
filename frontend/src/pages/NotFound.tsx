import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f8fb] px-4 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#245896]">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#18324f]">Page not found</h1>
        <p className="mt-3 text-[#62758d]">The page you requested is not available.</p>
        <Link to="/">
          <Button className="mt-6">Return home</Button>
        </Link>
      </div>
    </main>
  );
}

