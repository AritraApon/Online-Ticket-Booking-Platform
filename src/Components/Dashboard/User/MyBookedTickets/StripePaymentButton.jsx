'use client';

import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, Loader2 } from 'lucide-react';

export default function StripePaymentButton({ bookingId, totalAmount, isTimePassed }) {
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async (e) => {
    e.stopPropagation(); // কার্ডের হোভার বা অন্য ক্লিকে যেন ঝামেলা না করে
    if (isTimePassed) return;

    setLoading(true);
    try {
      console.log(`Initializing Stripe channel for Booking ID: ${bookingId}`);

      // Simulate Stripe latency
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Stripe Interface Triggered for Booking ID: ${bookingId}`);

    } catch (err) {
      console.error("Payment pipe connection error", err);
    } finally {
      setLoading(false);
    }
  };

  // ⚠️ Time Expired Guard Condition
  if (isTimePassed) {
    return (
      <div className="flex items-center space-x-1 text-red-500 text-[10px] font-black uppercase tracking-wider bg-red-50/60 px-2.5 py-1.5 rounded-lg border border-red-100">
        <AlertTriangle className="h-3 w-3 shrink-0" />
        <span>Expired</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleStripePayment}
      disabled={loading}
      className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-[0.97] disabled:opacity-50 group/btn"
    >
      <span>{loading ? "Processing..." : "Pay Now"}</span>

      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-[#FF6B35]" />
      ) : (
        <div className="h-4 w-4 rounded-full bg-zinc-800 flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5">
          <ArrowRight className="h-2.5 w-2.5 text-[#FF6B35] stroke-3" />
        </div>
      )}
    </button>
  );
}