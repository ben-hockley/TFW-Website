"use client";

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
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e5e7eb] border-b-4 border-b-[#C8102E]">
      <div className="p-5 space-y-4">
        {/* Header: roundel + route */}
        <div className="flex items-start gap-3">
          {/* TfW Roundel */}
          <svg width="40" height="40" viewBox="0 0 40 40" aria-label="TfW">
            <circle cx="20" cy="20" r="20" fill="#C8102E" />
            <circle cx="20" cy="20" r="15" fill="white" />
            <text x="20" y="26" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#C8102E" fontFamily="Inter, sans-serif">T</text>
          </svg>
          <div className="min-w-0">
            <p className="font-bold text-[17px] text-[#1D1D1B] leading-tight">
              {origin} → {destination}
            </p>
            <p className="text-xs text-[#6b7280] mt-0.5">{dateStr} · {timeStr}</p>
          </div>
        </div>

        {/* Ticket type pill */}
        <div>
          <span className="inline-flex items-center bg-[#F5F5F5] text-[#1D1D1B] text-xs font-medium px-3 py-1 rounded-full">
            Standard Single
          </span>
        </div>

        {/* Detail rows */}
        <div className="border-t border-dashed pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#6b7280]">Operator</span>
            <span className="font-medium text-[#1D1D1B]">Transport for Wales</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-[#e5e7eb]">
            <span className="font-semibold text-[#1D1D1B]">Total</span>
            <span className="text-3xl font-bold text-[#1D1D1B]">
              £{ticketPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
