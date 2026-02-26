"use client";

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
    <div className="bg-[#F5F5F5] rounded-2xl p-4 space-y-3 border border-[#e5e7eb]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-[#1D1D1B]">Coach Summary</h3>
        <span className="inline-flex items-center bg-[#1D1D1B] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
          {freeSeats.length}/{totalSeats} free
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(featureCounts).map(([feature, count]) => (
          <span
            key={feature}
            className="inline-flex items-center gap-1 bg-white border border-[#e5e7eb] text-[#1D1D1B] text-xs py-1 px-2.5 rounded-full"
          >
            <span>{featureInfo[feature]?.icon}</span>
            <span>{featureInfo[feature]?.label}</span>
            <span className="ml-0.5 font-bold text-[#C8102E]">{count}</span>
          </span>
        ))}
        {Object.keys(featureCounts).length === 0 && (
          <span className="text-sm text-[#6b7280]">No featured seats available</span>
        )}
      </div>
    </div>
  );
}
