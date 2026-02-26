import TicketClient from "./TicketClient";

// See comment in train/[serviceId]/page.tsx for explanation.
export function generateStaticParams() {
  return [{ serviceId: "loading" }];
}

interface TicketPageProps {
  params: Promise<{ serviceId: string }>;
}

export default function TicketPage({ params }: TicketPageProps) {
  return <TicketClient params={params} />;
}
