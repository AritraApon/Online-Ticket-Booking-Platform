'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight, Hourglass, CheckCircle2, XCircle } from 'lucide-react';
import { updateBookingStatus } from '@/lib/actions/bookingStatus';
import { toast } from 'react-toastify';

export default function RequestedBookingsClient({ initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, booking: null });
  const [isUpdating, setIsUpdating] = useState(false);

  
  const totalPending = bookings.filter(b => b.status === 'pending').length;
  const totalAccepted = bookings.filter(b => b.status === 'accepted').length;
  const totalRejected = bookings.filter(b => b.status === 'rejected').length;

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.ticketTitle?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const openConfirmationModal = (booking, type) => {
    setModalConfig({ isOpen: true, type, booking });
  };

  const handleStatusUpdate = async () => {
    const { booking, type } = modalConfig;
    if (!booking) return;

    const targetStatus = type === 'accept' ? 'accepted' : 'rejected';

    setIsUpdating(true);

    try {
      const res = await updateBookingStatus(booking._id, { status: targetStatus });

      if (res?.modifiedCount > 0) {
        toast.success(`Booking successfully ${targetStatus}!`);

        // 🔄 স্টেট আপডেট (সাথে সাথে কাউন্টারও আপডেট হবে)
        setBookings(prev =>
          prev.map(b => b._id === booking._id ? { ...b, status: targetStatus } : b)
        );
      } else {
        toast.info("No changes were made or already updated.");
      }

      setModalConfig({ isOpen: false, type: null, booking: null });
    } catch (error) {
      console.error("MongoDB update failed:", error);
      toast.error("Failed to update status on database. Try again!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-1">

      {/* ==================== 📊 PREMIUM COUNTER CARDS (NEW) ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pending Card */}
        <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200/60 p-4 rounded-2xl shadow-xs flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest uppercase text-amber-600/80">Pending Requests</p>
            <h3 className="text-2xl font-black text-zinc-900">{totalPending}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
            <Hourglass className="h-5 w-5 animate-pulse" />
          </div>
        </div>

        {/* Accepted Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200/60 p-4 rounded-2xl shadow-xs flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest uppercase text-emerald-600/80">Approved Bookings</p>
            <h3 className="text-2xl font-black text-zinc-900">{totalAccepted}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        {/* Rejected Card */}
        <div className="bg-gradient-to-br from-red-50 to-white border border-red-200/60 p-4 rounded-2xl shadow-xs flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest uppercase text-red-500/80">Rejected Logs</p>
            <h3 className="text-2xl font-black text-zinc-900">{totalRejected}</h3>
          </div>
          <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
            <XCircle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ==================== 🛠️ SEARCH & FILTER CONTROLS (RE-STYLED) ==================== */}
      <div className="bg-white p-4 border border-zinc-200 rounded-2xl shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-all hover:border-zinc-300">
        <div className="relative flex-1 group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search passenger name, email, or ticket title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-50/50 border border-zinc-200 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:flex-initial min-w-[160px] flex items-center group">
            <span className="absolute left-3.5 pointer-events-none text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
              <Filter className="h-3.5 w-3.5" />
            </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-zinc-50/50 border border-zinc-200 pl-9 pr-10 py-2.5 rounded-xl text-xs font-black text-zinc-700 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all appearance-none cursor-pointer"
            >
              <option value="all">📊 All Statuses</option>
              <option value="pending">⏳ Pending</option>
              <option value="accepted">✅ Accepted</option>
              <option value="rejected">❌ Rejected</option>
            </select>
            <div className="absolute right-3.5 pointer-events-none text-zinc-400 text-[10px] font-bold group-hover:text-zinc-600 transition-colors">▼</div>
          </div>
        </div>
      </div>

      {/* ==================== 📋 PREMIUM MATRIX TABLE ==================== */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-400 font-bold text-xs uppercase tracking-widest">
          No requested reservation logs found.
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-xs overflow-hidden">

          {/* Desktop Matrix Layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-black tracking-widest uppercase text-zinc-400">
                  <th className="p-4 pl-6">User Name / Email</th>
                  <th className="p-4">Ticket Title</th>
                  <th className="p-4 text-center">Booking Quantity</th>
                  <th className="p-4">Total Price</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700 font-medium">
                {currentItems.map((booking) => (
                  <tr key={booking._id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-extrabold text-zinc-900">{booking.userName}</div>
                      <div className="text-[11px] text-zinc-400 font-semibold mt-0.5">{booking.userEmail}</div>
                    </td>

                    <td className="p-4 font-extrabold text-[#1E3A8A]">
                      {booking.ticketTitle}
                    </td>

                    <td className="p-4 text-center font-black text-zinc-600">
                      {booking.bookingQuantity} Units
                    </td>

                    <td className="p-4 font-black text-zinc-900">
                      ৳{booking.totalPrice.toLocaleString()}
                    </td>

                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                        booking.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                        booking.status === 'rejected' ? 'bg-red-50 text-red-500 border border-red-200' :
                        'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        {booking.status}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openConfirmationModal(booking, 'accept')}
                          disabled={booking.status === 'accepted'}
                          className={`px-3 py-1.5 font-black text-[10px] uppercase tracking-wide rounded-lg transition-all ${
                            booking.status === 'accepted'
                              ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-50'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                          }`}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => openConfirmationModal(booking, 'reject')}
                          disabled={booking.status === 'rejected'}
                          className={`px-3 py-1.5 font-black text-[10px] uppercase tracking-wide rounded-lg transition-all ${
                            booking.status === 'rejected'
                              ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-50'
                              : 'bg-white border border-red-200 text-red-600 hover:bg-red-50'
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ==================== 📱 RESPONSIVE CARD VIEW ==================== */}
          <div className="block md:hidden divide-y divide-zinc-200">
            {currentItems.map((booking) => (
              <div key={booking._id} className="p-5 space-y-3 bg-white text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-black text-[#1E3A8A]">{booking.ticketTitle}</h3>
                    <p className="text-zinc-800 font-extrabold mt-1">{booking.userName}</p>
                    <p className="text-zinc-400 font-semibold text-[11px]">{booking.userEmail}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider ${
                    booking.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                    booking.status === 'rejected' ? 'bg-red-50 text-red-500' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100 text-[11px]">
                  <div>
                    <span className="text-zinc-400 block font-bold text-[9px] uppercase">Quantity</span>
                    <span className="font-extrabold text-zinc-700">{booking.bookingQuantity} Units</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block font-bold text-[9px] uppercase">Total Price</span>
                    <span className="font-black text-zinc-900">৳{booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => openConfirmationModal(booking, 'accept')}
                    disabled={booking.status === 'accepted'}
                    className="w-full py-2 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl disabled:opacity-40"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => openConfirmationModal(booking, 'reject')}
                    disabled={booking.status === 'rejected'}
                    className="w-full py-2 bg-white border border-zinc-200 text-red-500 font-black text-xs uppercase tracking-widest rounded-xl disabled:opacity-40"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ==================== 🔢 PREMIUM PAGINATION ENGINE ==================== */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-zinc-200 bg-zinc-50/50">
              <span className="text-xs font-semibold text-zinc-400 text-center sm:text-left">
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

        </div>
      )}

      {/* ==================== 🪟 TOGGLE ACTION CONFIRMATION MODAL ==================== */}
      <AnimatePresence>
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isUpdating && setModalConfig({ isOpen: false, type: null, booking: null })}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border-2 border-zinc-900 p-6 rounded-2xl w-full max-w-sm relative z-10 shadow-xl space-y-4 text-center"
            >
              <div className="flex justify-center">
                {modalConfig.type === 'accept' ? (
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                ) : (
                  <div className="p-3 bg-red-50 text-red-500 rounded-full border border-red-100">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight">
                  {modalConfig.type === 'accept' ? 'Execute Approval' : 'Execute Rejection'}
                </h3>
                <p className="text-xs text-zinc-500 font-medium mt-2">
                  Are you absolutely certain you want to toggle the status to <strong className="uppercase">{modalConfig.type === 'accept' ? 'accepted' : 'rejected'}</strong> for{' '}
                  <strong className="text-zinc-800 font-bold">{modalConfig.booking?.ticketTitle}</strong>?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => setModalConfig({ isOpen: false, type: null, booking: null })}
                  className="py-2.5 bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 text-zinc-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={handleStatusUpdate}
                  className={`py-2.5 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs ${
                    modalConfig.type === 'accept'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-red-500 hover:bg-red-600'
                  } disabled:opacity-50`}
                >
                  {isUpdating ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}