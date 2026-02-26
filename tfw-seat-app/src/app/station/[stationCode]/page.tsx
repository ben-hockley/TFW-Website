import { stations } from "@/lib/mockData";
import StationClient from "./StationClient";

// Required for `output: 'export'` — tells Next.js which station pages to pre-render
export function generateStaticParams() {
  return stations.map((s) => ({ stationCode: s.code }));
}

interface StationPageProps {
  params: Promise<{ stationCode: string }>;
}

export default function StationPage({ params }: StationPageProps) {
  return <StationClient params={params} />;
}