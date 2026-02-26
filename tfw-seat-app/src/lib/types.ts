export interface Station {
  name: string;
  code: string;
}

export type ServiceStatus = "On Time" | "Delayed" | "Cancelled";

export interface Departure {
  serviceId: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: Date;
  platform: string;
  status: ServiceStatus;
  operator: string;
  ticketPrice: number;
  coaches: number;
}

export interface SeatFeature {
  type: "window" | "table" | "charger" | "accessible" | "quiet";
  icon: string;
  label: string;
}

export interface Seat {
  seatId: string;
  row: number;
  column: number;
  isOccupied: boolean;
  features: string[];
}

export interface Coach {
  id: string;
  label: string;
  zone: string;
  seats: Seat[];
}

export interface TrainLayout {
  serviceId: string;
  origin: string;
  destination: string;
  departureTime: Date;
  platform: string;
  coaches: Coach[];
  ticketPrice: number;
  hasAccessibleEntry: boolean[];
}
