import { Link } from "react-router-dom";
import { ArrowRight, CircleDot, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { AgentPreviewCard } from "./AgentPreviewCard";

const trustItems = [
  { label: "Evidence-first", copy: "No general web search", Icon: ShieldCheck },
  { label: "Cited & Transparent", copy: "Every answer is traceable", Icon: CircleDot },
  { label: "Private & Secure", copy: "Built for clinicians", Icon: LockKeyhole },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#eef8ff] text-slate-950 dark:bg-[#031126] dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(18,150,220,0.2),transparent_28rem),radial-gradient(circle_at_82%_54%,rgba(17,221,209,0.16),transparent_25rem),linear-gradient(180deg,#f7fcff_0%,#e9f7ff_100%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(18,96,180,0.28),transparent_28rem),radial-gradient(circle_at_82%_54%,rgba(17,221,209,0.13),transparent_25rem),linear-gradient(180deg,#031126_0%,#061a34_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.76))] dark:bg-[linear-gradient(180deg,transparent,rgba(1,9,22,0.72))]" />
      <div className="absolute left-0 top-28 h-[420px] w-[520px] opacity-30 [background-image:linear-gradient(rgba(45,142,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(45,142,255,0.12)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(circle,black,transparent_72%)]" />
      <div className="absolute bottom-28 right-0 h-[420px] w-[420px] rounded-full border border-cyan-300/10 opacity-70 [background:radial-gradient(circle,rgba(23,179,218,0.25)_1px,transparent_1.5px)] [background-size:13px_13px] [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-4 pb-24 pt-8 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:pb-28 lg:pt-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-100/80 px-4 py-2 text-xs font-bold uppercase tracking-normal text-cyan-800 dark:border-cyan-300/35 dark:bg-cyan-300/8 dark:text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered. Evidence-first. Doctor-trusted.
          </p>
          <p className="mb-4 text-lg font-semibold text-cyan-800 dark:text-cyan-100">Your Clinical Evidence Agent</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] text-slate-950 dark:text-white sm:text-6xl xl:text-7xl">
            Clinical answers <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300">backed by evidence.</span> In under a minute.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-200/88">
            CliniqAI searches trusted medical databases, ranks the best available evidence, and delivers concise,
            cited answers for faster clinical decisions.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {trustItems.map(({ label, copy, Icon }) => (
              <div key={label} className="flex items-start gap-3 sm:border-r sm:border-slate-300 sm:pr-4 sm:dark:border-white/10 last:border-r-0">
                <Icon className="mt-0.5 h-7 w-7 shrink-0 text-blue-600 dark:text-blue-300" />
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">{label}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{copy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/signup">
              <Button size="lg" className="h-14 rounded-2xl px-6 text-base shadow-cyan-500/25">
                Start asking questions
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="secondary"
                size="lg"
                className="h-14 rounded-2xl border-slate-300 bg-white/60 px-6 text-base text-slate-950 hover:bg-white dark:border-white/60 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
              >
                View demo
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.55 }}
        >
          <AgentPreviewCard />
        </motion.div>
      </div>
    </section>
  );
}
