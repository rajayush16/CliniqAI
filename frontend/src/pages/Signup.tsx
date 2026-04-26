import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, Sparkles } from "lucide-react";
import { signup } from "../services/auth";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../components/ui/toast";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { BrandLogo } from "../components/common/BrandLogo";
import { ThemeToggle } from "../components/common/ThemeToggle";

export function Signup() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      setSession(response);
      toast("Account created.");
      navigate("/app");
    },
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate({ name, email, password });
  }

  return (
    <main className="grid min-h-screen p-4 text-slate-950 dark:text-white lg:grid-cols-[1fr_520px] lg:p-6">
      <section className="relative hidden overflow-hidden rounded-[2rem] border border-white/70 bg-white/72 p-10 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/72 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <BrandLogo to="/" size="hero" />
        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            Start your clinical evidence workspace
          </div>
          <h1 className="max-w-xl text-5xl font-semibold leading-tight">Ask better clinical questions with cited answers.</h1>
          <div className="mt-8 grid gap-3">
            {["Fast medical literature retrieval", "Saved papers and search history", "AI summaries with visible confidence"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <Card>
          <CardContent>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">Evidence-first by design</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">No general web search. CliniqAI retrieves from PubMed and Europe PMC before answering.</p>
          </CardContent>
        </Card>
      </section>

      <section className="flex items-center justify-center p-2 lg:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <BrandLogo to="/" size="nav" />
            <ThemeToggle />
          </div>
          <Card>
            <CardContent className="p-8">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">Create your account</h1>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Start asking evidence-backed medical questions.</p>
                </div>
                <div className="hidden lg:block"><ThemeToggle /></div>
              </div>
              <form className="space-y-4" onSubmit={onSubmit}>
                <Input placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} required minLength={2} />
                <Input type="email" placeholder="doctor@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
                <Input type="password" placeholder="Password, at least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
                {mutation.error ? <p className="text-sm text-red-600 dark:text-red-300">{mutation.error.message}</p> : null}
                <Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? "Creating account..." : "Create account"}</Button>
              </form>
              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account? <Link className="font-semibold text-cyan-700 dark:text-cyan-300" to="/login">Log in</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
