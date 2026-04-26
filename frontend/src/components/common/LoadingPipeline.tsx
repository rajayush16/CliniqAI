import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  "Understanding question",
  "Searching trusted databases",
  "Ranking medical evidence",
  "Generating cited answer",
];

export function LoadingPipeline({ activeStep }: { activeStep: number }) {
  return (
    <div className="rounded-lg border border-[#dbe6f2] bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#18324f]">Evidence pipeline</p>
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
                <CheckCircle2 className="h-5 w-5 text-[#1f7a59]" />
              ) : (
                <Loader2 className={`h-5 w-5 ${active ? "animate-spin text-[#245896]" : "text-[#9badc2]"}`} />
              )}
              <span className={active || done ? "font-medium text-[#18324f]" : "text-[#8293a7]"}>{step}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

