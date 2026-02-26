"use client";

export function PaymentSuccessAnimation() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <svg
        className="checkmark-wrap"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="checkmark-circle"
          cx="40"
          cy="40"
          r="36"
          stroke="#22c55e"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="checkmark-check"
          d="M24 42L34 52L56 30"
          stroke="#22c55e"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div className="text-center space-y-2">
        <p className="text-xl font-bold text-[#1D1D1B]">
          Success! Ticket added to your wallet.
        </p>
        <p className="text-sm text-[#6b7280]">
          Your ticket is saved in your Apple Wallet / Google Wallet
        </p>
      </div>
    </div>
  );
}
