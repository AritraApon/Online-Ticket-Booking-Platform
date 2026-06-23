'use client';

import React, { useState, useTransition, useMemo } from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, Ticket, Radio, Layers, Eye, Ban, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { updateTicketIsAdvertise } from '@/lib/actions/advertise';

export default function ClientAdvertiseView({ initialTickets = [] }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const itemsPerPage = 6;

  // 📊 রিয়েল-টাইম কাউন্টার্স (স্ট্রিং বা বুলিয়ান দুইটাকেই হ্যান্ডেল করবে)
  const totalTicketsCount = tickets.length;

  const currentlyAdvertisedCount = useMemo(() => {
    return tickets.filter(t => t.isAdvertised === true || t.isAdvertised === 'true').length;
  }, [tickets]);

  // 🔍 সার্চ এবং ফিল্টারিং লজিক
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch =
        ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.to?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.vendorName?.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesType = false;
      if (selectedType === 'all') {
        matchesType = true;
      } else if (selectedType === 'advertised') {
        matchesType = ticket.isAdvertised === true || ticket.isAdvertised === 'true';
      } else {
        matchesType = ticket.transportType === selectedType;
      }

      return matchesSearch && matchesType;
    });
  }, [tickets, searchQuery, selectedType]);

  // 🔢 পেজিনেশন ক্যালকুলেশন
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

  // ⚡ HARD LOCKED TOGGLE LOGIC WITH FRAUD FILTER GUARD
  const handleToggleAdvertise = (ticketId, currentStatus, isFraudulent) => {
    // 🚨 ফ্রড হলে কোনোমতেই একশন এক্সিকিউট হবে না
    if (isFraudulent) return;

    const isCurrentlyTrue = currentStatus === true || currentStatus === 'true';
    const targetStatus = !isCurrentlyTrue;

    // যদি অলরেডি ৬টা স্লট ফুল থাকে এবং ইউজার নতুন একটা অন করতে চায়
    if (targetStatus === true && currentlyAdvertisedCount >= 6) {
      setShowLimitModal(true);
      return;
    }

    // ১. অপ্টিমিস্টিক ইউআই আপডেট (সাথে সাথে কাউন্টার এবং টগল চেঞ্জ হবে)
    setTickets(prevTickets =>
      prevTickets.map(t => t._id === ticketId ? { ...t, isAdvertised: targetStatus } : t)
    );

    // ২. সার্ভার ডাটাবেজ সিঙ্ক পাইপলাইন
    startTransition(async () => {
      try {
        const payload = { isAdvertised: targetStatus };
        await updateTicketIsAdvertise(ticketId, payload);
        console.log(`Payload Synchronized Successfully -> Ticket ID: ${ticketId}, Status: ${targetStatus}`);
      } catch (error) {
        console.error("Pipeline breakdown during async transition", error);

        // 🔄 রোলব্যাক মেকানিজম
        setTickets(prevTickets =>
          prevTickets.map(t => t._id === ticketId ? { ...t, isAdvertised: currentStatus } : t)
        );
      }
    });
  };

  return (
    <div className="space-y-8 relative">

      {/* 📊 METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/70 p-5 rounded-[24px] flex items-center justify-between shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Total Database Pool</span>
            <span className="text-3xl font-black text-[#1E293B] block">{totalTicketsCount}</span>
            <span className="text-[10px] text-slate-400 font-medium block">Approved & verified ticket entities</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
            <Layers className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-[24px] text-white flex items-center justify-between shadow-lg relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="text-[10px] font-black uppercase text-[#FF6B35] tracking-widest block">Active Homepage Ad Slots</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black tracking-tight text-white">{currentlyAdvertisedCount}</span>
              <span className="text-sm font-black text-slate-500">/ 6 Slots Allocated</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">Live server injection pipelines active</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-[#FF6B35] z-10">
            <Radio className={`h-5 w-5 ${currentlyAdvertisedCount > 0 ? 'animate-pulse' : ''}`} />
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#FF6B35]/10 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>

      {/* 🔍 SEARCH AND FILTER PANEL */}
      <div className="bg-white border border-slate-200/70 p-4 rounded-[24px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search title, route, or vendor..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#1E293B] focus:outline-none focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <SlidersHorizontal className="h-4 w-4 text-slate-400 hidden sm:block" />
          <select
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
            className="w-full md:w-48 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#1E293B] focus:outline-none transition-all cursor-pointer"
          >
            <option value="all">⚡ All Transport Types</option>
            <option value="advertised">📢 Advertised Only</option>
            <option value="plane">✈️ Plane Routes</option>
            <option value="bus">🚌 Bus Routes</option>
            <option value="train">🚂 Train Routes</option>
          </select>
        </div>
      </div>

      {/* 📋 DATA TABLE */}
      <div className="bg-white border border-slate-200/80 rounded-[24px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-black text-[#1E293B]">Fleet Inventory Grid</h3>
          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
            {filteredTickets.length} MAPS FOUND
          </span>
        </div>

        {currentTickets.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm font-medium">
            No matching admin-approved tickets found in this node.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="py-4 px-6">Ticket Metadata</th>
                    <th className="py-4 px-6">Route Topology</th>
                    <th className="py-4 px-6">Pricing & Slots</th>
                    <th className="py-4 px-6">Vendor Info</th>
                    <th className="py-4 px-6 text-center">Homepage Ad Boost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-semibold">
                  {currentTickets.map((ticket) => {
                    const isTicketAdvertised = ticket.isAdvertised === true || ticket.isAdvertised === 'true';

                    // 🚨 ফ্রড কন্ডিশন চেকিং গেটওয়ে
                    const isFraudulent = ticket.isFraud === true || ticket.isFraud === 'true' || ticket.vendorStatus === 'fraud';

                    const formattedDate = ticket.departureDateTime
                      ? new Date(ticket.departureDateTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                      : 'N/A';

                    return (
                      <tr key={ticket._id} className={`transition-colors group ${isFraudulent ? 'bg-rose-50/20 hover:bg-rose-50/40' : 'hover:bg-slate-50/60'}`}>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="relative h-10 w-14 rounded-lg overflow-hidden border border-slate-200/60 shadow-sm shrink-0">
                              <Image
                                src={ticket.image || "https://i.ibb.co.com/0ztMy9c/image.png"}
                                alt={ticket.title || 'ticket'}
                                fill
                                sizes="(max-width: 80px) 100vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                priority={false}
                              />
                            </div>
                            <div>
                              <span className={`font-black block text-sm ${isFraudulent ? 'text-rose-700 line-through opacity-70' : 'text-[#1E293B]'}`}>
                                {ticket.title}
                              </span>
                              <span className="text-[10px] uppercase text-slate-400 font-black tracking-wider flex items-center mt-0.5">
                                <span className={`h-1.5 w-1.5 rounded-full mr-1 ${isFraudulent ? 'bg-rose-500 animate-pulse' : ticket.transportType === 'plane' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                                {ticket.transportType}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <div className="flex items-center text-slate-700 font-bold">
                              <span>{ticket.from}</span>
                              <span className="text-slate-300 mx-1.5">➔</span>
                              <span className={isFraudulent ? 'text-rose-600' : 'text-[#1E3A8A]'}>{ticket.to}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium block">{formattedDate}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <span className="text-sm font-black text-[#1E293B] block">৳{ticket.pricePerUnit?.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 font-semibold block">{ticket.quantity} Allocations Left</span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <span className={`font-black block ${isFraudulent ? 'text-rose-600' : 'text-[#1E293B]'}`}>
                              {ticket.vendorName} {isFraudulent && '⚠️'}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium block font-mono">{ticket.vendorEmail}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center">
                            {isFraudulent ? (
                              // 🚨 ফ্রড ইউজারদের জন্য স্ট্যাটিক লাল ওয়ার্নিং ব্যাজ (বাটন রিমুভড)
                              <span className="text-rose-600 bg-rose-100 border border-rose-200 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center shadow-sm select-none animate-pulse">
                                <Ban className="h-3 w-3 mr-1 shrink-0" /> Marked Fraud
                              </span>
                            ) : (
                              // ✅ রেগুলার ভ্যালিড ভেন্ডরদের জন্য ওয়ার্কিং টগল বাটন
                              <label className="relative inline-flex items-center cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={isTicketAdvertised}
                                  disabled={isPending}
                                  onChange={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised, isFraudulent)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A8A]"></div>
                                <span className="ml-2.5 text-[10px] font-black uppercase tracking-wider w-14 text-left">
                                  {isTicketAdvertised ? (
                                    <span className="text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded-md flex items-center justify-center">
                                      <Eye className="h-3 w-3 mr-0.5" /> Live
                                    </span>
                                  ) : (
                                    <span className="text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md flex items-center justify-center">
                                      <Ban className="h-3 w-3 mr-0.5" /> Off
                                    </span>
                                  )}
                                </span>
                              </label>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 🛠️ TABLE PAGINATION COMPONENT */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-slate-100 bg-slate-50/50">
                <span className="text-xs font-medium text-slate-400 text-center sm:text-left">
                  Showing <span className="text-[#1E293B] font-bold">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="text-[#1E293B] font-bold">
                    {indexOfLastItem > filteredTickets.length ? filteredTickets.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="text-[#1E293B] font-bold">{filteredTickets.length}</span> Results
                </span>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 text-slate-600 hover:border-slate-400"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`h-8 w-8 text-xs font-bold rounded-xl ${
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
                    className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 text-slate-600 hover:border-slate-400"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 🚨 HARD CAP LIMIT EXCEEDED WARNING MODAL */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
          <div className="bg-white border border-slate-200 w-full max-w-sm rounded-[32px] p-6 shadow-2xl relative text-center space-y-4">
            <button
              onClick={() => setShowLimitModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto h-12 w-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
              <Ticket className="h-6 w-6 stroke-[2]" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-[#1E293B] tracking-tight">Campaign Limit Reached</h4>
              <p className="text-xs text-slate-400 font-medium px-2 leading-relaxed">
                Maximum advertisement capacity reached. You can only feature up to <span className="text-[#1E3A8A] font-bold">6 tickets</span> concurrently on the homepage banner. Please deactivate an existing slot before enabling a new campaign.
              </p>
            </div>

            <button
              onClick={() => setShowLimitModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-all shadow-md"
            >
              Acknowledge Directive
            </button>
          </div>
        </div>
      )}

    </div>
  );
}