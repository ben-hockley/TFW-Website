import { Station, Departure, TrainLayout, Coach, Seat, ServiceStatus } from "./types";

// ── Stations ────────────────────────────────────────────────────────────────
export const stations: Station[] = [
  { name: "Cardiff Central", code: "CDF" },
  { name: "Cardiff Queen Street", code: "CQS" },
  { name: "Cathays", code: "CYS" },
  { name: "Newport", code: "NWP" },
];

// ── Seeded random number generator ──────────────────────────────────────────
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ── Route definitions ───────────────────────────────────────────────────────
interface Route {
  destination: string;
  destinationCode: string;
  isIntercity: boolean;
  minPrice: number;
  maxPrice: number;
  coaches: number;
}

const routesFromStation: Record<string, Route[]> = {
  CDF: [
    { destination: "Manchester Piccadilly", destinationCode: "MAN", isIntercity: true, minPrice: 14.0, maxPrice: 24.0, coaches: 6 },
    { destination: "Birmingham New Street", destinationCode: "BHM", isIntercity: true, minPrice: 12.0, maxPrice: 20.0, coaches: 5 },
    { destination: "Swansea", destinationCode: "SWA", isIntercity: false, minPrice: 8.0, maxPrice: 14.0, coaches: 4 },
    { destination: "Bristol Temple Meads", destinationCode: "BRI", isIntercity: true, minPrice: 10.0, maxPrice: 18.0, coaches: 5 },
    { destination: "Merthyr Tydfil", destinationCode: "MER", isIntercity: false, minPrice: 5.5, maxPrice: 9.0, coaches: 3 },
    { destination: "Treherbert", destinationCode: "TRH", isIntercity: false, minPrice: 4.5, maxPrice: 7.5, coaches: 2 },
    { destination: "Barry Island", destinationCode: "BYI", isIntercity: false, minPrice: 3.5, maxPrice: 5.5, coaches: 2 },
    { destination: "Penarth", destinationCode: "PEN", isIntercity: false, minPrice: 3.5, maxPrice: 5.0, coaches: 2 },
    { destination: "Rhymney", destinationCode: "RHY", isIntercity: false, minPrice: 5.0, maxPrice: 8.0, coaches: 3 },
    { destination: "Coryton", destinationCode: "COR", isIntercity: false, minPrice: 3.5, maxPrice: 5.0, coaches: 2 },
    { destination: "Ebbw Vale Town", destinationCode: "EBV", isIntercity: false, minPrice: 5.0, maxPrice: 8.0, coaches: 3 },
    { destination: "Bridgend", destinationCode: "BGN", isIntercity: false, minPrice: 6.0, maxPrice: 10.0, coaches: 3 },
  ],
  CQS: [
    { destination: "Treherbert", destinationCode: "TRH", isIntercity: false, minPrice: 4.5, maxPrice: 7.5, coaches: 2 },
    { destination: "Merthyr Tydfil", destinationCode: "MER", isIntercity: false, minPrice: 5.5, maxPrice: 9.0, coaches: 3 },
    { destination: "Rhymney", destinationCode: "RHY", isIntercity: false, minPrice: 5.0, maxPrice: 8.0, coaches: 3 },
    { destination: "Coryton", destinationCode: "COR", isIntercity: false, minPrice: 3.5, maxPrice: 5.0, coaches: 2 },
    { destination: "Barry Island", destinationCode: "BYI", isIntercity: false, minPrice: 3.5, maxPrice: 6.0, coaches: 2 },
    { destination: "Penarth", destinationCode: "PEN", isIntercity: false, minPrice: 3.5, maxPrice: 5.0, coaches: 2 },
    { destination: "Cardiff Bay", destinationCode: "CDB", isIntercity: false, minPrice: 3.5, maxPrice: 4.0, coaches: 2 },
    { destination: "Caerphilly", destinationCode: "CPH", isIntercity: false, minPrice: 3.5, maxPrice: 5.5, coaches: 2 },
    { destination: "Pontypridd", destinationCode: "PPD", isIntercity: false, minPrice: 4.0, maxPrice: 6.0, coaches: 2 },
    { destination: "Aberdare", destinationCode: "ABA", isIntercity: false, minPrice: 5.0, maxPrice: 8.0, coaches: 3 },
  ],
  CYS: [
    { destination: "Treherbert", destinationCode: "TRH", isIntercity: false, minPrice: 4.5, maxPrice: 7.5, coaches: 2 },
    { destination: "Merthyr Tydfil", destinationCode: "MER", isIntercity: false, minPrice: 5.0, maxPrice: 8.5, coaches: 3 },
    { destination: "Rhymney", destinationCode: "RHY", isIntercity: false, minPrice: 4.5, maxPrice: 7.5, coaches: 3 },
    { destination: "Coryton", destinationCode: "COR", isIntercity: false, minPrice: 3.5, maxPrice: 4.5, coaches: 2 },
    { destination: "Radyr", destinationCode: "RDR", isIntercity: false, minPrice: 3.5, maxPrice: 4.0, coaches: 2 },
    { destination: "Barry Island", destinationCode: "BYI", isIntercity: false, minPrice: 4.0, maxPrice: 6.0, coaches: 2 },
    { destination: "Cardiff Central", destinationCode: "CDF", isIntercity: false, minPrice: 3.5, maxPrice: 4.0, coaches: 2 },
    { destination: "Pontypridd", destinationCode: "PPD", isIntercity: false, minPrice: 3.5, maxPrice: 5.5, coaches: 2 },
    { destination: "Aberdare", destinationCode: "ABA", isIntercity: false, minPrice: 5.0, maxPrice: 8.0, coaches: 3 },
    { destination: "Caerphilly", destinationCode: "CPH", isIntercity: false, minPrice: 3.5, maxPrice: 5.0, coaches: 2 },
  ],
  NWP: [
    { destination: "Cardiff Central", destinationCode: "CDF", isIntercity: false, minPrice: 5.0, maxPrice: 8.0, coaches: 4 },
    { destination: "Manchester Piccadilly", destinationCode: "MAN", isIntercity: true, minPrice: 16.0, maxPrice: 24.0, coaches: 6 },
    { destination: "Birmingham New Street", destinationCode: "BHM", isIntercity: true, minPrice: 14.0, maxPrice: 22.0, coaches: 5 },
    { destination: "Swansea", destinationCode: "SWA", isIntercity: false, minPrice: 10.0, maxPrice: 16.0, coaches: 4 },
    { destination: "Bristol Temple Meads", destinationCode: "BRI", isIntercity: true, minPrice: 8.0, maxPrice: 14.0, coaches: 4 },
    { destination: "London Paddington", destinationCode: "PAD", isIntercity: true, minPrice: 18.0, maxPrice: 24.0, coaches: 6 },
    { destination: "Cheltenham Spa", destinationCode: "CNM", isIntercity: true, minPrice: 12.0, maxPrice: 18.0, coaches: 4 },
    { destination: "Gloucester", destinationCode: "GCR", isIntercity: false, minPrice: 8.0, maxPrice: 14.0, coaches: 4 },
    { destination: "Ebbw Vale Town", destinationCode: "EBV", isIntercity: false, minPrice: 4.0, maxPrice: 6.5, coaches: 2 },
    { destination: "Cwmbran", destinationCode: "CWM", isIntercity: false, minPrice: 3.5, maxPrice: 5.0, coaches: 2 },
  ],
};

