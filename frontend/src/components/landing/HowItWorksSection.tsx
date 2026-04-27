import { ArrowRight, BarChart3, FileText, HelpCircle, Search } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { title: "Understand", copy: "CliniqAI understands your clinical question.", Icon: HelpCircle },
  { title: "Search", copy: "It searches PubMed and Europe PMC for relevant literature.", Icon: Search },
  { title: "Rank", copy: "AI ranks studies by relevance, quality, and recency.", Icon: BarChart3 },
  { title: "Answer", copy: "You get a concise, cited answer with key findings and sources.", Icon: FileText },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)] px-4 pb-24 pt-24 text-slate-950 dark:bg-[linear-gradient(180deg,#071526_0%,#0b1a2c_100%)] dark:text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">How CliniqAI works</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            From question to trusted clinical answer in 4 simple steps
          </p>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-4">
          {steps.map(({ title, copy, Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.42 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <ArrowRight className="absolute right-[-22px] top-10 hidden h-6 w-6 text-blue-500/70 lg:block" />
              )}
              <div className="flex items-start gap-5">
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-[0_16px_40px_rgba(45,102,210,0.12)] dark:border-white/10 dark:bg-white/[0.08] dark:text-cyan-200">
                  <Icon className="h-9 w-9" />
                </span>
                <div className="pt-3">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{index + 1}. {title}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{copy}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
