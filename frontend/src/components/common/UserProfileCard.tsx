import { LogOut } from "lucide-react";
import type { User } from "../../types/auth";
import { Button } from "../ui/button";

type UserProfileCardProps = {
  user: User | null;
  onLogout: () => void;
};

export function UserProfileCard({ user, onLogout }: UserProfileCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white">
          {(user?.name ?? "Doctor").slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{user?.name ?? "Doctor"}</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.role ?? "Clinical user"}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Log out">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

