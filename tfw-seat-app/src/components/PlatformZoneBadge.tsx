import { Badge } from "@/components/ui/badge";

interface PlatformZoneBadgeProps {
  zone: string;
}

export function PlatformZoneBadge({ zone }: PlatformZoneBadgeProps) {
  return (
    <Badge variant="outline" className="text-xs font-medium border-tfw-red/30 text-tfw-red">
      {zone}
    </Badge>
  );
}
