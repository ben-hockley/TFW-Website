"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  departureTime: Date;
}

export function CountdownTimer({ departureTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      const now = new Date();
      const diff = departureTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Departed");
        return;
      }

      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      if (mins > 60) {
        const hrs = Math.floor(mins / 60);
        const remainMins = mins % 60;
        setTimeLeft(`${hrs}h ${remainMins}m`);
      } else if (mins > 0) {
        setTimeLeft(`${mins} min${mins !== 1 ? "s" : ""}`);
      } else {
        setTimeLeft(`${secs}s`);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [departureTime]);

  if (!mounted) return <span className="text-sm text-muted-foreground">--</span>;

  const now = new Date();
  const diff = departureTime.getTime() - now.getTime();
  const isUrgent = diff > 0 && diff < 5 * 60 * 1000;

  return (
    <span
      className={`text-sm font-medium ${
        diff <= 0
          ? "text-muted-foreground"
          : isUrgent
          ? "text-status-delayed animate-pulse"
          : "text-status-ontime"
      }`}
    >
      {diff <= 0 ? "Departed" : `Departs in ${timeLeft}`}
    </span>
  );
}
