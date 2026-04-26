import { ShieldCheck } from "lucide-react";
import { cn } from "../../lib/utils";

export function EvidenceBadge({ value }: { value: string }) {
  const tone =
    value === "High"
      ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200"
      : value === "Medium"
        ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200"
        : "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200";

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold", tone)}>
      <ShieldCheck className="h-3.5 w-3.5" />
      Evidence {value}
    </span>
  );
}

