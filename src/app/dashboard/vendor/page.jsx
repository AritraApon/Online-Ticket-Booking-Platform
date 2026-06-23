import VendorDashboardClient from '@/Components/Dashboard/Vendor/Overview/VendorDashboardClient';
import { getVendorAddedTickets } from '@/lib/api/vendorAddedTickets';
import { getVendorBookingRequest } from '@/lib/api/vendorBookingRequest';
import { getVendorRevenue } from '@/lib/api/vendorRevenue';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export const metadata = {
  title: "TicketBari- Vendor-Dashboard-Overview",
  description: "Online ticket booking platform",
};
export default async function VendorDashBoardPage() {
  // ⚡ Session fetching with proper await for headers
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const vendorId = user?.id;

  // 🔄 Parallel Data Fetching for peak performance
  const [addTickets, bookingRequest, revenue] = await Promise.all([
    getVendorAddedTickets(vendorId).then(d => d || []),
    getVendorBookingRequest(vendorId).then(d => d || []),
    getVendorRevenue(vendorId).then(d => d || [])
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-[#1E293B]">
      <VendorDashboardClient
        user={user}
        tickets={addTickets}
        bookings={bookingRequest}
        revenueData={revenue}
      />
    </div>
  );
}