import TicketsClientController from '@/Components/Main/AllTicketCard/TicketsClientController';
import { getAllTickets } from '@/lib/api/allTickets';
import { Ticket } from 'lucide-react';
import React from 'react';

const AllTickets = async () => {
  // 🟢 BACKEND CONNECTIVITY NODE: Server parameters database interpolation line dynamic page fetch template
  const tickets = (await getAllTickets()) || [];

  // Filtration Node: Only admin-approved tokens validation filter pass
  const approvedTickets = tickets.filter(ticket => ticket.verificationStatus === 'approved');

  return (
    // 🤍 Clean Light Layout Enforced: Stark bright off-white premium base template
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased p-4 sm:p-8 selection:bg-[#FF6B35]/10">
      <div className="max-w-7xl mx-auto space-y-8 text-left">

        {/* Premium Minimal Stark Top Banner Section */}
        <div className="relative overflow-hidden bg-white border border-zinc-200 p-6 sm:p-8 rounded-[24px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">

          <div className="flex items-center space-x-4 relative z-10">
            {/* High Contrast Deep Navy Vector Node Box */}
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

          {/* Clean Metric Status Counter Block */}
          <div className="bg-zinc-50 border border-zinc-200 px-5 py-3 rounded-xl self-start md:self-auto shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Active Clearances</span>
            <span className="text-xl font-black text-[#1E3A8A]">
              {approvedTickets.length} Nodes Mapped
            </span>
          </div>

        </div>

        {/* Master Controller Interactive System Client Node */}
        <TicketsClientController fallbackTickets={approvedTickets} />

      </div>
    </div>
  );
};

export default AllTickets;