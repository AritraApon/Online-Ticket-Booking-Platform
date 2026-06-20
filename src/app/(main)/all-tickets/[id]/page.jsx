import TicketDetailsClient from '@/Components/Main/DetailsCard/TicketDetailsClient';
import { getTicketDetails } from '@/lib/api/allTickets';

import React from 'react';

const TicketDetailsPage = async ({ params }) => {
  const { id } = await params;

  // Fetch single ticket server data
  const ticket = await getTicketDetails(id);

  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">
          Ticket network data not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Pass fetched data to dynamic client element */}
        <TicketDetailsClient ticket={ticket} />
      </div>
    </div>
  );
};

export default TicketDetailsPage;