import {
  ArrowUpRight,
  Beaker,
  CalendarDays,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  FlaskConical,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const filters = [
  { label: "Last 5 years", Icon: CalendarDays },
  { label: "Review papers", Icon: FileText },
  { label: "Clinical trials", Icon: FlaskConical },
  { label: "Guidelines", Icon: ShieldCheck },
];

const findings = [
  "Consistent reduction in heart failure hospitalizations",
  "Improved quality of life and functional outcomes",
  "Benefits observed across multiple RCTs and real-world studies",
];

const sources = [
  ["EMPUSE Trial", "The New England Journal of Medicine", "2022", "PMID: 35706322"],
  ["DAPA-HF Trial", "The New England Journal of Medicine", "2019", "PMID: 31475797"],
  ["EMPEROR-Reduced Trial", "The Lancet", "2020", "PMID: 33223901"],
];

export function AgentPreviewCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur-md transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-xl sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.08),transparent_26rem),radial-gradient(circle_at_100%_80%,rgba(6,182,212,0.08),transparent_25rem)] dark:bg-[radial-gradient(circle_at_20%_0%,rgba(70,150,255,0.16),transparent_26rem),radial-gradient(circle_at_100%_80%,rgba(18,224,212,0.1),transparent_25rem)]" />
      <div className="relative mx-auto max-w-[740px]">
        <div className="mb-5 flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-600 transition-colors duration-200 dark:bg-blue-500/15 dark:text-blue-200">
            <Sparkles className="h-7 w-7" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 transition-colors duration-200 dark:text-white sm:text-3xl">
              Ask CliniqAI
            </h2>
            <p className="mt-1 text-sm text-slate-600 transition-colors duration-200 dark:text-slate-300">
              Search trusted literature and get cited clinical answers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white p-3 shadow-sm transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:shadow-none">
          <input
            aria-label="Ask a clinical question"
            placeholder="Ask a clinical question..."
            className="h-12 min-w-0 flex-1 bg-transparent px-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500 sm:text-base"
          />
          <button
            type="button"
            aria-label="Submit question"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-950/20 transition-transform duration-200 hover:scale-[1.03]"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {filters.map(({ label, Icon }) => (
            <span
              key={label}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-700 dark:hover:bg-slate-800/80"
            >
              <Icon className="h-4 w-4" />
              {label}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900/90 lg:grid-cols-[1fr_250px]">
          <div>
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 transition-colors duration-200 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors duration-200 dark:text-white">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                Direct Answer
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 transition-colors duration-200 dark:bg-green-900 dark:text-green-300">
                <Beaker className="h-3.5 w-3.5" />
                Evidence strength: High
              </span>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              Recent evidence supports SGLT2 inhibitors as beneficial in heart failure patients, reducing
              cardiovascular death and hospitalization, regardless of diabetes status.
            </p>
            <h3 className="mt-6 text-sm font-semibold text-slate-900 transition-colors duration-200 dark:text-white">
              Key findings
            </h3>
            <ul className="mt-3 space-y-3">
              {findings.map((finding) => (
                <li key={finding} className="flex gap-2 text-sm text-slate-600 transition-colors duration-200 dark:text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-800/80">
            <h3 className="mb-3 text-sm font-semibold text-slate-900 transition-colors duration-200 dark:text-white">
              Top sources
            </h3>
            <div className="space-y-2">
              {sources.map(([title, journal, year, pmid]) => (
                <div
                  key={title}
                  className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-colors duration-200 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-none dark:hover:border-cyan-700"
                >
                  <div className="flex gap-2">
                    <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900 transition-colors duration-200 dark:text-white">
                        {title}
                      </p>
                      <p className="mt-1 text-[11px] leading-4 text-slate-600 transition-colors duration-200 dark:text-slate-300">
                        {journal}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500 transition-colors duration-200 dark:text-slate-400">
                        {year} <span className="px-1 text-slate-400 dark:text-slate-500">•</span> {pmid}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 text-[11px] text-slate-600 transition-colors duration-200 dark:border-slate-700 dark:text-slate-300 lg:col-span-2">
            <span className="inline-flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
              Sourced from{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open PubMed website"
                className="font-semibold text-blue-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-blue-300 dark:hover:text-cyan-400"
              >
                PubMed
              </a>{" "}
              and{" "}
              <a
                href="https://europepmc.org/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Europe PMC website"
                className="font-semibold text-cyan-700 transition-colors duration-200 hover:text-blue-600 hover:underline dark:text-cyan-300 dark:hover:text-cyan-400"
              >
                Europe PMC
              </a>
            </span>
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open PubMed website"
              className="text-slate-600 transition-colors duration-200 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-400"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://europepmc.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Europe PMC website"
              className="text-slate-600 transition-colors duration-200 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-400"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
