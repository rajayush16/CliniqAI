import { type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border border-[#cbd8e7] bg-white px-3 py-3 text-sm leading-6 text-[#18324f] outline-none transition placeholder:text-[#8293a7] focus:border-[#2d6cdf] focus:ring-2 focus:ring-[#d8e7ff]",
        className,
      )}
      {...props}
    />
  );
}

