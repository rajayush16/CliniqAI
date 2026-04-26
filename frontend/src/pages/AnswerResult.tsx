import { useLocation, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Clock, MessageSquare, Sparkles } from "lucide-react";
import { savePaper } from "../services/papers";
import { useQuestion } from "../hooks/useQuestion";
import { useToast } from "../components/ui/toast";
import { formatMs } from "../lib/utils";
import type { AnswerResult as AnswerResultType } from "../types/question";
import type { Paper } from "../types/paper";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Skeleton } from "../components/ui/skeleton";
import { EvidenceBadge } from "../components/common/EvidenceBadge";
import { SourceCard } from "../components/common/SourceCard";

export function AnswerResult() {
  const { id } = useParams();
  const location = useLocation();
  const stateResult = (location.state as { result?: AnswerResultType } | null)?.result;
  const { data, isLoading } = useQuestion(stateResult ? undefined : id);
  const { toast } = useToast();
  const saveMutation = useMutation({ mutationFn: savePaper, onSuccess: () => toast("Paper saved.") });

  const result = stateResult ?? (data ? {
    id: data.id,
    query: data.query,
    answer: data.answer,
    confidence: data.confidence,
    evidence_strength: data.confidence,
    key_findings: [],
    citations: data.sources_json,
    response_time_ms: data.response_time_ms,
    cached: false,
    created_at: data.created_at,
  } satisfies AnswerResultType : undefined);

  if (isLoading && !result) return <Skeleton className="h-96" />;
  if (!result) return <p className="text-slate-500 dark:text-slate-400">Answer not found.</p>;

  function onSave(paper: Paper) {
    saveMutation.mutate(paper);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_100px_rgba(15,40,80,0.12)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/72">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Citation-grounded answer
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Clinical answer</h1>
            <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{result.query}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <EvidenceBadge value={result.evidence_strength} />
            <Badge><Clock className="h-3.5 w-3.5" />{formatMs(result.response_time_ms)}</Badge>
            {result.cached ? <Badge>Cached</Badge> : null}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader><h2 className="font-semibold text-slate-950 dark:text-white">Direct Answer</h2></CardHeader>
            <CardContent>
              <p className="text-base leading-8 text-slate-700 dark:text-slate-200">{result.answer}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><h2 className="font-semibold text-slate-950 dark:text-white">Key Findings</h2></CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {(result.key_findings.length ? result.key_findings : ["Evidence bullets are generated for newly submitted questions."]).map((finding) => (
                  <li key={finding} className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-cyan-500" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Sources Used</h2>
            {result.citations.map((paper, index) => (
              <div key={`${paper.source_url}-${index}`} className="space-y-2">
                <SourceCard paper={paper} evidence={result.evidence_strength} />
                <Button variant="ghost" size="sm" onClick={() => onSave(paper)}>Save paper</Button>
              </div>
            ))}
          </section>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
                <MessageSquare className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                Ask follow-up
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea rows={5} placeholder="Ask a focused follow-up based on these sources..." />
              <Button className="w-full" variant="secondary">Prepare follow-up</Button>
            </CardContent>
          </Card>

          <Card className="border-amber-200/80 bg-amber-50/80 dark:border-amber-400/20 dark:bg-amber-400/10">
            <CardContent className="flex gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-none text-amber-700 dark:text-amber-200" />
              <p className="text-sm leading-6 text-amber-900 dark:text-amber-100">
                This tool provides evidence summaries for professional reference and does not replace clinical judgment.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
