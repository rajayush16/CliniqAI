import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useAskQuestion } from "../hooks/useQuestion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { LoadingPipeline } from "../components/common/LoadingPipeline";

const prompts = [
  "What is the latest evidence on SGLT2 inhibitors in heart failure?",
  "Compare metformin and GLP-1 agonists for type 2 diabetes.",
  "What are current treatment options for resistant hypertension?",
];

const filterOptions = [
  ["recent_only", "Recent papers only"],
  ["last_five_years", "Last 5 years"],
  ["review_only", "Review papers only"],
  ["clinical_trials_only", "Clinical trials only"],
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
    const timer = window.setInterval(() => setActiveStep((step) => Math.min(step + 1, 3)), 1800);
    return () => window.clearInterval(timer);
  }, [askMutation.isPending]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setActiveStep(0);
    askMutation.mutate(
      { query, filters },
      {
        onSuccess: (result) => navigate(`/app/answers/${result.id}`, { state: { result } }),
      },
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Ask a medical evidence question</h1>
          <p className="mt-2 text-[#62758d]">Answers are generated only from retrieved PubMed and Europe PMC sources.</p>
        </div>
        <Card>
          <CardHeader><h2 className="font-semibold">Clinical question</h2></CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={submit}>
              <Textarea rows={8} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter a focused clinical question..." minLength={8} required />
              <div className="grid gap-3 sm:grid-cols-2">
                {filterOptions.map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 rounded-md border border-[#dbe6f2] bg-[#f8fbfe] p-3 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={(event) => setFilters((current) => ({ ...current, [key]: event.target.checked }))}
                    />
                    {label}
                  </label>
                ))}
              </div>
              {askMutation.error ? <p className="text-sm text-[#b42318]">{askMutation.error.message}</p> : null}
              <Button size="lg" disabled={askMutation.isPending}>
                <Search className="h-4 w-4" />
                {askMutation.isPending ? "Searching evidence..." : "Generate cited answer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <aside className="space-y-6">
        {askMutation.isPending ? <LoadingPipeline activeStep={activeStep} /> : null}
        <Card>
          <CardHeader><h2 className="font-semibold">Example prompts</h2></CardHeader>
          <CardContent className="space-y-3">
            {prompts.map((prompt) => (
              <button key={prompt} className="w-full rounded-md border border-[#dbe6f2] p-3 text-left text-sm leading-6 transition hover:bg-[#f8fbfe]" onClick={() => setQuery(prompt)}>
                {prompt}
              </button>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

