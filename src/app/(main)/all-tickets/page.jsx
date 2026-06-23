import TicketsClientController from '@/Components/Main/AllTicketCard/TicketsClientController';
import { getAllTickets } from '@/lib/api/allTickets';
import { Ticket } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: "TicketBari- All-Tickets",
  description: "Online ticket booking platform",
};
const AllTickets = async ({ searchParams }) => {
  const params = await searchParams; // Next.js 15+ এ await লাগে

  const data = await getAllTickets(params);
  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;
  const totalCount = data?.totalCount || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased p-4 sm:p-8 selection:bg-[#FF6B35]/10">
      <div className="max-w-7xl mx-auto space-y-8 text-left">

        <div className="relative overflow-hidden bg-white border border-zinc-200 p-6 sm:p-8 rounded-[24px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 relative z-10">
            <div className="p-3.5 bg-[#1E3A8A] rounded-xl shadow-sm text-[#FF6B35]">
              <Ticket className="h-6 w-6 shrink-0" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
                Global Transit Fleet
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">
                Explore authenticated corridors, direct line networks, and seat assets live.
              </p>
            </div>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 px-5 py-3 rounded-xl self-start md:self-auto shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Active Clearances</span>
            <span className="text-xl font-black text-[#1E3A8A]">
              {totalCount} Nodes Mapped
            </span>
          </div>
        </div>

        <TicketsClientController
          tickets={tickets}
          totalPages={totalPages}
          currentPage={currentPage}
        />

      </div>
    </div>
  );
};

export default AllTickets;