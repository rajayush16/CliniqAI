import { Database, FileCheck2, Globe2, ShieldCheck } from "lucide-react";

const sources = [
  { title: "Trusted medical literature only", subtitle: "Curated clinical evidence", Icon: ShieldCheck },
  { title: "PubMed / NCBI", subtitle: "Biomedical citations", Icon: Database },
  { title: "Europe PMC", subtitle: "Full text & abstracts", Icon: FileCheck2 },
  { title: "Citation-first", subtitle: "Every answer is cited", Icon: ShieldCheck },
  { title: "No general web", subtitle: "Focused on quality", Icon: Globe2 },
];

export function TrustedSourcesStrip() {
  return (
    <section id="sources" className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200/80 bg-white/92 p-4 shadow-[0_20px_60px_rgba(8,32,66,0.16)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/92 dark:shadow-[0_22px_70px_rgba(0,0,0,0.35)]">
        <div className="grid gap-3 md:grid-cols-5">
          {sources.map(({ title, subtitle, Icon }) => (
            <div key={title} className="flex items-center gap-3 rounded-xl px-3 py-4 md:border-r md:border-slate-200/80 md:last:border-r-0 md:dark:border-white/10">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cyan-50 text-cyan-600 shadow-inner dark:bg-cyan-300/10 dark:text-cyan-200">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-5 text-slate-900 dark:text-white">{title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
