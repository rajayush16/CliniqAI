import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { login } from "../services/auth";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../components/ui/toast";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { BrandLogo } from "../components/common/BrandLogo";
import { ThemeToggle } from "../components/common/ThemeToggle";

export function Login() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setSession(response);
      toast("Signed in successfully.");
      navigate("/app");
    },
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate({ email, password });
  }

  return (
    <main className="grid min-h-screen p-4 text-slate-950 dark:text-white lg:grid-cols-[1fr_520px] lg:p-6">
      <section className="relative hidden overflow-hidden rounded-[2rem] border border-white/70 bg-white/72 p-10 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/72 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <BrandLogo to="/" size="hero" />
        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            Medical AI evidence agent
          </div>
          <h1 className="max-w-xl text-5xl font-semibold leading-tight">Trusted clinical answers, cited at the source.</h1>
          <div className="mt-8 grid gap-3">
            {["PubMed and Europe PMC retrieval", "Citation-first answer generation", "Designed for doctors and clinical evidence review"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <Card className="relative">
          <CardContent>
            <ShieldCheck className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Answers stay anchored to retrieved medical literature and show uncertainty clearly.</p>
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
                  <h1 className="text-2xl font-semibold">Welcome back</h1>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in to continue reviewing cited evidence.</p>
                </div>
                <div className="hidden lg:block"><ThemeToggle /></div>
              </div>
              <form className="space-y-4" onSubmit={onSubmit}>
                <Input type="email" placeholder="doctor@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
                <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                {mutation.error ? <p className="text-sm text-red-600 dark:text-red-300">{mutation.error.message}</p> : null}
                <Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? "Signing in..." : "Log in"}</Button>
              </form>
              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                New to CliniqAI? <Link className="font-semibold text-cyan-700 dark:text-cyan-300" to="/signup">Create an account</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
