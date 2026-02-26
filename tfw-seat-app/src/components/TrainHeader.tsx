"use client";

import Link from "next/link";

interface TrainHeaderProps {
  origin: string;
  destination: string;
  departureTime: Date;
  platform: string;
  serviceId: string;
}

export function TrainHeader({
  origin,
  destination,
  departureTime,
  platform,
  serviceId,
}: TrainHeaderProps) {
  const timeStr = departureTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between gap-4">
      {/* Left: route + time */}
      <div className="min-w-0">
        <p className="font-bold text-[15px] text-[#1D1D1B] truncate">
          {origin} → {destination}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#C8102E] font-semibold text-sm">{timeStr}</span>
          <span className="inline-flex items-center bg-[#1D1D1B] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            Plat {platform}
          </span>
        </div>
      </div>

      {/* Right: Buy Ticket CTA */}
      <Link href={`/ticket/${serviceId}`} className="shrink-0">
        <button className="bg-[#1D1D1B] text-white text-sm font-semibold px-4 py-2.5 rounded-xl
                           hover:bg-[#333] active:scale-[0.98] transition-all whitespace-nowrap">
          Buy Ticket
        </button>
      </Link>
    </div>
  );
}
