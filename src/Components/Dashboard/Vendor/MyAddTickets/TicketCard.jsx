"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import DeleteButton from './DeleteButton';

export default function TicketCard({ ticket, onUpdate, onDelete, index }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  // 🕒 Countdown Timer Engine logic
  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(ticket.departureDateTime) - new Date();
      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft("Departure Time Passed");
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      if (days > 0) setTimeLeft(`${days}d ${hours}h left`);
      else if (hours > 0) setTimeLeft(`${hours}h ${minutes}m left`);
      else setTimeLeft(`${minutes}m left`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [ticket.departureDateTime]);

  // 🗓️ Format Departure Date & Time
  const formatDeparture = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const dateObj = new Date(dateTimeString);

    // Formatting options e.g., "22 Jun 2026"
    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions);

    // Formatting time e.g., "03:45 PM"
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = dateObj.toLocaleTimeString('en-US', timeOptions);

    return { date: formattedDate, time: formattedTime };
  };

  const departureInfo = formatDeparture(ticket.departureDateTime);
  const isRejected = ticket.verificationStatus === "rejected";

  const statusColors = {
    pending: "bg-amber-500 text-neutral-950 font-black px-3 py-1 rounded-full border border-amber-400 text-xs shadow-[0_2px_10px_rgba(234,179,8,0.15)]",
    approved: "bg-emerald-600 text-white font-black px-3 py-1 rounded-full border border-emerald-500 text-xs shadow-[0_2px_10px_rgba(34,197,94,0.15)]",
    rejected: "bg-rose-600 text-white font-black px-3 py-1 rounded-full border border-rose-500 text-xs"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-[#0F172A] border-2 border-zinc-100 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
    >
      {/* Upper Thumbnail Image */}
      <div className="relative w-full h-52 bg-zinc-200 dark:bg-zinc-900 overflow-hidden">
        <Image
          src={ticket.image || "https://i.ibb.co.com/rfcHK5ym/image.png"}
          alt={ticket.title}
          fill
          sizes="(max-w-7xl) 33vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase tracking-widest bg-[#1E3A8A] text-white rounded-lg shadow-lg">
          {ticket.transportType}
        </span>
        <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-xl text-xs font-black backdrop-blur-md border flex items-center gap-2 shadow-md ${
          isExpired ? "bg-rose-500/20 text-rose-400 border-rose-500/30" : "bg-[#09090b]/85 text-orange-400 border-zinc-800"
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>{timeLeft}</span>
        </div>
      </div>

      {/* Description Matrix Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-4">

          {/* Title Area & Highlighted Status Pill */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-extrabold text-xl text-zinc-900 dark:text-white tracking-tight leading-tight group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">
              {ticket.title}
            </h3>
            <span className={`${statusColors[ticket.verificationStatus] || statusColors.pending} uppercase tracking-wider shrink-0 select-none`}>
              {ticket.verificationStatus}
            </span>
          </div>

          {/* Route Section */}
          <div className="flex items-center gap-3 text-base font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800/40">
            <span className="text-zinc-900 dark:text-zinc-100">{ticket.from}</span>
            <svg className="h-4 w-4 text-[#FF6B35] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
            <span className="text-[#1E3A8A] dark:text-blue-400 font-extrabold">{ticket.to}</span>
          </div>

          {/* New Field: Departure Date & Time Showcase */}
          <div className="flex items-center justify-between gap-2 p-3 bg-[#1E3A8A]/5 dark:bg-blue-500/5 border border-[#1E3A8A]/10 dark:border-blue-500/10 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <svg className="h-4 w-4 text-[#1E3A8A] dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{departureInfo.date}</span>
            </div>
            <div className="text-xs font-black text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded-md">
              {departureInfo.time}
            </div>
          </div>

          {/* New Field: Dynamic Perks Section */}
          {ticket.perks && ticket.perks.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-extrabold uppercase tracking-wider">Included Perks</p>
              <div className="flex flex-wrap gap-1.5">
                {ticket.perks.map((perk, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-700/50 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#FF6B35]" />
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price & Seats Allocation */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t-2 border-dashed border-zinc-100 dark:border-zinc-800/60 text-xs font-bold text-zinc-500">
            <div>
              <p className="text-zinc-400 dark:text-zinc-500 text-[11px] uppercase tracking-wider font-semibold">Per Ticket Price</p>
              <p className="text-2xl font-black text-[#FF6B35] mt-1">৳{ticket.pricePerUnit}</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-400 dark:text-zinc-500 text-[11px] uppercase tracking-wider font-semibold">Seats Allocation</p>
              <p className="text-base font-black text-zinc-800 dark:text-zinc-100 mt-1.5">{ticket.quantity} Units</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => onUpdate(ticket._id)}
            disabled={isRejected}
            className="flex-1 py-3 rounded-xl text-xs font-black tracking-wider uppercase border-2 border-[#1E3A8A] hover:bg-[#1E3A8A] text-[#1E3A8A] hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white active:scale-95 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Update Details
          </button>
          <DeleteButton ticket={ticket} />
          {/* <button
            onClick={() => onDelete(ticket._id)}
            disabled={isRejected}
            className="flex-1 py-3 rounded-xl text-xs font-black tracking-wider uppercase bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/10 active:scale-95 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Delete Asset
          </button> */}
        </div>

      </div>
    </motion.div>
  );
}