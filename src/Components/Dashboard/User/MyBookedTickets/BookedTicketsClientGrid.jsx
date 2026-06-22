'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, ChevronLeft, ChevronRight, ArrowRight, Filter, AlertCircle } from 'lucide-react';
import StripePaymentButton from './StripePaymentButton';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

// ⏱️ Clean Minimal Countdown Engine Component
function TicketCardCountdown({ targetDate, status }) {
  const [timeLeft, setTimeLeft] = useState("Calculating...");
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    if (status === 'rejected' || status === 'paid') return;

    const calculate = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) {
        setTimeLeft("Expired");
        setIsPassed(true);
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      setTimeLeft(days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`);
    };

    calculate();
    const interval = setInterval(calculate, 60000);
    return () => clearInterval(interval);
  }, [targetDate, status]);

  if (status === 'rejected' || status === 'paid') return null;

  return (
    <span className={`text-[11px] font-bold ${isPassed ? "text-[#EF4444]" : "text-[#FF6B35]"}`}>
      {isPassed ? "Expired" : `Ends in: ${timeLeft}`}
    </span>
  );
}

export default function BookedTicketsClientGrid({ initialBookings }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 🔐 Auth Client Session Hook for Fraud checking
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // const isFraud = user?.isFraud;
  // console.log("User Fraud Status:", isFraud);

  // 🔍 Advanced Filtering: Search + Status Filter Combined
  const filteredBookings = initialBookings.filter(booking => {
    const matchesSearch =
      booking.ticketTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.to?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 🔢 Pagination Calculations
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  // 🎨 Premium Status Mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-[#22C55E] text-white';
      case 'accepted': return 'bg-[#1E3A8A] text-white';
      case 'rejected': return 'bg-[#EF4444] text-white';
      default: return 'bg-[#EAB308] text-zinc-900';
    }
  };

  return (
    <div className="space-y-6 text-left">

      {/* 🛠️ PREMIUM CONTROLS BAR: Ice / Soft Off-white Theme (Fixed Black Box) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-sm">

        {/* Crisp Search Input Box */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search bookings by destination or transport..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-all shadow-inner"
          />
        </div>

        {/* Premium Status Filter Dropdown */}
        <div className="relative min-w-40 flex items-center">
          <span className="absolute left-3.5 pointer-events-none text-slate-400">
            <Filter className="h-3.5 w-3.5" />
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-slate-200 pl-9 pr-8 py-2.5 rounded-xl text-xs font-bold text-[#1E293B] focus:outline-none focus:border-slate-400 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">⏳ Pending</option>
            <option value="accepted">✅ Accepted</option>
            <option value="paid">💵 Paid</option>
            <option value="rejected">❌ Rejected</option>
          </select>
          <div className="absolute right-3.5 pointer-events-none text-slate-400 text-[10px]">
            ▼
          </div>
        </div>

      </div>

      {/* Grid System - Premium Horizontal Row Design with Ice/Soft Light Theme */}
      {filteredBookings.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-12 text-center text-slate-400 font-medium text-sm">
          No matching operational logs discovered.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {currentItems.map((booking) => {
                const dateObj = new Date(booking.departureDateTime);
                const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
                const isTimePassed = dateObj - new Date() <= 0;

                return (
                  <motion.div
                    key={booking._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-slate-50/70 border border-slate-200/60 backdrop-blur-md rounded-[24px] shadow-sm hover:shadow-md overflow-hidden relative group flex flex-col md:flex-row items-stretch md:h-56"
                  >
                    {/* 📸 Left Side: Fixed Proportion Image Frame */}
                    <div className="relative h-48 md:h-auto md:w-[35%] shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-200/60">
                      <Image width={400} height={400}
                        src={booking?.image}
                        alt={booking?.ticketTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      />
                      <span className={`absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm ${getStatusColor(booking?.status)}`}>
                        {booking?.status}
                      </span>
                    </div>

                    {/* 📝 Right Side: Ice Theme Content Panel */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">

                      {/* Top Meta Line: Date */}
                      <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          <span>{formattedDate}</span>
                        </div>
                      </div>

                      {/* Title & Route Hierarchy */}
                      <div className="space-y-1">
                        <h2 className="text-lg md:text-xl font-black text-[#1E293B] tracking-tight leading-tight group-hover:text-[#1E3A8A] transition-colors">
                          {booking?.ticketTitle}
                        </h2>

                        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-bold">
                          <span>{booking?.from}</span>
                          <ArrowRight className="h-3 w-3 text-[#FF6B35] stroke-[2.5]" />
                          <span className="text-[#1E3A8A] font-extrabold">{booking?.to}</span>
                        </div>

                        {/* Tracker Subtitle */}
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium pt-0.5">
                          <span>Qty: {booking.bookingQuantity} Units</span>
                          {booking.status !== 'paid' && booking.status !== 'rejected' && (
                            <>
                              <span>•</span>
                              <TicketCardCountdown targetDate={booking.departureDateTime} status={booking.status} />
                            </>
                          )}
                        </div>
                      </div>

                      {/* Divider Bottom Action Hub */}
                      <div className="border-t border-slate-200/80 pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-auto">

                        {/* Price Details */}
                        <div>
                          <span className="text-[11px] text-slate-400 font-medium block">Total price :</span>
                          <span className="text-lg font-black text-[#1E293B]">
                            ৳{booking.totalPrice.toLocaleString()}
                          </span>
                        </div>

                        {/* Dynamic Action Hub Text & Status Control */}
                        <div className="flex justify-end items-center sm:w-auto max-w-xs md:max-w-md">


                          {booking?.ticketDeleted === true ? (
                            <div className="flex items-center space-x-1.5 text-[#EF4444] font-bold text-[10px] sm:text-[11px] leading-tight bg-red-50/80 px-3 py-2 rounded-xl border border-red-200">
                              <AlertCircle className="h-4 w-4 text-[#EF4444] shrink-0" />
                              <span>Booking Closed (Ticket unavailable)</span>
                            </div>
                          ) : booking.status === 'accepted' ? (


                           booking?.isFraud === true ? (
                              <div className="flex items-start space-x-2 text-[#D97706] bg-amber-50/90 border border-amber-200 p-2.5 rounded-xl text-[11px] font-semibold leading-normal shadow-sm">
                                <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" />
                                <span>
                                  This vendor has been suspended. This ticket is no longer available for payment. Please contact support if you have already paid.
                                </span>
                              </div>
                            ) : (

                              <StripePaymentButton
                                bookingId={booking._id}
                                totalAmount={booking?.totalPrice}
                                ticketTitle={booking?.ticketTitle}
                                isTimePassed={isTimePassed}
                              />
                            )
                          ) : booking.status === 'paid' ? (
                            <div className="flex items-center space-x-1.5 text-white font-black text-xs uppercase tracking-wider bg-[#22C55E] px-3 py-1.5 rounded-xl shadow-sm">
                              <span>Booked</span>
                              <div className="h-3.5 w-3.5 rounded-full bg-white text-[#22C55E] flex items-center justify-center text-[9px] font-black">
                                ✓
                              </div>
                            </div>
                          ) : booking.status === 'rejected' ? (
                            <div className="text-white font-black text-xs uppercase tracking-wider bg-[#EF4444] px-3 py-1.5 rounded-xl">
                              Cancelled
                            </div>
                          ) : (
                            <div className="text-zinc-700 font-black text-[10px] text-center uppercase tracking-wider bg-[#EAB308] px-3 py-1.5 rounded-xl animate-pulse">
                              Awaiting Approval
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Premium Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <span className="text-xs font-medium text-slate-400 text-center sm:text-left">
                Showing <span className="text-[#1E293B] font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-[#1E293B] font-bold">
                  {indexOfLastItem > filteredBookings.length ? filteredBookings.length : indexOfLastItem}
                </span>{' '}
                of <span className="text-[#1E293B] font-bold">{filteredBookings.length}</span> Results
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-white border border-slate-200 rounded-xl transition-all disabled:opacity-30 text-slate-600 hover:border-slate-400"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 text-xs font-bold rounded-xl transition-all ${
                      currentPage === i + 1
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-white border border-slate-200 rounded-xl transition-all disabled:opacity-30 text-slate-600 hover:border-zinc-400"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}