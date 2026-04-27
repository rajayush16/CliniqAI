import { LandingNavbar } from "../components/landing/LandingNavbar";
import { HeroSection } from "../components/landing/HeroSection";
import { TrustedSourcesStrip } from "../components/landing/TrustedSourcesStrip";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";

export function Landing() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white dark:bg-slate-950">
      <div className="bg-[#eef8ff] dark:bg-[#031126]">
        <LandingNavbar />
        <HeroSection />
      </div>
      <TrustedSourcesStrip />
      <HowItWorksSection />
    </main>
  );
}
