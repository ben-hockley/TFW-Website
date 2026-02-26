"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTrainLayout } from "@/lib/mockData";
import { TrainLayout } from "@/lib/types";
import { TicketSummaryCard } from "@/components/TicketSummaryCard";
import { PaymentButtons } from "@/components/PaymentButtons";
import { PaymentSuccessAnimation } from "@/components/PaymentSuccessAnimation";
import { Skeleton } from "@/components/ui/skeleton";

type PaymentState = "idle" | "loading" | "success";

interface TicketPageProps {
  params: Promise<{ serviceId: string }>;
}

export default function TicketPage({ params }: TicketPageProps) {
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

    // Show loading for 2 seconds
    setTimeout(() => {
      setPaymentState("success");

      // Redirect after 2.5 seconds
      setTimeout(() => {
        router.push(`/train/${serviceId}`);
      }, 2500);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto space-y-6 pt-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="flex gap-3">
          <Skeleton className="h-12 flex-1 rounded-xl" />
          <Skeleton className="h-12 flex-1 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-4xl">🚫</div>
        <p className="text-lg font-medium">Train not found</p>
        <Link href="/" className="text-tfw-red hover:underline">
          ← Back to station selector
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6 pt-4">
      {paymentState === "idle" && (
        <Link
          href={`/train/${serviceId}`}
          className="text-tfw-red hover:underline text-sm font-medium inline-block"
        >
          ← Back to train
        </Link>
      )}

      <h1 className="text-2xl font-bold text-tfw-dark">Purchase Ticket</h1>

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
          <div className="w-10 h-10 border-4 border-tfw-red/30 border-t-tfw-red rounded-full animate-spin" />
          <p className="text-sm font-medium text-muted-foreground">
            Connecting to wallet…
          </p>
        </div>
      )}

      {paymentState === "success" && <PaymentSuccessAnimation />}
    </div>
  );
}
