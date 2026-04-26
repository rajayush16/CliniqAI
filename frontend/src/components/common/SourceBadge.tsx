import { Database } from "lucide-react";
import { Badge } from "../ui/badge";

export function SourceBadge({ source }: { source: string }) {
  return (
    <Badge>
      <Database className="h-3.5 w-3.5" />
      {source}
    </Badge>
  );
}

