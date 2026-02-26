import TrainClient from "./TrainClient";

// ServiceIds are generated at runtime from mock data, so we can't enumerate them
// at build time. Returning a placeholder satisfies Next.js static-export requirement;
// actual navigation works via client-side routing (falling back to 404.html on GitHub Pages).
export function generateStaticParams() {
  return [{ serviceId: "loading" }];
}

interface TrainPageProps {
  params: Promise<{ serviceId: string }>;
}

export default function TrainPage({ params }: TrainPageProps) {
  return <TrainClient params={params} />;
}
