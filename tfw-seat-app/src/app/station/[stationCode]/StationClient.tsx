"use client";

import { useEffect, useState, use } from "react";
import { getDepartures, stations } from "@/lib/mockData";
import { useStation } from "@/lib/stationContext";
import { DepartureCard } from "@/components/DepartureCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/PageHeader";
import { Departure } from "@/lib/types";

interface StationPageProps {
  params: Promise<{ stationCode: string }>;
}

type FilterTab = "All" | "On Time" | "Delayed";

export default function StationClient({ params }: StationPageProps) {
  const { stationCode } = use(params);
  const { setStation } = useStation();
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

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

  const filtered =
    activeTab === "All"
      ? departures
      : departures.filter((d) => d.status === activeTab);

  const tabs: FilterTab[] = ["All", "On Time", "Delayed"];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title={stationName}
        subtitle="Upcoming departures · Next 2 hours"
        backHref="/"
        backLabel="← Stations"
      />

      <div className="bg-white border-b border-[#e5e7eb] shadow-sm sticky top-[81px] z-40">
        <div className="flex max-w-xl mx-auto px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors relative min-h-[48px] ${
                activeTab === tab
                  ? "text-[#C8102E]"
                  : "text-[#6b7280] hover:text-[#1D1D1B]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#C8102E] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-4 pb-10 space-y-3">
        {lastRefresh && (
          <p className="text-xs text-[#9ca3af] text-right">
            Updated{" "}
            {lastRefresh.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </p>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-4 space-y-3 border-l-4 border-[#e5e7eb]">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-7 w-16" />
                </div>
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="text-5xl">🚂</div>
            <p className="font-semibold text-[#1D1D1B]">No departures found</p>
            <p className="text-sm text-[#6b7280]">
              {activeTab !== "All"
                ? `No "${activeTab}" trains right now. Try another filter.`
                : `No upcoming trains from ${stationName} in the next 2 hours.`}
            </p>
            {activeTab !== "All" && (
              <button
                onClick={() => setActiveTab("All")}
                className="mt-3 text-sm font-semibold text-[#C8102E] underline underline-offset-2"
              >
                Show all trains
              </button>
            )}
          </div>
        ) : (
          filtered.map((dep, i) => (
            <DepartureCard key={dep.serviceId} departure={dep} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
