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
      <head>
        {/* GitHub Pages SPA redirect: restore the real URL that was encoded by
            public/404.html so Next.js client-side routing can handle deep links. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var search = window.location.search;
  if (search.charAt(1) === 'p' && search.charAt(2) === '=') {
    var decoded = search.slice(3).split('&').map(function(s) {
      return s.replace(/~and~/g, '&');
    }).join('?');
    window.history.replaceState(
      null, null,
      window.location.pathname.replace(/\\/$/, '') + decoded
    );
  }
})();
`,
          }}
        />
      </head>
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
