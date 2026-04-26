import { BookmarkPlus, ExternalLink } from "lucide-react";
import type { Paper } from "../../types/paper";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { SourceBadge } from "./SourceBadge";

type CitationCardProps = {
  paper: Paper;
  onSave?: (paper: Paper) => void;
};

export function CitationCard({ paper, onSave }: CitationCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <SourceBadge source={paper.source ?? "Medical source"} />
              {paper.year ? <span className="text-xs font-medium text-[#62758d]">{paper.year}</span> : null}
            </div>
            <h3 className="mt-3 text-base font-semibold leading-6 text-[#18324f]">{paper.title}</h3>
            <p className="mt-2 text-sm text-[#62758d]">
              {[paper.authors, paper.journal].filter(Boolean).join(" | ") || "Publication metadata unavailable"}
            </p>
            <p className="mt-2 text-xs text-[#8293a7]">
              {[paper.pmid ? `PMID ${paper.pmid}` : null, paper.doi ? `DOI ${paper.doi}` : null].filter(Boolean).join(" | ")}
            </p>
          </div>
          <div className="flex gap-2">
            {onSave ? (
              <Button variant="secondary" size="sm" onClick={() => onSave(paper)}>
                <BookmarkPlus className="h-4 w-4" />
                Save
              </Button>
            ) : null}
            <a href={paper.source_url} target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon" aria-label="Open source">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

