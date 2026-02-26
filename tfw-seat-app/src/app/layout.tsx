import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StationProvider } from "@/lib/stationContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TfW Seat Finder — Transport for Wales",
  description: "Find available seats on Transport for Wales trains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#F5F5F5]`}>
        <StationProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-[#F5F5F5]">
              {children}
            </div>
          </TooltipProvider>
        </StationProvider>
      </body>
    </html>
  );
}
