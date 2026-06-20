import BookedTicketsClientGrid from '@/Components/Dashboard/User/MyBookedTickets/BookedTicketsClientGrid';
import { getUserBookedTickets } from '@/lib/api/userBookingTickets';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';


const BookedTicketsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  const userId = user?.id;

  // Fetch from MongoDB via API
  const bookedTickets = userId ? (await getUserBookedTickets(userId)) || [] : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Banner */}
        <div className="bg-white border border-zinc-200 p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <h1 className="text-2xl font-black text-zinc-900 tracking-tight">My <span className='text-orange-600'>Booked Tickets</span></h1>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">
              Monitor reservation cycles, ledger states, and secure settlement parameters.
            </p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-xl self-start sm:self-auto shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Total Bookings</span>
            <span className="text-base font-black text-[#1E3A8A]">{bookedTickets.length} Ledgers</span>
          </div>
        </div>

        {/* Client Interactive Matrix Engine with Search */}
        <BookedTicketsClientGrid initialBookings={bookedTickets} />

      </div>
    </div>
  );
};

export default BookedTicketsPage;