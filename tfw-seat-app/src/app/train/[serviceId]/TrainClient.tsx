"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getTrainLayout, featureInfo } from "@/lib/mockData";
import { TrainLayout, Seat as SeatType } from "@/lib/types";
import { TrainHeader } from "@/components/TrainHeader";
import { CoachSelector } from "@/components/CoachSelector";
import { SeatMap } from "@/components/SeatMap";
import { SeatInfoModal } from "@/components/SeatInfoModal";
import { SeatSummaryPanel } from "@/components/SeatSummaryPanel";
import { PageHeader } from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

interface TrainPageProps {
  params: Promise<{ serviceId: string }>;
}

export default function TrainClient({ params }: TrainPageProps) {
  const { serviceId } = use(params);
  const [layout, setLayout] = useState<TrainLayout | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCoachId, setSelectedCoachId] = useState<string>("");
  const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = getTrainLayout(serviceId);
      setLayout(data);
      if (data && data.coaches.length > 0) {
        setSelectedCoachId(data.coaches[0].id);
      }
      setLoading(false);
    }, 500);
  }, [serviceId]);

  const handleSeatClick = (seat: SeatType) => {
    setSelectedSeat(seat);
    setModalOpen(true);
  };

  const selectedCoach = layout?.coaches.find((c) => c.id === selectedCoachId);
  const stationCode = serviceId.split("-")[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="h-20 bg-[#C8102E]" />
        <div className="p-4 space-y-4">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-24 rounded-xl shrink-0" />
            ))}
          </div>
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-4xl">🚫</div>
        <p className="text-lg font-medium">Train not found</p>
        <Link href="/" className="text-[#C8102E] hover:underline">
          ← Back to station selector
        </Link>
      </div>
    );
  }

  const timeStr = layout.departureTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      <PageHeader
        title={`${layout.origin} → ${layout.destination}`}
        subtitle={`Departs ${timeStr} · Plat ${layout.platform}`}
        backHref={`/station/${stationCode}`}
        backLabel="← Departures"
      />

      <div className="p-4 space-y-4">
        {/* Info strip with Buy Ticket button */}
        <TrainHeader
          origin={layout.origin}
          destination={layout.destination}
          departureTime={layout.departureTime}
          platform={layout.platform}
          serviceId={layout.serviceId}
        />

        {/* Coach selector */}
        <div className="space-y-2">
          <h2 className="font-semibold text-xs text-[#6b7280] uppercase tracking-widest px-1">
            Select Coach
          </h2>
          <div className="overflow-x-auto pb-1">
            <CoachSelector
              coaches={layout.coaches}
              selectedCoachId={selectedCoachId}
              onSelectCoach={setSelectedCoachId}
              hasAccessibleEntry={layout.hasAccessibleEntry}
            />
          </div>
        </div>

        {/* Seat map section */}
        {selectedCoach && (
          <>
            <SeatSummaryPanel coach={selectedCoach} />

            <div className="space-y-2">
              <h2 className="font-semibold text-xs text-[#6b7280] uppercase tracking-widest px-1">
                {selectedCoach.label} — Seat Map
              </h2>
              <SeatMap coach={selectedCoach} onSeatClick={handleSeatClick} />
            </div>

            {/* Legend */}
            <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
              <h3 className="font-semibold text-sm text-[#1D1D1B]">Legend</h3>
              <div className="flex flex-wrap gap-4 text-xs text-[#1D1D1B]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md border-2 bg-[#D4EDDA] border-[#22963f]" />
                  <span>Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md border-2 bg-[#CCCCCC] border-[#aaaaaa] opacity-70" />
                  <span>Occupied</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-[#6b7280]">
                {Object.entries(featureInfo).map(([key, info]) => (
                  <div key={key} className="flex items-center gap-1">
                    <span>{info.icon}</span>
                    <span>{info.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <SeatInfoModal
        seat={selectedSeat}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Sticky buy ticket footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] p-4 shadow-lg">
        <Link href={`/ticket/${layout.serviceId}`} className="block">
          <button className="w-full bg-[#1D1D1B] text-white font-semibold py-3.5 rounded-xl
                             hover:bg-[#333] active:scale-[0.99] transition-all min-h-[52px]">
            Buy Ticket — £{layout.ticketPrice.toFixed(2)}
          </button>
        </Link>
      </div>
    </div>
  );
}
