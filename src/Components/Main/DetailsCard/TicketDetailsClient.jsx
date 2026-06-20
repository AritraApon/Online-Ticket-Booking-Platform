'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ShieldCheck, MapPin, Sparkles, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BookingModal from './BookingModal';

export default function TicketDetailsClient({ ticket }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ passed: false, text: "Calculating..." });

  // Real-time Countdown Engine
  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(ticket.departureDateTime) - new Date();

      if (difference <= 0) {
        setTimeLeft({ passed: true, text: "EXPIRED" });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      if (days > 0) {
        setTimeLeft({ passed: false, text: `${days}d ${hours}h ${minutes}m ${seconds}s` });
      } else {
        setTimeLeft({ passed: false, text: `${hours}h ${minutes}m ${seconds}s` });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [ticket.departureDateTime]);

  const dateObj = ticket.departureDateTime ? new Date(ticket.departureDateTime) : null;
  const formattedDate = dateObj ? dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
  const formattedTime = dateObj ? dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'N/A';

  const isExpired = timeLeft.passed;
  const isOutOfStock = (ticket.quantity || 0) <= 0;
  const isBookingDisabled = isExpired || isOutOfStock;

  return (
    <div className="space-y-6 text-left selection:bg-[#FF6B35]/20">

      {/* Top Action Bar with Back Button */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={() => router.back()}
          className="group flex items-center space-x-2 px-4 py-2 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-[#1E3A8A]" />
          <span>Back to Fleet</span>
        </button>
        <span className="text-[11px] font-black tracking-widest uppercase bg-[#1E3A8A]/5 text-[#1E3A8A] px-3 py-1.5 rounded-lg border border-[#1E3A8A]/10">
          Ticket Management Console
        </span>
      </div>

      {/* Main Structural Balanced Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT COLUMN: Media + Action Deck (Narrow & Compact) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Smaller, Trimmed Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-2.5 rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden relative group"
          >
            <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden bg-zinc-50">
              <img
                src={ticket.image || "https://i.ibb.co.com/rfcHK5ym/image.png"}
                alt={ticket.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">
                {ticket.transportType}
              </span>
            </div>
          </motion.div>

          {/* Compact, Ultra-Sharp Booking Action Card (No Empty Space) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white border-2 border-zinc-900 p-5 rounded-3xl shadow-[5px_5px_0px_0px_#1E3A8A] space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B35]">
                Live Reservation
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Compact Countdown Box */}
            <div className={`p-4 rounded-xl border transition-all text-center ${
              isExpired
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-zinc-900 border-zinc-950 text-white shadow-md"
            }`}>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-0.5">Gateway Countdown</span>
              <p className="text-base font-black tracking-wider font-mono text-[#FF6B35]">
                {timeLeft.text}
              </p>
            </div>

            {/* Stock and Price Mini Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-center">
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold block mb-0.5">Available</span>
                <span className={`text-sm font-black ${isOutOfStock ? "text-red-500" : "text-[#1E3A8A]"}`}>
                  {ticket.quantity || 0} Seats
                </span>
              </div>
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-center">
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold block mb-0.5">Fare</span>
                <span className="text-sm font-black text-zinc-800">
                  ৳{ticket.pricePerUnit}
                </span>
              </div>
            </div>

            {/* Guard Info Messages */}
            {isBookingDisabled && (
              <div className="flex items-center space-x-2 text-[11px] font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200/60">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>{isExpired ? "Departure schedule has passed." : "Sold out!"}</span>
              </div>
            )}

            {/* Action Trigger Button */}
            <motion.button
              whileHover={!isBookingDisabled ? { scale: 1.02 } : {}}
              whileTap={!isBookingDisabled ? { scale: 0.98 } : {}}
              onClick={() => setIsModalOpen(true)}
              disabled={isBookingDisabled}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#1E3A8A] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm hover:bg-[#122554] disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="h-4 w-4 text-[#FF6B35]" />
              <span>Book This Ticket</span>
            </motion.button>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Full Specifications Display Card (Wide & Beautiful) */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7 bg-white border border-zinc-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6"
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Fleet Designation</span>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
              {ticket.title}
            </h1>
          </div>

          {/* Route Network Vector Card */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block pl-0.5">Route Network Blueprint</span>
            <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-3 bg-zinc-50 p-4 border border-zinc-200 rounded-xl">
              <div className="md:col-span-3 flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg border border-zinc-200">
                  <MapPin className="h-4 w-4 text-zinc-400" />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold block">Origin</span>
                  <span className="text-sm font-extrabold text-zinc-800">{ticket.from}</span>
                </div>
              </div>
              <div className="hidden md:flex md:col-span-1 justify-center">
                <div className="h-8 w-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                  <ArrowRight className="h-3.5 w-3.5 text-[#FF6B35]" />
                </div>
              </div>
              <div className="md:col-span-3 flex gap-2 items-center space-x-3 md:justify-end md:text-right">
                <div className="md:order-2 p-2 bg-[#1E3A8A]/5 rounded-lg border border-[#1E3A8A]/10">
                  <MapPin className="h-4 w-4 text-[#1E3A8A]" />
                </div>
                <div className="md:order-1">
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold block">Destination Terminal</span>
                  <span className="text-sm font-extrabold text-[#1E3A8A]">{ticket.to}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics Dynamic Dates Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3.5 p-3.5 rounded-xl border border-zinc-200 bg-white shadow-sm">
              <div className="p-2.5 bg-blue-50 text-[#1E3A8A] rounded-lg">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold block">Departure Date</span>
                <span className="text-xs font-black text-zinc-800">{formattedDate}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3.5 p-3.5 rounded-xl border border-zinc-200 bg-white shadow-sm">
              <div className="p-2.5 bg-orange-50 text-[#FF6B35] rounded-lg">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold block">Departure Time</span>
                <span className="text-xs font-black text-zinc-800">{formattedTime}</span>
              </div>
            </div>
          </div>

          {/* Perks Row Block */}
          {ticket.perks && ticket.perks.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block pl-0.5">Premium Included Perks</span>
              <div className="flex flex-wrap gap-2">
                {ticket.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5 text-xs font-bold px-3 py-2 bg-white text-zinc-700 border border-zinc-200 rounded-lg shadow-sm">
                    <Sparkles className="h-3.5 w-3.5 text-[#FF6B35]" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

      </div>

      {/* Booking Modal Inject Sheet */}
      <AnimatePresence>
        {isModalOpen && (
          <BookingModal
            ticket={ticket}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}