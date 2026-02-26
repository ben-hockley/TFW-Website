import Link from "next/link";
import { ReactNode } from "react";

// TfW "T" roundel SVG – white circle, red T inside
function TfWRoundel({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Transport for Wales logo"
    >
      <circle cx="18" cy="18" r="18" fill="white" />
      <text
        x="18"
        y="24"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fontFamily="Inter, system-ui, sans-serif"
        fill="#C8102E"
      >
        T
      </text>
    </svg>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** href for a "← Back" link shown top-left in white */
  backHref?: string;
  backLabel?: string;
  /** any extra element positioned top-right (e.g. a buy-ticket button) */
  rightElement?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  backHref,
  backLabel = "← Back",
  rightElement,
}: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-[#C8102E] text-white select-none">
      {/* Top bar */}
      <div className="relative flex items-center gap-3 px-4 pt-4 pb-5">
        {/* Left: roundel + optional back link */}
        <div className="flex items-center gap-2 shrink-0">
          <TfWRoundel size={34} />
          {backHref && (
            <Link
              href={backHref}
              className="text-white/90 text-sm font-medium hover:text-white transition-colors ml-1"
            >
              {backLabel}
            </Link>
          )}
        </div>

        {/* Centre: page title */}
        <div className="flex-1 text-center px-2">
          <h1 className="font-bold text-[17px] leading-tight tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/70 text-xs mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Right: optional element */}
        <div className="shrink-0">
          {rightElement ?? <div className="w-[34px]" />}
        </div>
      </div>

      {/* Wave divider – white wave that fades into the #F5F5F5 page background */}
      <div className="relative h-5 overflow-hidden">
        <svg
          viewBox="0 0 390 20"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,10 C100,20 290,0 390,10 L390,20 L0,20 Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
    </div>
  );
}
