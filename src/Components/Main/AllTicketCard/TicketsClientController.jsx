'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, SlidersHorizontal, ArrowUpDown, Calendar, Clock, ArrowRight, LayoutGrid } from 'lucide-react';
import Image from 'next/image';

export default function TicketsClientController({ fallbackTickets }) {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [transportFilter, setTransportFilter] = useState('all');
  const [priceSort, setPriceSort] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Card Counter Dynamic Countdown
  const calculateTimeLeft = (dateString) => {
    const difference = new Date(dateString) - new Date();
    if (difference <= 0) return { passed: true, text: "Passed" };
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    if (days > 0) return { passed: false, text: `${days}d ${hours}h left` };
    return { passed: false, text: `${hours}h left` };
  };

  // Date Parser
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return { date: "N/A", time: "N/A" };
    const dateObj = new Date(dateTimeString);
    return {
      date: dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  };

  // 🎛️ SEARCH FILTER SORT ENGINE
  // 🟢 BACKEND CONNECTIVITY NOTE: Server pipeline add korle direct filteredAndSortedTickets method block rewrite kora lagbe
  const filteredAndSortedTickets = fallbackTickets
    .filter((ticket) => {
      const matchFrom = ticket.from?.toLowerCase().includes(searchFrom.toLowerCase());
      const matchTo = ticket.to?.toLowerCase().includes(searchTo.toLowerCase());
      const matchTransport = transportFilter === 'all' || ticket.transportType?.toLowerCase() === transportFilter.toLowerCase();
      return matchFrom && matchTo && matchTransport;
    })
    .sort((a, b) => {
      if (priceSort === 'lowToHigh') return a.pricePerUnit - b.pricePerUnit;
      if (priceSort === 'highToLow') return b.pricePerUnit - a.pricePerUnit;
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSortedTickets.length / itemsPerPage);
  const paginatedTickets = filteredAndSortedTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchFrom, searchTo, transportFilter, priceSort]);

  return (
    <div className="space-y-6 text-left">

      {/* 🤍 Clean Light Control Deck */}
      <div className="bg-white dark:bg-[#0B1224] border border-zinc-200 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        {/* Origin Field */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1.5 pl-1">Origin Node</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Leaving from..."
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)} // 🟢 BACKEND INTERPOLATION CAPTURE
              className="w-full bg-zinc-50 dark:bg-[#070A12] pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Target Field */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1.5 pl-1">Target Terminal</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Going to..."
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)} // 🟢 BACKEND INTERPOLATION CAPTURE
              className="w-full bg-zinc-50 dark:bg-[#070A12] pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Transport Type */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1.5 pl-1">Classification</label>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <select
              value={transportFilter}
              onChange={(e) => setTransportFilter(e.target.value)} // 🟢 BACKEND INTERPOLATION CAPTURE
              className="w-full bg-zinc-50 dark:bg-[#070A12] pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] appearance-none cursor-pointer"
            >
              <option value="all">All Transits</option>
              <option value="bus">Bus Network</option>
              <option value="train">Rail System</option>
              <option value="flight">Aviation Deck</option>
              <option value="launch">Marine Fleet</option>
            </select>
          </div>
        </div>

        {/* Tariff Sorting */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1.5 pl-1">Sort Metric</label>
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)} // 🟢 BACKEND INTERPOLATION CAPTURE
              className="w-full bg-zinc-50 dark:bg-[#070A12] pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] appearance-none cursor-pointer"
            >
              <option value="none">Standard Sequence</option>
              <option value="lowToHigh">Fare: Low to High</option>
              <option value="highToLow">Fare: High to Low</option>
            </select>
          </div>
        </div>

        {/* Clear Filter */}
        <div className="flex items-end">
          <button
            onClick={() => { setSearchFrom(''); setSearchTo(''); setTransportFilter('all'); setPriceSort('none'); }}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 tracking-wider text-zinc-600 dark:text-zinc-400 uppercase transition-all duration-200 active:scale-[0.98]"
          >
            Reset Filters
          </button>
        </div>

      </div>

      {/* 🤍 Bright Minimalist Card Layout */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        <AnimatePresence mode="popLayout">
          {paginatedTickets.map((ticket, index) => {
            const timeStatus = calculateTimeLeft(ticket.departureDateTime);
            const departure = formatDateTime(ticket.departureDateTime);

            return (
              <motion.div
                key={ticket._id || ticket.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.06)", transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#0B1224] rounded-2xl border-2 border-zinc-100 dark:border-zinc-800/80 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300 group text-left"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
                  <Image width={400} height={400}
                    src={ticket.image || "https://i.ibb.co.com/rfcHK5ym/image.png"}
                    alt={ticket.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />

                  {/* Transport Type Pill */}
                  <span className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">
                    {ticket.transportType}
                  </span>

                  {/* Countdown Timer HUD */}
                  <div className={`absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${
                    timeStatus.passed ? "bg-red-500/10 border-red-200 text-red-600 dark:text-red-400" : "bg-zinc-900/95 border-zinc-800 text-[#FF6B35]"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span>{timeStatus.text}</span>
                  </div>
                </div>

                {/* Content Elements Block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">

                    {/* Title */}
                    <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight leading-snug group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">
                      {ticket.title}
                    </h3>

                    {/* From -> To Segment */}
                    <div className="flex items-center gap-3 text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#070A12] p-3 rounded-xl border border-zinc-100 dark:border-zinc-900">
                      <span className="truncate text-zinc-900 dark:text-zinc-200">{ticket.from}</span>
                      <div className="flex-1 flex items-center justify-center min-w-[20px]">
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-zinc-200 via-[#FF6B35]/30 to-zinc-200 dark:from-zinc-900 dark:to-zinc-900" />
                        <ArrowRight className="h-3.5 w-3.5 text-[#FF6B35] shrink-0 mx-1.5 animate-pulse" />
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-zinc-200 via-[#FF6B35]/30 to-zinc-200 dark:from-zinc-900 dark:to-zinc-900" />
                      </div>
                      <span className="text-[#1E3A8A] dark:text-blue-400 truncate">{ticket.to}</span>
                    </div>

                    {/* Departure Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold border border-zinc-100 dark:border-zinc-900/60 p-3 rounded-xl bg-zinc-50/50 dark:bg-[#070A12]/50">
                      <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400">
                        <Calendar className="h-3.5 w-3.5 text-[#1E3A8A] dark:text-blue-500" />
                        <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-300 truncate">{departure.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 justify-end text-zinc-500">
                        <Clock className="h-3.5 w-3.5 text-zinc-400" />
                        <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{departure.time}</span>
                      </div>
                    </div>

                    {/* Included Perks Mapping */}
                    {ticket.perks && ticket.perks.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 block pl-0.5">Included Perks</span>
                        <div className="flex flex-wrap gap-1.5">
                          {ticket.perks.slice(0, 3).map((perk, idx) => (
                            <span key={idx} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-[#070A12] text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-900">
                              {perk}
                            </span>
                          ))}
                          {ticket.perks.length > 3 && (
                            <span className="text-[10px] font-black text-[#FF6B35] bg-[#FF6B35]/5 px-2 py-1 rounded-lg border border-[#FF6B35]/10">
                              +{ticket.perks.length - 3} More
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing Matrix & Call-to-action Row */}
                  <div className="pt-4 border-t-2 border-dashed border-zinc-100 dark:border-zinc-900 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold block">Per Ticket Price</span>
                        <span className="text-2xl font-black text-[#FF6B35] tracking-tight">৳{ticket.pricePerUnit}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold block">Allocation</span>
                        <span className="text-[11px] font-black bg-zinc-100 dark:bg-[#070A12] text-zinc-800 dark:text-zinc-300 px-2.5 py-1 rounded-lg inline-block mt-1">
                          {ticket.quantity || 0} Units
                        </span>
                      </div>
                    </div>

                    {/* Interactive Click Router Link */}
                    <Link
                      href={`/all-tickets/${ticket._id || ticket.id}`} // 🟢 BACKEND CONNECTIVITY NODE: Requirement 5 dynamic router handler map
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-[#1E3A8A] hover:bg-indigo-900 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm shadow-blue-900/10"
                    >
                      <span>See Details</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty Fallback State */}
      {filteredAndSortedTickets.length === 0 && (
        <div className="text-center py-24 bg-white dark:bg-[#0B1224] border border-zinc-200 dark:border-zinc-900 rounded-2xl space-y-3">
          <div className="p-3 bg-zinc-50 dark:bg-[#070A12] max-w-max mx-auto rounded-full text-zinc-400">
            <LayoutGrid className="h-6 w-6 shrink-0" />
          </div>
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
            No active transit corridors intersect criteria filters.
          </p>
        </div>
      )}

      {/* Pagination Element Layout Controls */}
      {/* 🟢 BACKEND CONNECTIVITY NODE: Server side dynamic total pages configuration interface block */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1 pt-5 border-t border-zinc-200 dark:border-zinc-900">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-white dark:bg-[#0B1224] border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-40 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Page <span className="text-[#1E3A8A] dark:text-blue-500 font-black">{currentPage}</span> of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-white dark:bg-[#0B1224] border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-40 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}