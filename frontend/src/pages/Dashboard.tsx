import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Bookmark, Clock, Database, FileSearch, Search, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getSavedPapers } from "../services/papers";
import { useHistory } from "../hooks/useQuestion";
import { useAuth } from "../hooks/useAuth";
import { formatMs } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { StatCard } from "../components/common/StatCard";
import { Skeleton } from "../components/ui/skeleton";
import { AgentPromptBox } from "../components/common/AgentPromptBox";
import { EmptyState } from "../components/common/EmptyState";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const { data: history, isLoading } = useHistory();
  const { data: saved } = useQuery({ queryKey: ["saved-papers"], queryFn: getSavedPapers });
  const avgTime = history?.length ? Math.round(history.reduce((sum, item) => sum + item.response_time_ms, 0) / history.length) : 0;

  function submitQuickAsk() {
    if (!query.trim()) return;
    navigate("/app/ask", { state: { query } });
  }

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_100px_rgba(15,40,80,0.12)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/72"
      >
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_440px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Clinical AI copilot
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-5xl">
              {greeting()}, Dr. {user?.name?.split(" ")[0] ?? "Ayush"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Ask clinical questions, retrieve trusted medical literature, and generate citation-grounded answers in one focused workspace.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/app/ask">
                <Button>
                  <Search className="h-4 w-4" />
                  Ask CliniqAI
                </Button>
              </Link>
              <Link to="/app/history">
                <Button variant="secondary">
                  <FileSearch className="h-4 w-4" />
                  Review history
                </Button>
              </Link>
            </div>
          </div>
          <AgentPromptBox value={query} onChange={setQuery} onSubmit={submitQuickAsk} />
        </div>
      </motion.section>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total questions asked" value={String(history?.length ?? 0)} icon={Activity} />
        <StatCard label="Saved papers" value={String(saved?.length ?? 0)} icon={Bookmark} />
        <StatCard label="Average response time" value={formatMs(avgTime)} icon={Clock} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-950 dark:text-white">Recent evidence searches</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your latest clinical questions and cited answers.</p>
            </div>
            <Link to="/app/history" className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">View all</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? <Skeleton className="h-20" /> : null}
            {!isLoading && !history?.length ? (
              <EmptyState icon={FileSearch} title="No evidence searches yet" description="Ask CliniqAI a clinical question to begin building your evidence trail." />
            ) : null}
            {history?.slice(0, 5).map((item) => (
              <Link key={item.id} to={`/app/answers/${item.id}`} className="block rounded-2xl border border-slate-200 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950/60">
                <p className="font-semibold text-slate-950 dark:text-white">{item.query}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.confidence} confidence | {formatMs(item.response_time_ms)}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <aside className="space-y-4">
          {[
            ["PubMed", "NCBI literature retrieval", "Operational"],
            ["Europe PMC", "Biomedical abstract index", "Operational"],
          ].map(([source, copy, status]) => (
            <Card key={source}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                    <p className="font-semibold text-slate-950 dark:text-white">{source}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{copy}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                  {status}
                </span>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent>
              <ShieldCheck className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
              <h3 className="mt-4 font-semibold text-slate-950 dark:text-white">Evidence guardrails</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Answers are built around retrieved sources, visible citations, and confidence signals.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
