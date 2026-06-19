import React from 'react';
import { headers } from "next/headers";
import { getVendorAddedTickets } from '@/lib/api/vendorAddedTickets';
import MyTicketsClient from '@/Components/Dashboard/Vendor/MyAddTickets/MyTicketsClient';
import { auth } from '@/lib/auth';


const MyAddedTickets = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  const userId = user?.id;

  // Server Side Data Fetch Node
  const tickets = await getVendorAddedTickets(userId) || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#09090b] text-[#1E293B] dark:text-[#E2E8F0] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Dynamic Descriptive Section Header */}
        <div className="mb-2 space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-[#1E293B] dark:text-white">
            My Added Tickets
          </h2>
          <p className="text-xs font-semibold text-zinc-400">
            Monitor verification lifecycle status and dispatch actions safely.
          </p>
        </div>

        <div className=" min-w-[180px] my-1 mb-3">

<div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-full px-2.5 py-0.5 select-none p-2">
  {/* 🟢 Micro Indicator Dot */}
  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>

  {/* 📝 Label & Count */}
  <p className="text-[11px] font-bold text-orange-800 tracking-wide uppercase">
    Total Tickets: <span className="font-extrabold text-orange-600 px-0.5">{tickets?.length || 0}</span>
  </p>
</div>

</div>
        {/* Client Layer Matrix Dispatcher injection */}
        <MyTicketsClient initialTickets={tickets} />

      </div>
    </div>
  );
};

export default MyAddedTickets;