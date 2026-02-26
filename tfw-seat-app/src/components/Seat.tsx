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
            w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 flex flex-col items-center justify-center
            text-[10px] transition-all relative
            ${
              isFree
                ? "bg-seat-free/15 border-seat-free text-seat-free hover:bg-seat-free/25 hover:scale-105 cursor-pointer"
                : "bg-seat-occupied/10 border-seat-occupied/30 text-seat-occupied/50 opacity-60 cursor-not-allowed"
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
          {seat.isOccupied && (
            <div className="absolute inset-0 rounded-lg bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(0,0,0,0.05)_3px,rgba(0,0,0,0.05)_6px)]" />
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
