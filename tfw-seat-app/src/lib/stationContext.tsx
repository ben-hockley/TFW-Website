"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface StationContextType {
  selectedStation: string | null;
  selectedStationName: string | null;
  setStation: (code: string, name: string) => void;
}

const StationContext = createContext<StationContextType>({
  selectedStation: null,
  selectedStationName: null,
  setStation: () => {},
});

export function StationProvider({ children }: { children: ReactNode }) {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [selectedStationName, setSelectedStationName] = useState<string | null>(null);

  const setStation = (code: string, name: string) => {
    setSelectedStation(code);
    setSelectedStationName(name);
  };

  return (
    <StationContext.Provider value={{ selectedStation, selectedStationName, setStation }}>
      {children}
    </StationContext.Provider>
  );
}

export function useStation() {
  return useContext(StationContext);
}
