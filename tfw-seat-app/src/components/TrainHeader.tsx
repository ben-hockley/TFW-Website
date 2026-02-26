"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="bg-tfw-dark text-white rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="text-lg font-bold">
            {origin} → {destination}
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <span>🕐 {timeStr}</span>
            <span>Platform {platform}</span>
          </div>
        </div>
        <Link href={`/ticket/${serviceId}`}>
          <Button className="bg-tfw-red hover:bg-tfw-red/90 text-white font-semibold">
            Buy Ticket
          </Button>
        </Link>
      </div>
    </div>
  );
}
