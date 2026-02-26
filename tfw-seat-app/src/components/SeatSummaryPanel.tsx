"use client";

import { Badge } from "@/components/ui/badge";
import { Coach } from "@/lib/types";
import { featureInfo } from "@/lib/mockData";

interface SeatSummaryPanelProps {
  coach: Coach;
}

export function SeatSummaryPanel({ coach }: SeatSummaryPanelProps) {
  const freeSeats = coach.seats.filter((s) => !s.isOccupied);
  const totalSeats = coach.seats.length;

  // Count features among free seats
  const featureCounts: Record<string, number> = {};
  freeSeats.forEach((seat) => {
    seat.features.forEach((f) => {
      featureCounts[f] = (featureCounts[f] || 0) + 1;
    });
  });

  return (
    <div className="bg-muted/50 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Seat Summary</h3>
        <Badge variant="secondary" className="text-sm">
          {freeSeats.length}/{totalSeats} free
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(featureCounts).map(([feature, count]) => (
          <Badge
            key={feature}
            variant="outline"
            className="text-xs py-1 px-2.5 gap-1"
          >
            <span>{featureInfo[feature]?.icon}</span>
            <span>{featureInfo[feature]?.label}</span>
            <span className="ml-0.5 font-bold">{count}</span>
          </Badge>
        ))}
        {Object.keys(featureCounts).length === 0 && (
          <span className="text-sm text-muted-foreground">No featured seats available</span>
        )}
      </div>
    </div>
  );
}
