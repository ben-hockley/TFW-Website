"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getDepartures, stations } from "@/lib/mockData";
import { useStation } from "@/lib/stationContext";
import { DepartureCard } from "@/components/DepartureCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Departure } from "@/lib/types";

interface StationPageProps {
  params: Promise<{ stationCode: string }>;
}

export default function StationPage({ params }: StationPageProps) {
  const { stationCode } = use(params);
  const { setStation } = useStation();
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const station = stations.find((s) => s.code === stationCode);
  const stationName = station?.name ?? stationCode;

  useEffect(() => {
    if (station) {
      setStation(station.code, station.name);
    }
  }, [station, setStation]);

  useEffect(() => {
    const fetchDepartures = () => {
      setLoading(true);
      // Simulate network delay
      setTimeout(() => {
        const data = getDepartures(stationCode);
        setDepartures(data);
        setLoading(false);
        setLastRefresh(new Date());
      }, 600);
    };

    fetchDepartures();
    const interval = setInterval(fetchDepartures, 30000);
    return () => clearInterval(interval);
  }, [stationCode]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="text-tfw-red hover:underline text-sm font-medium"
        >
          ← Change Station
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-tfw-dark">{stationName}</h1>
        <p className="text-muted-foreground text-sm">
          Upcoming departures • Next 2 hours
          {lastRefresh && (
            <span className="ml-2 text-xs">
              (Updated {lastRefresh.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })})
            </span>
          )}
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-4 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-32" />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : departures.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <div className="text-4xl mb-4">🚂</div>
          <p className="text-lg font-medium">No departures found</p>
          <p className="text-sm">
            There are no upcoming trains from {stationName} in the next 2 hours.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {departures.map((dep) => (
            <DepartureCard key={dep.serviceId} departure={dep} />
          ))}
        </div>
      )}
    </div>
  );
}
