"use client";

import { Coach as CoachType, Seat as SeatType } from "@/lib/types";
import { Seat } from "./Seat";

interface SeatMapProps {
  coach: CoachType;
  onSeatClick: (seat: SeatType) => void;
}

export function SeatMap({ coach, onSeatClick }: SeatMapProps) {
  // Group seats by row
  const maxRow = Math.max(...coach.seats.map((s) => s.row));
  const maxCol = Math.max(...coach.seats.map((s) => s.column));
  const isWide = maxCol >= 3; // 2+2 layout

  const rows: SeatType[][] = [];
  for (let r = 0; r <= maxRow; r++) {
    rows.push(coach.seats.filter((s) => s.row === r).sort((a, b) => a.column - b.column));
  }

  return (
    <div className="space-y-4">
      {/* Train entry indicators */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full">
          <span>🚪</span>
          <span>Entry</span>
        </div>
        {coach.seats.some((s) => s.features.includes("accessible")) && (
          <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200">
            <span>♿</span>
            <span>Accessible Entry</span>
          </div>
        )}
      </div>

      {/* Seat grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1.5 min-w-max mx-auto">
          {/* Column labels */}
          <div className="flex gap-1.5 justify-center mb-1">
            {isWide ? (
              <>
                <div className="w-12 sm:w-14 text-center text-xs text-muted-foreground">A</div>
                <div className="w-12 sm:w-14 text-center text-xs text-muted-foreground">B</div>
                <div className="w-4" /> {/* Aisle */}
                <div className="w-12 sm:w-14 text-center text-xs text-muted-foreground">C</div>
                <div className="w-12 sm:w-14 text-center text-xs text-muted-foreground">D</div>
              </>
            ) : (
              <>
                <div className="w-12 sm:w-14 text-center text-xs text-muted-foreground">A</div>
                <div className="w-12 sm:w-14 text-center text-xs text-muted-foreground">B</div>
                <div className="w-4" /> {/* Aisle */}
                <div className="w-12 sm:w-14 text-center text-xs text-muted-foreground">C</div>
              </>
            )}
          </div>

          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1.5 items-center justify-center">
              {/* Row number */}
              <div className="w-6 text-right text-xs text-muted-foreground pr-1">
                {rowIndex + 1}
              </div>

              {/* Left seats */}
              {row.filter((s) => s.column < 2).map((seat) => (
                <Seat key={seat.seatId} seat={seat} onClick={onSeatClick} />
              ))}

              {/* Aisle gap */}
              <div className="w-4 flex items-center justify-center">
                <div className="w-0.5 h-8 bg-border" />
              </div>

              {/* Right seats */}
              {row.filter((s) => s.column >= 2).map((seat) => (
                <Seat key={seat.seatId} seat={seat} onClick={onSeatClick} />
              ))}

              {/* Table indicator for table rows */}
              {row.some((s) => s.features.includes("table")) && (
                <div className="text-[10px] text-muted-foreground ml-1">📋</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
