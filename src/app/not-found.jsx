import React from 'react';
import Link from 'next/link';
 import "./globals.css";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-400 flex flex-col items-center justify-center relative overflow-hidden px-4 select-none">

      {/* Dynamic Background Premium Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B35]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-xl text-center space-y-8 flex flex-col items-center">

        {/* Animated Big 404 Header Layout */}
        <div className="relative">
          <h1 className="text-[120px] sm:text-[160px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-800 leading-none">
            404
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF6B35] text-white text-[10px] font-black tracking-widest uppercase rounded-md shadow-lg shadow-orange-500/20 whitespace-nowrap">
            Route Not Found
          </div>
        </div>

        {/* Dynamic Lost Bus Vector Concept */}
        <div className="w-full max-w-sm bg-[#121214]/40 backdrop-blur-md border border-zinc-900/80 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-2 left-3 flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
          </div>

          <div className="py-4 flex flex-col items-center space-y-4">
            {/* Custom Bus Wandering SVG */}
            <div className="animate-bounce duration-1000 text-zinc-600 group-hover:text-[#FF6B35] transition-colors">
              <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v10h1M14 17H9" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
                {/* Question mark signaling lost state */}
                <path d="M12 6h.01M10 3.5a2 2 0 1 1 3.3 1.5c-.7.6-1.3 1.2-1.3 2" stroke="#FF6B35" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-xs font-bold tracking-wide text-zinc-500 text-center px-4 leading-relaxed">
              Oops! Driver vul route-e chole esheche. Apni jey terminal khujchen ota amader distribution network-e nai.
            </p>
          </div>
        </div>

        {/* Action Button Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-[#FF6B35] hover:bg-[#ff571a] text-white font-black text-sm rounded-xl shadow-lg shadow-orange-500/10 active:scale-95 transition-all"
          >
            {/* Home Icon SVG */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Back to Terminal (Home)</span>
          </Link>

          <Link
            href="/all-tickets"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-300 font-bold text-sm rounded-xl active:scale-95 transition-all"
          >
            <span>Browse Available Tickets</span>
            {/* Arrow Right SVG */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>

      </div>
    </div>
  );
}