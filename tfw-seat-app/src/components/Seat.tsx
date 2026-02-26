"use client";

import { Seat as SeatType } from "@/lib/types";
import { featureInfo } from "@/lib/mockData";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SeatProps {
  seat: SeatType;
  onClick: (seat: SeatType) => void;
}

export function Seat({ seat, onClick }: SeatProps) {
  const isFree = !seat.isOccupied;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => isFree && onClick(seat)}
          disabled={seat.isOccupied}
          className={`
            w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex flex-col items-center justify-center
            text-[10px] transition-all relative
            ${
              isFree
                ? "bg-[#D4EDDA] border-[#22963f] text-[#22963f] hover:scale-105 cursor-pointer"
                : "bg-[#CCCCCC] border-[#aaaaaa] text-[#888] opacity-70 cursor-not-allowed seat-hatch"
            }
          `}
          aria-label={`Seat ${seat.seatId} - ${isFree ? "Available" : "Occupied"}`}
        >
          <span className="font-bold text-[11px]">{seat.seatId}</span>
          {isFree && seat.features.length > 0 && (
            <div className="flex gap-0.5 mt-0.5">
              {seat.features.slice(0, 3).map((f) => (
                <span key={f} className="text-[9px] leading-none">
                  {featureInfo[f]?.icon}
                </span>
              ))}
            </div>
          )}

        </button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-xs space-y-1">
          <div className="font-bold">Seat {seat.seatId}</div>
          <div>{isFree ? "✅ Available" : "❌ Occupied"}</div>
          {isFree && seat.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {seat.features.map((f) => (
                <span key={f} className="bg-muted px-1.5 py-0.5 rounded text-[10px]">
                  {featureInfo[f]?.icon} {featureInfo[f]?.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
