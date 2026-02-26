"use client";

import Link from "next/link";
import { CountdownTimer } from "./CountdownTimer";
import { Departure } from "@/lib/types";

interface DepartureCardProps {
  departure: Departure;
  index: number;
}

export function DepartureCard({ departure, index }: DepartureCardProps) {
  const borderColors: Record<string, string> = {
    "On Time": "border-[#22963f]",
    Delayed: "border-[#d97706]",
    Cancelled: "border-[#C8102E]",
  };

  const statusColors: Record<string, string> = {
    "On Time": "text-[#22963f]",
    Delayed: "text-[#d97706]",
    Cancelled: "text-[#C8102E]",
  };

  const timeStr = departure.departureTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const delayMin =
    departure.status === "Delayed"
      ? Math.floor(5 + Math.random() * 10)
      : undefined;

  const delayStr = departure.status === "Cancelled"
    ? "Cancelled"
    : departure.status === "Delayed"
    ? `+${delayMin} min`
    : "On Time";

  const cap = Math.min(index, 11);

  return (
    <div
      className={`card-animate card-delay-${cap} bg-white rounded-2xl shadow-sm border-l-4 ${
        borderColors[departure.status] ?? "border-[#e5e7eb]"
      } overflow-hidden`}
    >
      <div className="p-4 space-y-3">
        {/* Row 1: Destination + Departure time */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[17px] text-[#1D1D1B] leading-tight truncate">
              {departure.destination}
            </p>
            <p className="text-xs text-[#6b7280] mt-0.5">{departure.operator}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[22px] font-bold text-[#C8102E] leading-none">
              {timeStr}
            </p>
            <p
              className={`text-xs font-semibold mt-0.5 ${
                statusColors[departure.status] ?? "text-[#6b7280]"
              }`}
            >
              {delayStr}
            </p>
          </div>
        </div>

        {/* Row 2: Countdown + Platform */}
        <div className="flex items-center gap-2">
          <CountdownTimer departureTime={departure.departureTime} />
          <span className="text-[#9ca3af] text-xs">·</span>
          <span className="inline-flex items-center bg-[#1D1D1B] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            Plat {departure.platform}
          </span>
        </div>

        {/* Row 3: View Seats button — full width, dark pill */}
        {departure.status !== "Cancelled" && (
          <Link href={`/train/${departure.serviceId}`} className="block">
            <button className="w-full bg-[#1D1D1B] text-white font-semibold text-sm py-3 rounded-xl
                               hover:bg-[#333] active:scale-[0.99] transition-all min-h-[48px]">
              View Seats →
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
