import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const darkLogo = "/images/Dark Mode Logo.png";
const lightLogo = "/images/White Mode Logo.png";

type ThemeLogoProps = {
  to?: string;
  className?: string;
  alt?: string;
  showText?: boolean;
  size?: "compact" | "nav" | "hero";
};

const sizeClass = {
  compact: "h-10 w-28",
  nav: "h-12 w-36",
  hero: "h-24 w-64",
};

export function ThemeLogo({
  to,
  className,
  alt = "CliniqAI logo",
  showText = true,
  size = "nav",
}: ThemeLogoProps) {
  const logoClassName = cn("object-contain object-left", sizeClass[size], !showText && "w-auto", className);

  const logo = (
    <>
      <img src={lightLogo} alt={alt} className={cn("block dark:hidden", logoClassName)} />
      <img src={darkLogo} alt={alt} className={cn("hidden dark:block", logoClassName)} />
    </>
  );

  return to ? (
    <Link to={to} className="inline-flex items-center" aria-label="CliniqAI home">
      {logo}
    </Link>
  ) : (
    <span className="inline-flex items-center">{logo}</span>
  );
}
