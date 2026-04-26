import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  "Understanding clinical question",
  "Searching trusted databases",
  "Ranking medical evidence",
  "Generating cited answer",
];

export function LoadingPipeline({ activeStep }: { activeStep: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
      <p className="text-sm font-semibold text-slate-950 dark:text-white">Evidence pipeline</p>
      <div className="mt-4 space-y-3">
        {steps.map((step, index) => {
          const done = index < activeStep;
          const active = index === activeStep;
          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-sm"
            >
              {done ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <Loader2 className={`h-5 w-5 ${active ? "animate-spin text-cyan-500" : "text-slate-400 dark:text-slate-600"}`} />
              )}
              <span className={active || done ? "font-medium text-slate-950 dark:text-white" : "text-slate-400"}>{step}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
