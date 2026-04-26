import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { useHistory } from "../hooks/useQuestion";
import { formatMs } from "../lib/utils";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { EmptyState } from "../components/common/EmptyState";
import { Skeleton } from "../components/ui/skeleton";

export function History() {
  const { data, isLoading } = useHistory();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Search history</h1>
        <p className="mt-2 text-[#62758d]">Review previous questions and cited evidence summaries.</p>
      </div>
      <Card>
        <CardHeader><h2 className="font-semibold">Recent questions</h2></CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? <Skeleton className="h-24" /> : null}
          {!isLoading && !data?.length ? (
            <EmptyState icon={FileQuestion} title="No search history yet" description="Ask your first clinical evidence question to build a searchable history." />
          ) : null}
          {data?.map((item) => (
            <Link key={item.id} to={`/app/answers/${item.id}`} className="block rounded-md border border-[#e6edf5] p-4 transition hover:bg-[#f8fbfe]">
              <p className="font-semibold">{item.query}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#62758d]">{item.answer}</p>
              <p className="mt-2 text-xs font-medium text-[#8293a7]">{item.confidence} confidence | {formatMs(item.response_time_ms)}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

