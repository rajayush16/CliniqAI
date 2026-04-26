import { FeatureList } from "../components/FeatureList";

const features = [
  "Patient intake workflows",
  "Clinical assistant tools",
  "Secure care team collaboration",
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f7faf9] text-[#10201b]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#2d8a70]">
            Healthcare AI workspace
          </p>
          <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">
            CliniqAI
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#50645e]">
            A full-stack foundation for building reliable clinical workflows,
            patient-facing tools, and AI-assisted care experiences.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-lg border border-[#d8e5e0] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Landing page placeholder</h2>
            <p className="mt-3 text-[#60746e]">
              Replace this starter section with your product messaging,
              authentication entry points, or onboarding flow.
            </p>
          </div>
          <FeatureList features={features} />
        </div>
      </section>
    </main>
  );
}

