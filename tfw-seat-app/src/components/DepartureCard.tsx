"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";
import { Departure } from "@/lib/types";

interface DepartureCardProps {
  departure: Departure;
}

export function DepartureCard({ departure }: DepartureCardProps) {
  const statusColors: Record<string, string> = {
    "On Time": "bg-status-ontime text-white",
    Delayed: "bg-status-delayed text-white",
    Cancelled: "bg-status-cancelled text-white",
  };

  const timeStr = departure.departureTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="py-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="font-bold text-lg text-tfw-dark">
              {departure.destination}
            </div>
            <div className="text-sm text-muted-foreground">
              {departure.operator}
            </div>
          </div>
          <Badge className={statusColors[departure.status] || "bg-muted"}>
            {departure.status}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">🕐</span>
            <span className="font-semibold">{timeStr}</span>
          </div>
          <CountdownTimer departureTime={departure.departureTime} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">
              Platform {departure.platform}
            </Badge>
            <span className="text-sm text-muted-foreground">
              £{departure.ticketPrice.toFixed(2)}
            </span>
          </div>
          <Link href={`/train/${departure.serviceId}`}>
            <Button size="sm" className="bg-tfw-red hover:bg-tfw-red/90 text-white">
              View Seats
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
