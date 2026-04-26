import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, FileSearch, ShieldCheck, Stethoscope } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BrandLogo } from "../components/common/BrandLogo";

const features = [
  "Citation-aware answers from trusted literature",
  "Parallel PubMed and Europe PMC retrieval",
  "Evidence strength and uncertainty surfaced clearly",
  "Saved papers and searchable clinical question history",
];

export function Landing() {
  return (
    <main className="bg-[#f7fafc] text-[#18324f]">
      <header className="sticky top-0 z-30 border-b border-[#dbe6f2] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo to="/" size="nav" />
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-[#4d6178]">Log in</Link>
            <Link to="/signup">
              <Button size="sm">Start Searching</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="mb-8 flex flex-col gap-4">
            <BrandLogo size="hero" className="hidden sm:block" />
            <Badge className="w-fit">For clinical professionals</Badge>
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-[#102a43] sm:text-6xl">
            Evidence-based medical answers in under a minute
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#52667a]">
            Ask clinical questions and get concise, cited answers from PubMed and Europe PMC.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup">
              <Button size="lg">
                Start Searching
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/app/ask">
              <Button variant="secondary" size="lg">View Demo</Button>
            </Link>
          </div>
        </motion.div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="border-b border-[#dbe6f2] bg-white p-5">
              <p className="text-sm font-semibold text-[#1665b8]">Example clinical question</p>
              <p className="mt-2 text-xl font-semibold">What is the latest evidence on SGLT2 inhibitors in heart failure?</p>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-md border border-[#d8e8f7] bg-[#f0f7ff] p-4">
                <p className="text-sm font-semibold">Direct answer</p>
                <p className="mt-2 text-sm leading-6 text-[#52667a]">
                  Recent trial and review literature supports SGLT2 inhibitors as evidence-backed therapy across heart failure phenotypes, with benefits requiring patient-specific clinical judgment.
                </p>
              </div>
              {["PubMed", "Europe PMC", "Citation guardrails"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#52667a]">
                  <CheckCircle2 className="h-5 w-5 text-[#1f7a59]" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="border-y border-[#dbe6f2] bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["PubMed", "NCBI E-utilities literature retrieval"],
            ["Europe PMC", "Abstracts and biomedical metadata"],
            ["Optional enrichment", "Semantic metadata-ready architecture"],
          ].map(([title, copy]) => (
            <Card key={title}>
              <CardContent>
                <Database className="h-5 w-5 text-[#245896]" />
                <h2 className="mt-4 font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#62758d]">{copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            [FileSearch, "How it works", "CliniqAI rewrites the question, searches trusted databases, ranks sources, and generates a concise cited answer."],
            [ShieldCheck, "Safety first", "If reliable evidence is missing, the app refuses to speculate and states that evidence is insufficient."],
            [Stethoscope, "Doctor-friendly", "Answers are short, citation-led, and designed for professional reference rather than patient diagnosis."],
          ].map(([Icon, title, copy]) => (
            <div key={String(title)}>
              <Icon className="h-6 w-6 text-[#245896]" />
              <h2 className="mt-4 text-xl font-semibold">{String(title)}</h2>
              <p className="mt-3 text-sm leading-6 text-[#62758d]">{String(copy)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold">Built for evidence review, not open-ended chat</h2>
            <p className="mt-4 text-[#62758d]">The interface centers on source quality, citation transparency, and fast clinical scanning.</p>
          </div>
          <div className="grid gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-md border border-[#dbe6f2] bg-[#f8fbfe] p-3 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-[#1f7a59]" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Clinical safety note</h2>
            <p className="mt-3 text-sm leading-6 text-[#62758d]">
              This tool provides evidence summaries for professional reference and does not replace clinical judgment.
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-[#dbe6f2] bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 text-sm text-[#62758d] sm:flex-row sm:px-6 lg:px-8">
          <BrandLogo size="compact" />
          <span>Trusted medical literature only</span>
        </div>
      </footer>
    </main>
  );
}
