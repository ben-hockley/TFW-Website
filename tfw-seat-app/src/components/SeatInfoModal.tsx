"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Seat } from "@/lib/types";
import { featureInfo } from "@/lib/mockData";

interface SeatInfoModalProps {
  seat: Seat | null;
  open: boolean;
  onClose: () => void;
}

export function SeatInfoModal({ seat, open, onClose }: SeatInfoModalProps) {
  if (!seat) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl">Seat {seat.seatId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${
                seat.isOccupied ? "bg-seat-occupied" : "bg-seat-free"
              }`}
            />
            <span className="font-medium">
              {seat.isOccupied ? "Occupied" : "Available"}
            </span>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-2">
              Row {seat.row + 1}, Column {seat.column + 1}
            </div>
          </div>

          {seat.features.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2">Features</div>
              <div className="flex flex-wrap gap-2">
                {seat.features.map((f) => (
                  <Badge
                    key={f}
                    variant="secondary"
                    className="text-sm py-1 px-3"
                  >
                    {featureInfo[f]?.icon} {featureInfo[f]?.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {seat.features.length === 0 && (
            <div className="text-sm text-muted-foreground">
              Standard seat — no special features
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
