"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { stations } from "@/lib/mockData";
import { useStation } from "@/lib/stationContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="flex flex-col items-center gap-8 pt-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-tfw-dark">
          Find Your Train
        </h1>
        <p className="text-muted-foreground">
          Select your station to view upcoming departures and seat availability
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <Input
          placeholder="Search for a station..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-lg h-12"
        />

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No stations found matching &ldquo;{search}&rdquo;
              </CardContent>
            </Card>
          ) : (
            filtered.map((station) => (
              <Card
                key={station.code}
                className="cursor-pointer transition-all hover:shadow-md hover:border-tfw-red/50 active:scale-[0.98]"
                onClick={() => handleSelect(station.code, station.name)}
              >
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <div className="font-semibold text-lg">{station.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Station code: {station.code}
                    </div>
                  </div>
                  <div className="text-tfw-red text-2xl">→</div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
