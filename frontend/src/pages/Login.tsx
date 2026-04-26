import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../components/ui/toast";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";

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
    <main className="grid min-h-screen place-items-center bg-[#f5f8fb] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-[#62758d]">Sign in to continue reviewing cited evidence.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input type="email" placeholder="doctor@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            {mutation.error ? <p className="text-sm text-[#b42318]">{mutation.error.message}</p> : null}
            <Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? "Signing in..." : "Log in"}</Button>
          </form>
          <p className="mt-5 text-center text-sm text-[#62758d]">
            New to CliniqAI? <Link className="font-semibold text-[#1f5fbf]" to="/signup">Create an account</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

