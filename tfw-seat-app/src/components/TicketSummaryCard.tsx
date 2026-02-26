"use client";

import { Card, CardContent } from "@/components/ui/card";

interface TicketSummaryCardProps {
  origin: string;
  destination: string;
  departureTime: Date;
  ticketPrice: number;
}

export function TicketSummaryCard({
  origin,
  destination,
  departureTime,
  ticketPrice,
}: TicketSummaryCardProps) {
  const timeStr = departureTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateStr = departureTime.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="border-2 border-tfw-red/20">
      <CardContent className="py-5 space-y-4">
        <div className="text-center space-y-1">
          <div className="text-lg font-bold text-tfw-dark">
            {origin} → {destination}
          </div>
          <div className="text-sm text-muted-foreground">
            {dateStr} at {timeStr}
          </div>
        </div>

        <div className="border-t border-dashed pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ticket type</span>
            <span className="font-medium">Standard Single</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Operator</span>
            <span className="font-medium">Transport for Wales</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold text-tfw-red">
              £{ticketPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
