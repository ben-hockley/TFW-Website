"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTrainLayout } from "@/lib/mockData";
import { TrainLayout } from "@/lib/types";
import { TicketSummaryCard } from "@/components/TicketSummaryCard";
import { PaymentButtons } from "@/components/PaymentButtons";
import { PaymentSuccessAnimation } from "@/components/PaymentSuccessAnimation";
import { PageHeader } from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

type PaymentState = "idle" | "loading" | "success";

interface TicketPageProps {
  params: Promise<{ serviceId: string }>;
}

export default function TicketClient({ params }: TicketPageProps) {
  const { serviceId } = use(params);
  const router = useRouter();
  const [layout, setLayout] = useState<TrainLayout | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = getTrainLayout(serviceId);
      setLayout(data);
      setLoading(false);
    }, 400);
  }, [serviceId]);

  const handlePay = () => {
    if (paymentState !== "idle") return;
    setPaymentState("loading");
    setTimeout(() => {
      setPaymentState("success");
      setTimeout(() => {
        router.push(`/train/${serviceId}`);
      }, 2500);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="h-20 bg-[#C8102E]" />
        <div className="p-4 max-w-md mx-auto space-y-4 pt-6">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-4xl">🚫</div>
        <p className="text-lg font-medium">Train not found</p>
        <Link href="/" className="text-[#C8102E] hover:underline">
          ← Back to station selector
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <PageHeader
        title="Buy Ticket"
        backHref={`/train/${serviceId}`}
        backLabel="← Back to train"
      />

      <div className="p-4 max-w-md mx-auto space-y-4 pt-6 animate-[page-fade-in_0.3s_ease-out]">
        <TicketSummaryCard
          origin={layout.origin}
          destination={layout.destination}
          departureTime={layout.departureTime}
          ticketPrice={layout.ticketPrice}
        />

        {paymentState === "idle" && (
          <PaymentButtons onPay={handlePay} state={paymentState} />
        )}

        {paymentState === "loading" && (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="w-12 h-12 border-4 border-[#C8102E]/30 border-t-[#C8102E] rounded-full animate-spin" />
            <p className="text-sm font-medium text-[#6b7280]">
              Connecting to wallet…
            </p>
          </div>
        )}

        {paymentState === "success" && <PaymentSuccessAnimation />}
      </div>
    </div>
  );
}
