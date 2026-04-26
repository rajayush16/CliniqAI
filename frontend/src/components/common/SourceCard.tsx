import { ExternalLink } from "lucide-react";
import type { Paper } from "../../types/paper";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { EvidenceBadge } from "./EvidenceBadge";

type SourceCardProps = {
  paper: Paper;
  evidence?: string;
};

export function SourceCard({ paper, evidence }: SourceCardProps) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {evidence ? <EvidenceBadge value={evidence} /> : null}
          {paper.year ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{paper.year}</span> : null}
        </div>
        <h3 className="text-base font-semibold leading-6 text-slate-950 dark:text-white">{paper.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{[paper.journal, paper.authors].filter(Boolean).join(" | ")}</p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {[paper.pmid ? `PMID ${paper.pmid}` : null, paper.doi ? `DOI ${paper.doi}` : null].filter(Boolean).join(" | ")}
          </p>
          <a href={paper.source_url} target="_blank" rel="noreferrer">
            <Button variant="secondary" size="sm">
              Source link
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
