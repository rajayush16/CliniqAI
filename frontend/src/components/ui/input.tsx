import { type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-[#cbd8e7] bg-white px-3 text-sm text-[#18324f] outline-none transition placeholder:text-[#8293a7] focus:border-[#2d6cdf] focus:ring-2 focus:ring-[#d8e7ff]",
        className,
      )}
      {...props}
    />
  );
}

