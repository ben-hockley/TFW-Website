"use client";

import { Coach } from "@/lib/types";
import { PlatformZoneBadge } from "./PlatformZoneBadge";

interface CoachSelectorProps {
  coaches: Coach[];
  selectedCoachId: string;
  onSelectCoach: (coachId: string) => void;
  hasAccessibleEntry: boolean[];
}

export function CoachSelector({
  coaches,
  selectedCoachId,
  onSelectCoach,
  hasAccessibleEntry,
}: CoachSelectorProps) {
  const getOccupancyColor = (freeCount: number, totalCount: number) => {
    const ratio = freeCount / totalCount;
    if (ratio > 0.4) return "bg-status-ontime";
    if (ratio > 0.15) return "bg-status-delayed";
    return "bg-status-cancelled";
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3 min-w-max">
        {coaches.map((coach, index) => {
          const freeSeats = coach.seats.filter((s) => !s.isOccupied).length;
          const totalSeats = coach.seats.length;
          const isSelected = coach.id === selectedCoachId;

          return (
            <button
              key={coach.id}
              onClick={() => onSelectCoach(coach.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all min-w-[100px] ${
                isSelected
                  ? "border-tfw-red bg-tfw-red/5 shadow-md"
                  : "border-border hover:border-tfw-red/30 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm">{coach.label}</span>
                {hasAccessibleEntry[index] && (
                  <span className="text-xs" title="Accessible entry">♿</span>
                )}
              </div>
              <PlatformZoneBadge zone={coach.zone} />
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${getOccupancyColor(
                    freeSeats,
                    totalSeats
                  )}`}
                />
                <span className="text-xs text-muted-foreground">
                  {freeSeats} free
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
