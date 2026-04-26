import { Bookmark } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSavedPaper, getSavedPapers } from "../services/papers";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { EmptyState } from "../components/common/EmptyState";
import { CitationCard } from "../components/common/CitationCard";
import { Skeleton } from "../components/ui/skeleton";

export function SavedPapers() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["saved-papers"], queryFn: getSavedPapers });
  const deleteMutation = useMutation({
    mutationFn: deleteSavedPaper,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["saved-papers"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Saved papers</h1>
        <p className="mt-2 text-[#62758d]">Keep important cited literature available for later review.</p>
      </div>
      <Card>
        <CardHeader><h2 className="font-semibold">Library</h2></CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? <Skeleton className="h-24" /> : null}
          {!isLoading && !data?.length ? (
            <EmptyState icon={Bookmark} title="No saved papers" description="Save papers from answer citations to build your clinical evidence library." />
          ) : null}
          {data?.map((paper) => (
            <div key={paper.id} className="space-y-2">
              <CitationCard paper={paper} />
              {paper.id ? (
                <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(paper.id!)}>
                  Remove saved paper
                </Button>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

