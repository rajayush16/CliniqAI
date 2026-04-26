import { Link } from "react-router-dom";
import logoUrl from "../../../images/Logo - CliniqAI.png";
import { cn } from "../../lib/utils";

type BrandLogoProps = {
  to?: string;
  size?: "compact" | "nav" | "hero";
  className?: string;
};

const sizeClass = {
  compact: "h-10 w-28",
  nav: "h-12 w-36",
  hero: "h-24 w-64",
};

export function BrandLogo({ to, size = "nav", className }: BrandLogoProps) {
  const logo = (
    <img
      src={logoUrl}
      alt="CliniqAI"
      className={cn("object-contain object-left", sizeClass[size], className)}
    />
  );

  return to ? (
    <Link to={to} className="inline-flex items-center">
      {logo}
    </Link>
  ) : (
    logo
  );
}

