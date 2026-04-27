import { ThemeLogo } from "./ThemeLogo";

type BrandLogoProps = {
  to?: string;
  size?: "compact" | "nav" | "hero";
  className?: string;
};

export function BrandLogo({ to, size = "nav", className }: BrandLogoProps) {
  return <ThemeLogo to={to} size={size} className={className} alt="CliniqAI" />;
}