// ── Generate departures ──────────────────────────────────────────────────────
export function getDepartures(stationCode: string): Departure[] {
  const stationRoutes = routesFromStation[stationCode];
  if (!stationRoutes) return [];

  const station = stations.find((s) => s.code === stationCode);
  if (!station) return [];

  const now = new Date();
  const rand = seededRandom(
    now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() + stationCode.charCodeAt(0)
  );

  const numDepartures = 8 + Math.floor(rand() * 5); // 8–12
  const departures: Departure[] = [];

  for (let i = 0; i < numDepartures; i++) {
    const route = stationRoutes[i % stationRoutes.length];
    const minutesAhead = 3 + Math.floor(rand() * 115); // 3–117 minutes ahead
    const depTime = new Date(now.getTime() + minutesAhead * 60 * 1000);
    // Round to neat times
    depTime.setSeconds(0, 0);

    const statusRoll = rand();
    let status: ServiceStatus = "On Time";
    if (statusRoll > 0.85) status = "Cancelled";
    else if (statusRoll > 0.7) status = "Delayed";

    const price = Number(
      (route.minPrice + rand() * (route.maxPrice - route.minPrice)).toFixed(2)
    );

    const platforms = ["1", "2", "3", "4", "5", "6", "7"];
    const platform = platforms[Math.floor(rand() * platforms.length)];

    departures.push({
      serviceId: `${stationCode}-${route.destinationCode}-${i}-${depTime.getHours()}${depTime.getMinutes()}`,
      origin: station.name,
      originCode: stationCode,
      destination: route.destination,
      destinationCode: route.destinationCode,
      departureTime: depTime,
      platform,
      status,
      operator: "Transport for Wales",
      ticketPrice: price,
      coaches: route.coaches,
    });
  }

  // Sort by departure time
  departures.sort((a, b) => a.departureTime.getTime() - b.departureTime.getTime());
  return departures;
}

