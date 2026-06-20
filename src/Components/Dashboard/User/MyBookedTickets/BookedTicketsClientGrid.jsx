'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, ChevronLeft, ChevronRight, Star, ArrowRight, Filter } from 'lucide-react';
import StripePaymentButton from './StripePaymentButton';

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
    <span className={`text-[11px] font-bold ${isPassed ? "text-red-500" : "text-[#FF6B35]"}`}>
      {isPassed ? "Expired" : `Ends in: ${timeLeft}`}
    </span>
  );
}

export default function BookedTicketsClientGrid({ initialBookings }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 💡 New Filter State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // সার্চ বা ফিল্টার চেঞ্জ হলে পেজ ১ নম্বরে রিসেট হবে
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

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

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-emerald-500 text-white';
      case 'accepted': return 'bg-blue-600 text-white';
      case 'rejected': return 'bg-zinc-400 text-white';
      default: return 'bg-amber-500 text-white';
    }
  };

  return (
    <div className="space-y-8 text-left">

      {/* 🛠️ PREMIUM CONTROLS BAR: Mobile Responsive Layout */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 border border-zinc-200/80 rounded-2xl shadow-sm">

        {/* Luxury Search Input Box */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400" />
          </span>
          <input
            type="text"
            placeholder="Search bookings by destination or train..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium text-zinc-800 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
          />
        </div>

        {/* ⚡ Premium Status Filter Dropdown */}
        <div className="relative min-w-[160px] flex items-center">
          <span className="absolute left-3.5 pointer-events-none text-zinc-400">
            <Filter className="h-3.5 w-3.5" />
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 pl-9 pr-8 py-2.5 rounded-xl text-xs font-bold text-zinc-700 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">⏳ Pending</option>
            <option value="accepted">✅ Accepted</option>
            <option value="paid">💵 Paid</option>
            <option value="rejected">❌ Rejected</option>
          </select>
          {/* Custom Arrow for Select dropdown */}
          <div className="absolute right-3.5 pointer-events-none text-zinc-400 text-[10px]">
            ▼
          </div>
        </div>

      </div>

      {/* Grid System */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-[24px] p-12 text-center text-zinc-400 font-medium text-sm">
          No matching operational logs discovered.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-white border border-zinc-200/80 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
                  >
                    {/* 📸 Image Frame */}
                    <div className="relative h-52 w-full overflow-hidden shrink-0">
                      <img
                        src={booking?.image}
                        alt={booking?.ticketTitle}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm ${getStatusColor(booking?.status)}`}>
                        {booking?.status}
                      </span>
                    </div>

                    {/* 📝 Card Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">

                      {/* Top Meta Line: Date & Stars */}
                      <div className="flex items-center justify-between text-xs text-zinc-400 font-bold">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                          <span>{formattedDate}</span>
                        </div>
                        <div className="flex space-x-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Title & Route Hierarchy */}
                      <div className="space-y-1.5">
                        <h2 className="text-xl font-black text-zinc-800 tracking-tight leading-tight group-hover:text-[#1E3A8A] transition-colors">
                          {booking?.ticketTitle}
                        </h2>

                        <div className="flex items-center space-x-1.5 text-xs text-zinc-500 font-bold">
                          <span>{booking?.from}</span>
                          <ArrowRight className="h-3 w-3 text-[#FF6B35] stroke-[2.5]" />
                          <span className="text-[#1E3A8A] font-extrabold">{booking?.to}</span>
                        </div>

                        {/* Tracker Subtitle */}
                        <div className="flex items-center space-x-2 text-[11px] text-zinc-400 font-medium pt-1">
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
                      <div className="border-t border-zinc-100 pt-4 flex items-center justify-between mt-auto">

                        {/* Price Details */}
                        <div>
                          <span className="text-[11px] text-zinc-400 font-medium block">Total price :</span>
                          <span className="text-lg font-black text-zinc-800">
                            ৳{booking.totalPrice.toLocaleString()}
                          </span>
                        </div>

                        {/* Dynamic Action Hub Text & Status Control */}
                        <div className="w-1/2 flex justify-end">
                          {booking.status === 'accepted' ? (
                            <StripePaymentButton
                              bookingId={booking._id}
                              totalAmount={booking.totalPrice}
                              isTimePassed={isTimePassed}
                            />
                          ) : booking.status === 'paid' ? (
                            <div className="flex items-center space-x-1.5 text-emerald-600 font-black text-xs uppercase tracking-wider bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-100">
                              <span>Booked</span>
                              <div className="h-4 w-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black">
                                ✓
                              </div>
                            </div>
                          ) : booking.status === 'rejected' ? (
                            <div className="text-red-400 font-black text-xs uppercase tracking-wider bg-zinc-50 px-2.5 py-1.5 rounded-xl border border-zinc-200">
                              Cancelled
                            </div>
                          ) : (
                            <div className="text-amber-600 font-black text-[10px] text-center uppercase tracking-wider bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-100 animate-pulse">
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200">
              <span className="text-xs font-medium text-zinc-400 text-center sm:text-left">
                Showing <span className="text-zinc-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-zinc-800 font-bold">
                  {indexOfLastItem > filteredBookings.length ? filteredBookings.length : indexOfLastItem}
                </span>{' '}
                of <span className="text-zinc-800 font-bold">{filteredBookings.length}</span> Results
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-white border border-zinc-200 rounded-xl transition-all disabled:opacity-30 text-zinc-600 hover:border-zinc-400"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 text-xs font-bold rounded-xl transition-all ${
                      currentPage === i + 1
                        ? 'bg-zinc-900 text-white'
                        : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-white border border-zinc-200 rounded-xl transition-all disabled:opacity-30 text-zinc-600 hover:border-zinc-400"
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