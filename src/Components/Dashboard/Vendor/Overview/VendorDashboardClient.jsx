'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Home, PlusCircle, Layers, FolderCheck, DollarSign,
  ArrowUpRight, Ticket, CheckCircle2, AlertCircle, XCircle,
  ChevronLeft, ChevronRight, TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

export default function VendorDashboardClient({ user, tickets = [], bookings = [], revenueData = [] }) {

  // 🛡️ Safe Data Normalizer: ডাটা অবজেক্ট বা অ্যারে যেভাবে আসুক এক্সট্রাক্ট করে নেবে
  const resolvedTickets = useMemo(() => {
    if (Array.isArray(tickets)) return tickets;
    if (tickets && typeof tickets === 'object') {
      const possibleArray = tickets.tickets || tickets.data || tickets.result || Object.values(tickets).find(val => Array.isArray(val));
      if (Array.isArray(possibleArray)) return possibleArray;
    }
    return [];
  }, [tickets]);

  const resolvedBookings = useMemo(() => {
    if (Array.isArray(bookings)) return bookings;
    if (bookings && typeof bookings === 'object') {
      const possibleArray = bookings.bookings || bookings.data || bookings.result || Object.values(bookings).find(val => Array.isArray(val));
      if (Array.isArray(possibleArray)) return possibleArray;
    }
    return [];
  }, [bookings]);

  // Tables Pagination States
  const [ticketPage, setTicketPage] = useState(1);
  const [bookingPage, setBookingPage] = useState(1);
  const itemsPerPage = 5;

  // 📊 1. TICKETS METRICS & CALCULATION (Case-Insensitive Fix)
  const ticketStats = useMemo(() => {
    const all = resolvedTickets.length;
    const pending = resolvedTickets.filter(t => {
      const status = (t?.verificationStatus || '').trim().toLowerCase();
      return status === 'pending';
    }).length;

    const approved = resolvedTickets.filter(t => {
      const status = (t?.verificationStatus || '').trim().toLowerCase();
      return status === 'approved' || status === 'active';
    }).length;

    const rejected = resolvedTickets.filter(t => {
      const status = (t?.verificationStatus || '').trim().toLowerCase();
      return status === 'rejected';
    }).length;

    return { all, pending, approved, rejected };
  }, [resolvedTickets]);

  // 📊 2. BOOKINGS METRICS & CALCULATION (Case-Insensitive Fix)
  const bookingStats = useMemo(() => {
    const all = resolvedBookings.length;
    const paid = resolvedBookings.filter(b => (b?.status || '').trim().toLowerCase() === 'paid').length;
    const pending = resolvedBookings.filter(b => (b?.status || '').trim().toLowerCase() === 'pending').length;
    const rejected = resolvedBookings.filter(b => (b?.status || '').trim().toLowerCase() === 'rejected').length;

    return { all, paid, pending, rejected };
  }, [resolvedBookings]);

  // 📊 3. REVENUE SUMMARY
  const revenueStats = useMemo(() => {
    const totalTicketsAdded = resolvedTickets.length;
    const totalTicketsSold = resolvedBookings.filter(b => (b?.status || '').trim().toLowerCase() === 'paid').reduce((sum, b) => sum + (b.bookingQuantity || 0), 0);
    const totalRev = resolvedBookings.filter(b => (b?.status || '').trim().toLowerCase() === 'paid').reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const paidCount = resolvedBookings.filter(b => (b?.status || '').trim().toLowerCase() === 'paid').length;
    return { totalTicketsAdded, totalTicketsSold, totalRev, paidCount };
  }, [resolvedTickets, resolvedBookings]);

  // Pagination Slicing
  const currentTickets = resolvedTickets.slice((ticketPage - 1) * itemsPerPage, ticketPage * itemsPerPage);
  const currentBookings = resolvedBookings.slice((bookingPage - 1) * itemsPerPage, bookingPage * itemsPerPage);

  // Recharts Data Pipeline
  const chartData = useMemo(() => {
    return [
      { name: 'Jan', Sales: 4000, Revenue: 2400 },
      { name: 'Feb', Sales: 3000, Revenue: 1398 },
      { name: 'Mar', Sales: 2000, Revenue: 9800 },
      { name: 'Apr', Sales: 2780, Revenue: 3908 },
      { name: 'May', Sales: 1890, Revenue: 4800 },
      { name: 'Jun', Sales: revenueStats.totalRev || 2390, Revenue: revenueStats.totalRev || 3800 },
    ];
  }, [revenueStats]);

  const pieData = useMemo(() => {
    return [
      { name: 'Approved', value: ticketStats.approved || 0, color: '#22C55E' },
      { name: 'Pending', value: ticketStats.pending || 0, color: '#EAB308' },
      { name: 'Rejected', value: ticketStats.rejected || 0, color: '#EF4444' },
    ].filter(i => i.value > 0);
  }, [ticketStats]);

  const dynamicPieData = pieData.length > 0 ? pieData : [{ name: 'No Data', value: 1, color: '#CBD5E1' }];

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">

      {/* 🌟 PREMIUM WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[32px] border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <span className="text-[11px] font-black uppercase text-[#FF6B35] tracking-widest block">Operational Node</span>
          <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] tracking-tight">
            Welcome back, <span className="text-[#1E3A8A]">{user?.name || 'Premium Vendor'}</span> 👋
          </h1>
          <p className="text-xs text-slate-400 font-semibold">Monitor your transport inventory, fleet grids, and continuous injection revenue pipelines.</p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <Link href="/" className="flex items-center px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-sm">
            <Home className="h-4 w-4 mr-1.5" /> Back Home
          </Link>
          <Link href="/dashboard/vendor/add-ticket" className="flex items-center px-4 py-2.5 bg-[#FF6B35] hover:bg-[#e05626] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#FF6B35]/20">
            <PlusCircle className="h-4 w-4 mr-1.5" /> Add New Ticket
          </Link>
        </div>
        <div className="absolute right-0 top-0 w-40 h-40 bg-[#1E3A8A]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ================= SECTION 1: ADD TICKETS OVERVIEW ================= */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-[#1E3A8A]" />
            <h2 className="text-lg font-black text-[#1E293B] tracking-tight">Fleet Inventory Metrics</h2>
          </div>
          <Link href="/dashboard/vendor/my-tickets" className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center">
            Manage Inventory <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
          </Link>
        </div>

        {/* METRICS CARDS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'All Fleet Tickets', count: ticketStats.all, color: 'text-slate-800 bg-slate-100 border-slate-200', icon: Ticket },
            { title: 'Approved Fleet', count: ticketStats.approved, color: 'text-green-700 bg-green-50 border-green-100', icon: CheckCircle2 },
            { title: 'Pending Audit', count: ticketStats.pending, color: 'text-amber-700 bg-amber-50 border-amber-100', icon: AlertCircle },
            { title: 'Rejected Nodes', count: ticketStats.rejected, color: 'text-red-700 bg-red-50 border-red-100', icon: XCircle },
          ].map((card, idx) => (
            <div key={idx} className="bg-white border p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">{card.title}</span>
                <card.icon className={`h-4 w-4 ${card.color.split(' ')[0]}`} />
              </div>
              <span className={`text-2xl font-black ${card.color.split(' ')[0]}`}>{card.count}</span>
            </div>
          ))}
        </div>

        {/* TABLE & CHART BOX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-5">Ticket Title</th>
                    <th className="py-3 px-5">Route</th>
                    <th className="py-3 px-5">Price</th>
                    <th className="py-3 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                  {currentTickets.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-slate-400">No tickets found. Add your first ticket above!</td></tr>
                  ) : currentTickets.map((t, idx) => {
                    const statusText = (t?.status || 'PENDING').trim().toUpperCase();
                    return (
                      <tr key={t?._id || idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-slate-800">{t?.ticketTitle || t?.title}</td>
                        <td className="py-3.5 px-5">{t?.from} ➔ {t?.to}</td>
                        <td className="py-3.5 px-5">৳{t?.pricePerUnit || t?.price || t?.totalPrice}</td>
                        <td className="py-3.5 px-5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            statusText === 'APPROVED' || statusText === 'ACTIVE' ? 'bg-green-100 text-green-700' : statusText === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                          }`}>{statusText}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            {resolvedTickets.length > itemsPerPage && (
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <button disabled={ticketPage === 1} onClick={() => setTicketPage(p => p - 1)} className="p-1.5 bg-white border rounded-lg disabled:opacity-40 hover:bg-slate-50"><ChevronLeft className="h-4 w-4" /></button>
                <span className="text-[11px] font-bold text-slate-500">Page {ticketPage} of {Math.ceil(resolvedTickets.length / itemsPerPage)}</span>
                <button disabled={ticketPage >= Math.ceil(resolvedTickets.length / itemsPerPage)} onClick={() => setTicketPage(p => p + 1)} className="p-1.5 bg-white border rounded-lg disabled:opacity-40 hover:bg-slate-50"><ChevronRight className="h-4 w-4" /></button>
              </div>
            )}
          </div>

          {/* Pie Chart */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between items-center min-h-[220px]">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider w-full text-left mb-2">Fleet Composition</span>
            <div className="w-full h-36 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dynamicPieData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={4} dataKey="value">
                    {dynamicPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 text-[10px] font-bold">
              {pieData.length > 0 ? pieData.map((item, idx) => (
                <div key={idx} className="flex items-center"><span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: item.color }} /> {item.name}</div>
              )) : <div className="text-slate-400">No Fleet Active</div>}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: REQUESTED BOOKINGS OVERVIEW ================= */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderCheck className="h-5 w-5 text-[#FF6B35]" />
            <h2 className="text-lg font-black text-[#1E293B] tracking-tight">Booking Pipeline Orders</h2>
          </div>
          <Link href="/dashboard/vendor/bookings" className="text-xs font-bold text-[#FF6B35] hover:underline flex items-center">
            All Realtime Bookings <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
          </Link>
        </div>

        {/* BOOKING CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Booking Requests', count: bookingStats.all, color: 'text-slate-800 bg-slate-100 border-slate-200' },
            { title: 'Settled / Paid Tickets', count: bookingStats.paid, color: 'text-green-700 bg-green-50 border-green-100' },
            { title: 'Awaiting Settlement', count: bookingStats.pending, color: 'text-amber-700 bg-amber-50 border-amber-100' },
            { title: 'Declined Injections', count: bookingStats.rejected, color: 'text-red-700 bg-red-50 border-red-100' },
          ].map((card, idx) => (
            <div key={idx} className="bg-white border p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">{card.title}</span>
              <span className={`text-2xl font-black ${card.color.split(' ')[0]}`}>{card.count}</span>
            </div>
          ))}
        </div>

        {/* BOOKING TABLE AND BAR CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-5">Passenger / Route</th>
                    <th className="py-3 px-5">Fleet</th>
                    <th className="py-3 px-5">Qty</th>
                    <th className="py-3 px-5">Amount</th>
                    <th className="py-3 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                  {currentBookings.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-400">No booking requests available in this node pool.</td></tr>
                  ) : currentBookings.map((b, idx) => {
                    const currentBookStatus = (b?.status || 'PENDING').trim().toUpperCase();
                    return (
                      <tr key={b?._id || idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-5">
                          <span className="font-bold text-slate-800 block">{b?.userName || 'Unknown'}</span>
                          <span className="text-[10px] text-slate-400 block">{b?.from} ➔ {b?.to}</span>
                        </td>
                        <td className="py-3.5 px-5 font-bold text-[#1E3A8A]">{b?.ticketTitle}</td>
                        <td className="py-3.5 px-5 font-mono">{b?.bookingQuantity}</td>
                        <td className="py-3.5 px-5 font-black text-slate-800">৳{b?.totalPrice?.toLocaleString()}</td>
                        <td className="py-3.5 px-5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            currentBookStatus === 'PAID' ? 'bg-green-100 text-green-700' : currentBookStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                          }`}>{currentBookStatus}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {resolvedBookings.length > itemsPerPage && (
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <button disabled={bookingPage === 1} onClick={() => setBookingPage(p => p - 1)} className="p-1.5 bg-white border rounded-lg disabled:opacity-40 hover:bg-slate-50"><ChevronLeft className="h-4 w-4" /></button>
                <span className="text-[11px] font-bold text-slate-500">Page {bookingPage} of {Math.ceil(resolvedBookings.length / itemsPerPage)}</span>
                <button disabled={bookingPage >= Math.ceil(resolvedBookings.length / itemsPerPage)} onClick={() => setBookingPage(p => p + 1)} className="p-1.5 bg-white border rounded-lg disabled:opacity-40 hover:bg-slate-50"><ChevronRight className="h-4 w-4" /></button>
              </div>
            )}
          </div>

          {/* Bar Chart */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center"><TrendingUp className="h-3 w-3 mr-1 text-[#FF6B35]" /> Booking Velocity</span>
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="Sales" fill="#FF6B35" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 3: REVENUE OVERVIEW & AREA CHART ================= */}
      <div className="space-y-5">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-black text-[#1E293B] tracking-tight">Financial Injection & Ledger Overview</h2>
        </div>

        {/* FINANCIAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Total Fleet Pool</span>
            <span className="text-2xl font-black text-slate-800 block">{revenueStats.totalTicketsAdded} <span className="text-xs text-slate-400 font-normal">Entities</span></span>
          </div>
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Total Allocations Sold</span>
            <span className="text-2xl font-black text-[#1E3A8A] block">{revenueStats.totalTicketsSold} <span className="text-xs text-slate-400 font-normal">Seats</span></span>
          </div>
          <div className="bg-[#1E293B] text-white p-5 rounded-2xl shadow-md space-y-2 relative overflow-hidden">
            <span className="text-[10px] font-black uppercase text-green-400 tracking-wider block">Gross Vault Revenue</span>
            <span className="text-2xl font-black block">৳{revenueStats.totalRev?.toLocaleString()}</span>
            <div className="absolute right-2 bottom-2 opacity-5"><DollarSign className="h-16 w-16" /></div>
          </div>
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Paid Checkout Sessions</span>
            <span className="text-2xl font-black text-green-600 block">{revenueStats.paidCount} <span className="text-xs text-slate-400 font-normal">Invoices</span></span>
          </div>
        </div>

        {/* HIGH-END AREA STACKED CHART */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm">
          <div className="mb-4">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Gross Revenue Scalability Chart</h4>
            <span className="text-[10px] text-slate-400 font-medium">Real-time telemetry analysis of incoming customer transactions.</span>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="Revenue" stroke="#22C55E" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}