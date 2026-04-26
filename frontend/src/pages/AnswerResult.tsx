import { useLocation, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Clock, ShieldCheck } from "lucide-react";
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
import { CitationCard } from "../components/common/CitationCard";
import { Skeleton } from "../components/ui/skeleton";

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
  if (!result) return <p className="text-[#62758d]">Answer not found.</p>;

  function onSave(paper: Paper) {
    saveMutation.mutate(paper);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Cited answer</h1>
          <p className="mt-2 text-[#62758d]">{result.query}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge><ShieldCheck className="h-3.5 w-3.5" />Evidence Strength: {result.evidence_strength}</Badge>
          <Badge><Clock className="h-3.5 w-3.5" />{formatMs(result.response_time_ms)}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader><h2 className="font-semibold">Direct Answer</h2></CardHeader>
        <CardContent>
          <p className="max-w-4xl text-base leading-8 text-[#18324f]">{result.answer}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><h2 className="font-semibold">Key Evidence</h2></CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {(result.key_findings.length ? result.key_findings : ["Evidence bullets are generated for newly submitted questions."]).map((finding) => (
              <li key={finding} className="flex gap-3 text-sm leading-6 text-[#52667a]">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#1f7a59]" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Sources Used</h2>
        {result.citations.map((paper, index) => (
          <CitationCard key={`${paper.source_url}-${index}`} paper={paper} onSave={onSave} />
        ))}
      </section>

      <Card>
        <CardHeader><h2 className="font-semibold">Ask follow-up</h2></CardHeader>
        <CardContent className="space-y-3">
          <Textarea rows={3} placeholder="Ask a focused follow-up based on these sources..." />
          <Button variant="secondary">Prepare follow-up</Button>
        </CardContent>
      </Card>

      <Card className="border-[#f0d7a1] bg-[#fffaf0]">
        <CardContent className="flex gap-3">
          <AlertTriangle className="mt-1 h-5 w-5 flex-none text-[#a15c07]" />
          <p className="text-sm leading-6 text-[#6f4b16]">
            This tool provides evidence summaries for professional reference and does not replace clinical judgment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

