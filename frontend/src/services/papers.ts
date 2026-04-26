import { apiRequest } from "./api";
import type { Paper } from "../types/paper";

export function savePaper(paper: Paper) {
  return apiRequest<Paper>("/api/papers/save", {
    method: "POST",
    body: JSON.stringify({
      title: paper.title,
      authors: paper.authors,
      journal: paper.journal,
      year: paper.year,
      pmid: paper.pmid,
      doi: paper.doi,
      source_url: paper.source_url,
      abstract: paper.abstract,
    }),
  });
}

export function getSavedPapers() {
  return apiRequest<Paper[]>("/api/papers/saved");
}

export function deleteSavedPaper(id: number) {
  return apiRequest<void>(`/api/papers/${id}`, { method: "DELETE" });
}

