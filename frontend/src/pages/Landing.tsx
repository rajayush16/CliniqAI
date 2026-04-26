import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, FileSearch, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BrandLogo } from "../components/common/BrandLogo";
import { ThemeToggle } from "../components/common/ThemeToggle";

const trust = ["PubMed", "Europe PMC", "Citation-first answers", "No general web search"];

export function Landing() {
  return (
    <main className="min-h-screen text-slate-950 dark:text-white">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-white/72 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/72">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo to="/" size="nav" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="hidden text-sm font-semibold text-slate-600 dark:text-slate-300 sm:inline">Log in</Link>
            <Link to="/signup">
              <Button size="sm">Start Searching</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Badge className="mb-6"><Sparkles className="h-3.5 w-3.5" />Medical AI agent for doctors</Badge>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-normal sm:text-7xl">
            Evidence-based medical answers in under a minute
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Ask clinical questions and get concise, cited answers from PubMed and Europe PMC.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup">
              <Button size="lg">
                Start Searching
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">View Demo</Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {trust.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">AI evidence preview</p>
                <p className="mt-2 text-xl font-semibold">What is the latest evidence on SGLT2 inhibitors in heart failure?</p>
              </div>
              <div className="space-y-4 p-5">
                <div className="rounded-2xl border border-cyan-200/70 bg-cyan-50/80 p-4 dark:border-cyan-400/20 dark:bg-cyan-400/10">
                  <p className="text-sm font-semibold">Direct answer</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Retrieved trial and review evidence supports SGLT2 inhibitors across heart failure phenotypes, with treatment decisions requiring patient-specific clinical judgment and citation review.
                  </p>
                </div>
                {trust.slice(0, 3).map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">How CliniqAI works</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">A focused RAG workflow for clinical evidence search.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [FileSearch, "Ask", "Enter a focused clinical question with optional evidence filters."],
            [Database, "Retrieve", "Search PubMed and Europe PMC, then rank relevant sources."],
            [ShieldCheck, "Answer", "Generate a concise response with citations and confidence."],
          ].map(([Icon, title, copy]) => (
            <Card key={String(title)}>
              <CardContent>
                <Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
                <h3 className="mt-4 text-xl font-semibold">{String(title)}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{String(copy)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Globe2 className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
              <h2 className="mt-4 text-xl font-semibold">Clinical safety note</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                This tool provides evidence summaries for professional reference and does not replace clinical judgment.
              </p>
            </div>
            <Link to="/signup"><Button>Start with citations</Button></Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
