// src/app/dashboard/user/download-tickets/page.jsx
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getUserBookedTickets } from '@/lib/api/userBookingTickets';
import TicketDownloadClient from '@/Components/Dashboard/User/DownlodTickets/TicketDownloadClient';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function DownloadTicketsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  // ডাটা ফেচিং
  const rawTickets = await getUserBookedTickets(userId).then(d => d || []);

  // শুধুমাত্র PAID টিকিটগুলো ফিল্টার করছি
  const paidTickets = Array.isArray(rawTickets)
    ? rawTickets.filter(t => t?.status?.toLowerCase() === 'paid')
    : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#1E293B]">Download Your Tickets</h1>
          <p className="text-sm text-slate-500">Your verified digital boarding passes ready for instant generation.</p>
        </div>

        {/* নরমাল ক্লায়েন্ট কম্পোনেন্ট কল হচ্ছে */}
        <TicketDownloadClient initialTickets={paidTickets} />
      </div>
    </div>
  );
}