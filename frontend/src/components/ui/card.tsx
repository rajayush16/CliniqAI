import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/70 bg-white/82 shadow-[0_20px_70px_rgba(15,40,80,0.08)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/76 dark:shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-slate-200/70 p-5 dark:border-slate-800/80", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
