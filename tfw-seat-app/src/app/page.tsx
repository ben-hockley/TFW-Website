"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { stations } from "@/lib/mockData";
import { useStation } from "@/lib/stationContext";
import { PageHeader } from "@/components/PageHeader";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { setStation } = useStation();

  const filtered = stations.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (code: string, name: string) => {
    setStation(code, name);
    router.push(`/station/${code}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader title="Select Station" />

      <div className="page-animate px-4 pt-6 pb-10 max-w-xl mx-auto space-y-6">

        {/* Search card */}
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-3">
          <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#6b7280]">
            From
          </label>
          <div className="relative">
            {/* Train icon */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C8102E] text-lg pointer-events-none select-none">
              🚉
            </span>
            <input
              type="text"
              placeholder="Departure station"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e5e7eb] text-[#1D1D1B] text-base
                         placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30
                         focus:border-[#C8102E] transition-colors bg-[#fafafa]"
            />
          </div>

          {/* Station list */}
          <div className="space-y-2 pt-1">
            {filtered.length === 0 ? (
              <p className="text-sm text-[#6b7280] text-center py-2">
                No stations found for &ldquo;{search}&rdquo;
              </p>
            ) : (
              filtered.map((station) => (
                <button
                  key={station.code}
                  onClick={() => handleSelect(station.code, station.name)}
                  className="w-full text-left px-4 py-3.5 rounded-xl border border-[#e5e7eb]
                             bg-white hover:border-[#C8102E] hover:bg-[#fff5f6]
                             transition-all active:scale-[0.99] min-h-[52px]
                             flex items-center justify-between group"
                >
                  <div>
                    <div className="font-semibold text-[15px] text-[#1D1D1B] leading-tight">
                      {station.name}
                    </div>
                    <div className="text-xs text-[#6b7280] mt-0.5">{station.code}</div>
                  </div>
                  <span className="text-[#C8102E] opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                    →
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Section heading */}
        <div className="space-y-1 px-1">
          <h2 className="text-lg font-bold text-[#1D1D1B]">Plan your journey</h2>
          <p className="text-sm text-[#6b7280] leading-relaxed">
            Select your departure station above to see live train times and real-time seat availability.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2">
          {["Live seat maps", "Platform zones", "Accessible seats", "Buy tickets"].map((f) => (
            <span
              key={f}
              className="bg-white rounded-full px-3.5 py-1.5 text-xs font-medium text-[#1D1D1B] border border-[#e5e7eb] shadow-sm"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
