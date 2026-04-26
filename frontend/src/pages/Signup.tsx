import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/auth";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../components/ui/toast";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";

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
    <main className="grid min-h-screen place-items-center bg-[#f5f8fb] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="mt-2 text-sm text-[#62758d]">Start asking evidence-backed medical questions.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} required minLength={2} />
            <Input type="email" placeholder="doctor@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <Input type="password" placeholder="Password, at least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
            {mutation.error ? <p className="text-sm text-[#b42318]">{mutation.error.message}</p> : null}
            <Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? "Creating account..." : "Create account"}</Button>
          </form>
          <p className="mt-5 text-center text-sm text-[#62758d]">
            Already have an account? <Link className="font-semibold text-[#1f5fbf]" to="/login">Log in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