// ── Generate seat features ───────────────────────────────────────────────────
function generateSeatFeatures(
  row: number,
  col: number,
  rand: () => number
): string[] {
  const features: string[] = [];

  // Window seats: columns 0 and 3 (in 2+2) or 0 and 2 (in 2+1)
  if (col === 0 || col === 3) {
    features.push("window");
  }

  // Table seats: specific rows
  if (row % 4 === 0 || row % 4 === 1) {
    features.push("table");
  }

  // Charger: ~40% chance
  if (rand() > 0.6) {
    features.push("charger");
  }

  // Accessible: first row only
  if (row === 0 && (col === 0 || col === 1)) {
    features.push("accessible");
  }

  // Quiet zone: last 2 rows
  if (row >= 10) {
    features.push("quiet");
  }

  return features;
}

// ── Generate train layout ────────────────────────────────────────────────────
export function getTrainLayout(serviceId: string): TrainLayout | null {
  // Parse serviceId to reconstruct data
  const parts = serviceId.split("-");
  if (parts.length < 4) return null;

  const originCode = parts[0];
  const destCode = parts[1];

  const station = stations.find((s) => s.code === originCode);
  const routes = routesFromStation[originCode];
  if (!station || !routes) return null;

  const route = routes.find((r) => r.destinationCode === destCode);
  if (!route) return null;

  const rand = seededRandom(
    serviceId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  );

  const now = new Date();
  const hourMin = parts[3];
  const hours = parseInt(hourMin.substring(0, hourMin.length > 3 ? 2 : 1));
  const mins = parseInt(hourMin.substring(hourMin.length > 3 ? 2 : 1));
  const depTime = new Date(now);
  depTime.setHours(hours, mins, 0, 0);

  const platforms = ["1", "2", "3", "4", "5", "6", "7"];
  const platform = platforms[Math.floor(rand() * platforms.length)];

  const numCoaches = route.coaches;
  const coachLabels = ["A", "B", "C", "D", "E", "F"];
  const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];

  const coaches: Coach[] = [];
  const hasAccessibleEntry: boolean[] = [];
  const isIntercity = route.isIntercity;
  const seatingConfig = isIntercity ? 4 : 3; // 2+2 or 2+1
  const numRows = isIntercity ? 12 : 10;

  for (let c = 0; c < numCoaches; c++) {
    const seats: Seat[] = [];
    const occupancyRate = 0.3 + rand() * 0.6; // 30%–90%

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < seatingConfig; col++) {
        const seatId = `${coachLabels[c]}${row + 1}${col === 0 ? "A" : col === 1 ? "B" : col === 2 ? "C" : "D"}`;
        seats.push({
          seatId,
          row,
          column: col,
          isOccupied: rand() < occupancyRate,
          features: generateSeatFeatures(row, col, rand),
        });
      }
    }

    const zoneIndex = Math.floor((c / numCoaches) * zones.length);
    coaches.push({
      id: coachLabels[c],
      label: `Coach ${coachLabels[c]}`,
      zone: zones[Math.min(zoneIndex, zones.length - 1)],
      seats,
    });

    // First and last coaches have accessible entries, middle ones don't
    hasAccessibleEntry.push(c === 0 || c === numCoaches - 1);
  }

  const price = Number(
    (route.minPrice + rand() * (route.maxPrice - route.minPrice)).toFixed(2)
  );

  return {
    serviceId,
    origin: station.name,
    destination: route.destination,
    departureTime: depTime,
    platform,
    coaches,
    ticketPrice: price,
    hasAccessibleEntry,
  };
}

// ── Feature icons and labels ─────────────────────────────────────────────────
export const featureInfo: Record<string, { icon: string; label: string }> = {
  window: { icon: "🪟", label: "Window Seat" },
  table: { icon: "📋", label: "Table Seat" },
  charger: { icon: "🔌", label: "Phone Charger" },
  accessible: { icon: "♿", label: "Accessible" },
  quiet: { icon: "🔇", label: "Quiet Zone" },
};
