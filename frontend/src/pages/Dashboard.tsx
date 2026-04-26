import { Link, useNavigate } from "react-router-dom";
import { Activity, Bookmark, Clock, Database, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSavedPapers } from "../services/papers";
import { useHistory } from "../hooks/useQuestion";
import { formatMs } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { StatCard } from "../components/common/StatCard";
import { Skeleton } from "../components/ui/skeleton";

export function Dashboard() {
  const navigate = useNavigate();
  const { data: history, isLoading } = useHistory();
  const { data: saved } = useQuery({ queryKey: ["saved-papers"], queryFn: getSavedPapers });
  const avgTime = history?.length ? Math.round(history.reduce((sum, item) => sum + item.response_time_ms, 0) / history.length) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#18324f]">Clinical evidence dashboard</h1>
          <p className="mt-2 text-[#62758d]">Search trusted medical databases and keep prior evidence reviews organized.</p>
        </div>
        <Link to="/app/ask"><Button><Search className="h-4 w-4" />Ask question</Button></Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total questions asked" value={String(history?.length ?? 0)} icon={Activity} />
        <StatCard label="Saved papers" value={String(saved?.length ?? 0)} icon={Bookmark} />
        <StatCard label="Average response time" value={formatMs(avgTime)} icon={Clock} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader><h2 className="font-semibold">Quick ask</h2></CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                const value = new FormData(event.currentTarget).get("query");
                navigate("/app/ask", { state: { query: value } });
              }}
            >
              <Input name="query" placeholder="Ask a clinical evidence question..." required />
              <Button type="submit">Search</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {["PubMed", "Europe PMC"].map((source) => (
            <Card key={source}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{source}</p>
                  <p className="mt-1 text-sm text-[#62758d]">Source connector ready</p>
                </div>
                <Database className="h-5 w-5 text-[#1f7a59]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader><h2 className="font-semibold">Recent searches</h2></CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? <Skeleton className="h-16" /> : null}
          {history?.slice(0, 5).map((item) => (
            <Link key={item.id} to={`/app/answers/${item.id}`} className="block rounded-md border border-[#e6edf5] p-4 transition hover:bg-[#f8fbfe]">
              <p className="font-medium">{item.query}</p>
              <p className="mt-1 text-sm text-[#62758d]">{item.confidence} confidence | {formatMs(item.response_time_ms)}</p>
            </Link>
          ))}
          {!isLoading && !history?.length ? <p className="text-sm text-[#62758d]">No searches yet. Start with the quick ask box above.</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}

