import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Database, Sparkles } from "lucide-react";
import { useAskQuestion } from "../hooks/useQuestion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { LoadingPipeline } from "../components/common/LoadingPipeline";
import { AgentPromptBox } from "../components/common/AgentPromptBox";
import { PromptChip } from "../components/common/PromptChip";

const prompts = [
  ["Heart failure evidence", "What is the latest evidence on SGLT2 inhibitors in heart failure?"],
  ["Diabetes treatment comparison", "Compare metformin and GLP-1 agonists for type 2 diabetes."],
  ["Resistant hypertension", "What are current treatment options for resistant hypertension?"],
  ["Clinical trial summary", "Summarize recent clinical trial evidence for anticoagulation in atrial fibrillation."],
];

const filterOptions = [
  ["last_five_years", "Last 5 years"],
  ["review_only", "Review papers"],
  ["clinical_trials_only", "Clinical trials"],
  ["recent_only", "Guidelines"],
] as const;

export function AskQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState((location.state as { query?: string } | null)?.query ?? "");
  const [activeStep, setActiveStep] = useState(0);
  const [filters, setFilters] = useState({
    recent_only: false,
    last_five_years: true,
    review_only: false,
    clinical_trials_only: false,
  });
  const askMutation = useAskQuestion();

  useEffect(() => {
    if (!askMutation.isPending) return;
    const timer = window.setInterval(() => setActiveStep((step) => Math.min(step + 1, 3)), 1700);
    return () => window.clearInterval(timer);
  }, [askMutation.isPending]);

  function submit() {
    if (query.trim().length < 8) return;
    setActiveStep(0);
    askMutation.mutate(
      { query, filters },
      {
        onSuccess: (result) => navigate(`/app/answers/${result.id}`, { state: { result } }),
      },
    );
  }

  function formSubmit(event: FormEvent) {
    event.preventDefault();
    submit();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-xl shadow-cyan-500/20">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-4xl font-semibold text-slate-950 dark:text-white">Ask CliniqAI</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Search trusted medical literature and get cited clinical answers.
        </p>
      </motion.header>

      <Card className="overflow-hidden">
        <CardContent className="p-5 sm:p-6">
          <form onSubmit={formSubmit} className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {prompts.map(([label, prompt]) => (
                <PromptChip key={label} label={label} onClick={() => setQuery(prompt)} />
              ))}
            </div>

            <AgentPromptBox
              value={query}
              onChange={setQuery}
              onSubmit={submit}
              isLoading={askMutation.isPending}
              placeholder="Ask a clinical question backed by PubMed and Europe PMC..."
            />

            <div className="flex flex-wrap gap-2">
              {filterOptions.map(([key, label]) => (
                <PromptChip
                  key={key}
                  label={label}
                  active={filters[key]}
                  onClick={() => setFilters((current) => ({ ...current, [key]: !current[key] }))}
                />
              ))}
            </div>

            {askMutation.error ? <p className="text-sm font-medium text-red-600 dark:text-red-300">{askMutation.error.message}</p> : null}
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {askMutation.isPending ? <LoadingPipeline activeStep={activeStep} /> : (
          <Card>
            <CardContent className="flex items-center gap-4">
              <Database className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                CliniqAI searches PubMed and Europe PMC in parallel, then ranks papers before generating a cited answer.
              </p>
            </CardContent>
          </Card>
        )}
        <Button size="lg" onClick={submit} disabled={askMutation.isPending || query.trim().length < 8}>
          {askMutation.isPending ? "Generating cited answer..." : "Generate cited answer"}
        </Button>
      </div>
    </div>
  );
}
