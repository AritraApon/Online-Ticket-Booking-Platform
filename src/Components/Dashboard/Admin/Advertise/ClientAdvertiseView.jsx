'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, Ticket, Radio, Layers, Eye, Ban, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { updateTicketIsAdvertise } from '@/lib/actions/advertise';

export default function ClientAdvertiseView({ initialTickets }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const itemsPerPage = 6; // প্রতি পেজে ৬টি করে ডাটা

  // 📊 রিয়েল-টাইম কাউন্টার্স ক্যালকুলেশন
  const totalTicketsCount = tickets.length;
  const currentlyAdvertisedCount = tickets.filter(t => t.isAdvertised).length;

  // 🔍 সার্চ এবং অ্যাডভান্সড ফিল্টারিং লজিক
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.to?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.vendorName?.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesType = false;
    if (selectedType === 'all') {
      matchesType = true;
    } else if (selectedType === 'advertised') {
      matchesType = ticket.isAdvertised === true;
    } else {
      matchesType = ticket.transportType === selectedType;
    }

    return matchesSearch && matchesType;
  });

  // 🔢 টেবিল পেজিনেশন ক্যালকুলেশন
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

  // ⚡ HARD LOCKED TOGGLE LOGIC WITH RECENT INTEGRATION FIXES
  const handleToggleAdvertise = (ticketId, currentStatus) => {
    const targetStatus = !currentStatus;

    // যদি স্লট ৬ টা ফুল থাকে এবং অ্যাডমিন ৭ নাম্বারটা অন করতে চায়
    if (targetStatus === true && currentlyAdvertisedCount >= 6) {
      setShowLimitModal(true);
      return;
    }

    // ১. অপ্টিমিস্টিক ইউআই আপডেট (সাথে সাথে বাটন চেঞ্জ হবে)
    setTickets(prevTickets =>
      prevTickets.map(t => t._id === ticketId ? { ...t, isAdvertised: targetStatus } : t)
    );

    // ২. সার্ভার ডাটাবেজ সিঙ্ক পাইপলাইন
    startTransition(async () => {
      try {
        const payload = { isAdvertised: targetStatus };

        // অ্যাকশন ফাইল থেকে ইনজেক্টেড মেথড কল
        await updateTicketIsAdvertise(ticketId, payload);

        console.log(`Payload Synchronized Successfully -> Ticket ID: ${ticketId}, Target Status: ${targetStatus}`);
      } catch (error) {
        console.error("Pipeline breakdown during async transition", error);

        // 🔄 রোলব্যাক মেকানিজম (রিকোয়েস্ট ফেইল করলে ইউআই আগের জায়গায় ব্যাক করবে)
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
        <div className="bg-white border border-slate-200/70 p-5 rounded-[24px] flex items-center justify-between shadow-sm hover:shadow-md transition-all">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Total Database Pool</span>
            <span className="text-3xl font-black text-[#1E293B] tracking-tight block">{totalTicketsCount}</span>
            <span className="text-[10px] text-slate-400 font-medium block">Approved & verified ticket entities</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shadow-inner">
            <Layers className="h-5 w-5 stroke-[2]" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-[24px] text-white flex items-center justify-between shadow-lg relative overflow-hidden group">
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
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#1E3A8A] transition-colors" />
          <input
            type="text"
            placeholder="Search title, route, or vendor..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#1E293B] focus:outline-none focus:border-slate-400 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <SlidersHorizontal className="h-4 w-4 text-slate-400 hidden sm:block" />
          <select
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
            className="w-full md:w-48 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#1E293B] focus:outline-none focus:border-slate-400 transition-all cursor-pointer"
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
                    const formattedDate = new Date(ticket.departureDateTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

                    return (
                      <tr key={ticket._id} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="relative h-10 w-14 rounded-lg overflow-hidden border border-slate-200/60 shadow-sm shrink-0">
                              <Image
                                src={ticket.image || "https://i.ibb.co.com/0ztMy9c/image.png"}
                                alt={ticket.title}
                                fill
                                sizes="(max-width: 80px) 100vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                priority={false}
                              />
                            </div>
                            <div>
                              <span className="font-black text-[#1E293B] block text-sm">{ticket.title}</span>
                              <span className="text-[10px] uppercase text-slate-400 font-black tracking-wider flex items-center mt-0.5">
                                <span className={`h-1.5 w-1.5 rounded-full mr-1 ${ticket.transportType === 'plane' ? 'bg-blue-500' : 'bg-amber-500'}`} />
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
                              <span className="text-[#1E3A8A]">{ticket.to}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium block">{formattedDate}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <span className="text-sm font-black text-[#1E293B] block">৳{ticket.pricePerUnit.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 font-semibold block">{ticket.quantity} Allocations Left</span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <span className="font-black text-[#1E293B] block">{ticket.vendorName}</span>
                            <span className="text-[10px] text-slate-400 font-medium block font-mono">{ticket.vendorEmail}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <label className="relative inline-flex items-center cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={ticket.isAdvertised || false}
                                onChange={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A8A]"></div>
                              <span className="ml-2.5 text-[10px] font-black uppercase tracking-wider w-14 text-left">
                                {ticket.isAdvertised ? (
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
                    className="p-2 bg-white border border-slate-200 rounded-xl transition-all disabled:opacity-30 text-slate-600 hover:border-slate-400"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-sm rounded-[32px] p-6 shadow-2xl relative text-center space-y-4 animate-scale-up">
            <button
              onClick={() => setShowLimitModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
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