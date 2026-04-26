import { cn } from "../../lib/utils";

type PromptChipProps = {
  label: string;
  onClick?: () => void;
  active?: boolean;
};

export function PromptChip({ label, onClick, active }: PromptChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-cyan-400 bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
          : "border-slate-200 bg-white/70 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-cyan-500/60 dark:hover:bg-cyan-400/10",
      )}
    >
      {label}
    </button>
  );
}

