import { FormEvent } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type AgentPromptBoxProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
};

export function AgentPromptBox({ value, onChange, onSubmit, isLoading, placeholder }: AgentPromptBoxProps) {
  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={submit} className="rounded-[1.5rem] border border-slate-200 bg-white/82 p-3 shadow-[0_24px_90px_rgba(15,40,80,0.13)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/78 dark:shadow-black/30">
      <div className="flex items-center gap-2 px-2 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
        <Sparkles className="h-4 w-4" />
        Clinical evidence agent
      </div>
      <Textarea
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? "Ask a clinical question backed by PubMed and Europe PMC..."}
        minLength={8}
        required
        className="border-0 bg-transparent shadow-none focus:ring-0 dark:bg-transparent"
      />
      <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-2 pt-3 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">Grounded in PubMed and Europe PMC citations</p>
        <Button type="submit" size="icon" disabled={isLoading || value.trim().length < 8} aria-label="Submit question">
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

