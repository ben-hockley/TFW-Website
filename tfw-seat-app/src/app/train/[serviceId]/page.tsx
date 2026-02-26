"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getTrainLayout } from "@/lib/mockData";
import { TrainLayout, Seat as SeatType } from "@/lib/types";
import { TrainHeader } from "@/components/TrainHeader";
import { CoachSelector } from "@/components/CoachSelector";
import { SeatMap } from "@/components/SeatMap";
import { SeatInfoModal } from "@/components/SeatInfoModal";
import { SeatSummaryPanel } from "@/components/SeatSummaryPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { featureInfo } from "@/lib/mockData";

interface TrainPageProps {
  params: Promise<{ serviceId: string }>;
}

export default function TrainPage({ params }: TrainPageProps) {
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

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-24 rounded-xl shrink-0" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-4xl">🚫</div>
        <p className="text-lg font-medium">Train not found</p>
        <Link href="/" className="text-tfw-red hover:underline">
          ← Back to station selector
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href={`/station/${layout.serviceId.split("-")[0]}`}
        className="text-tfw-red hover:underline text-sm font-medium inline-block"
      >
        ← Back to departures
      </Link>

      <TrainHeader
        origin={layout.origin}
        destination={layout.destination}
        departureTime={layout.departureTime}
        platform={layout.platform}
        serviceId={layout.serviceId}
      />

      {/* Coach selector */}
      <div className="space-y-2">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Select Coach
        </h2>
        <CoachSelector
          coaches={layout.coaches}
          selectedCoachId={selectedCoachId}
          onSelectCoach={setSelectedCoachId}
          hasAccessibleEntry={layout.hasAccessibleEntry}
        />
      </div>

      {/* Selected coach seat map */}
      {selectedCoach && (
        <>
          <SeatSummaryPanel coach={selectedCoach} />

          <div className="space-y-3">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              {selectedCoach.label} — Seat Map
            </h2>
            <SeatMap coach={selectedCoach} onSeatClick={handleSeatClick} />
          </div>

          {/* Legend */}
          <div className="bg-muted/30 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-sm">Legend</h3>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 bg-seat-free/15 border-seat-free" />
                <span>Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 bg-seat-occupied/10 border-seat-occupied/30 opacity-60" />
                <span>Occupied</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
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

      <SeatInfoModal
        seat={selectedSeat}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Sticky buy ticket footer on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 sm:hidden shadow-lg">
        <Link href={`/ticket/${layout.serviceId}`} className="block">
          <button className="w-full bg-tfw-red text-white font-semibold py-3 rounded-xl hover:bg-tfw-red/90 transition-colors">
            Buy Ticket — £{layout.ticketPrice.toFixed(2)}
          </button>
        </Link>
      </div>

      {/* Spacer for sticky footer on mobile */}
      <div className="h-20 sm:hidden" />
    </div>
  );
}
