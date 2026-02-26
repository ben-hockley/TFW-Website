import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StationProvider } from "@/lib/stationContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StationProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background">
              <header className="bg-tfw-red text-white">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
                  <div className="font-bold text-xl tracking-tight">
                    🚆 TfW Seat Finder
                  </div>
                  <span className="text-white/70 text-sm hidden sm:inline">
                    Transport for Wales
                  </span>
                </div>
              </header>
              <main className="max-w-5xl mx-auto px-4 py-6">
                {children}
              </main>
            </div>
          </TooltipProvider>
        </StationProvider>
      </body>
    </html>
  );
}
