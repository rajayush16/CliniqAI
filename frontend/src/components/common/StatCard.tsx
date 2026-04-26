import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type StatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#62758d]">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-[#18324f]">{value}</p>
        </div>
        <div className="rounded-md bg-[#edf5ff] p-3 text-[#245896]">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}

