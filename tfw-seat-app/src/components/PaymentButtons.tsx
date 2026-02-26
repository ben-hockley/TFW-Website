"use client";

type PaymentState = "idle" | "loading" | "success";

interface PaymentButtonsProps {
  onPay: () => void;
  state: PaymentState;
}

export function PaymentButtons({ onPay, state }: PaymentButtonsProps) {
  const disabled = state !== "idle";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
      {/* Apple Pay */}
      <button
        onClick={onPay}
        disabled={disabled}
        className={`w-full min-h-[56px] flex items-center justify-center gap-2 py-3.5 px-4
          bg-black text-white rounded-xl font-semibold text-sm transition-all
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#222] active:scale-[0.98]"}`}
      >
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
          <path d="M17.05 12.536c-.027-2.882 2.353-4.267 2.46-4.332-1.34-1.96-3.427-2.229-4.17-2.261-1.775-.18-3.466 1.047-4.369 1.047-.902 0-2.296-1.02-3.773-.993-1.94.028-3.728 1.129-4.729 2.868-2.016 3.5-.516 8.683 1.449 11.523.96 1.389 2.105 2.949 3.61 2.893 1.448-.058 1.996-.937 3.748-.937 1.752 0 2.243.937 3.775.907 1.558-.028 2.551-1.413 3.505-2.807 1.104-1.61 1.559-3.168 1.587-3.249-.035-.016-3.044-1.169-3.073-4.636l-.02.021z" fill="white"/>
          <path d="M14.12 3.91C14.913 2.94 15.45 1.614 15.3.265c-1.157.047-2.56.77-3.39 1.74-.744.862-1.396 2.238-1.221 3.56 1.29.1 2.607-.656 3.431-1.656z" fill="white"/>
        </svg>
        Pay with Apple Pay
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#e5e7eb]" />
        <span className="text-xs text-[#9ca3af] font-medium">or</span>
        <div className="flex-1 h-px bg-[#e5e7eb]" />
      </div>

      {/* Google Pay */}
      <button
        onClick={onPay}
        disabled={disabled}
        className={`w-full min-h-[56px] flex items-center justify-center gap-2 py-3.5 px-4
          bg-white border border-[#e5e7eb] text-[#1D1D1B] rounded-xl font-semibold text-sm transition-all
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-[#1D1D1B]/30 hover:shadow-md active:scale-[0.98]"}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Pay with Google Pay
      </button>
    </div>
  );
}
