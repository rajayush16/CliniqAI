import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";

export function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-[#62758d]">Manage account details and workspace preferences.</p>
      </div>
      <Card>
        <CardHeader><h2 className="font-semibold">Profile</h2></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Name
            <Input className="mt-2" value={user?.name ?? ""} readOnly />
          </label>
          <label className="text-sm font-medium">
            Email
            <Input className="mt-2" value={user?.email ?? ""} readOnly />
          </label>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><h2 className="font-semibold">Evidence preferences</h2></CardHeader>
        <CardContent className="space-y-3 text-sm text-[#62758d]">
          <p>Default source scope: PubMed and Europe PMC.</p>
          <p>Default result mode: concise answer with citations and clinical safety note.</p>
          <Button variant="secondary" onClick={logout}>Log out</Button>
        </CardContent>
      </Card>
    </div>
  );
}

