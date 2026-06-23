import ClientAdvertiseView from '@/Components/Dashboard/Admin/Advertise/ClientAdvertiseView';
import { getAdminAllTickets } from '@/lib/api/adminAllTickets';
import React from 'react';

export const metadata = {
  title: "TicketBari || Advertisements ",
  description: "Online ticket booking platform",
};
const AdvertisePage = async () => {

    const tickets = await getAdminAllTickets() || [];

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 text-left">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Dashboard Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] tracking-tight">
                        Campaign & Advertisements
                    </h1>
                    <p className="text-xs md:text-sm text-slate-400 font-medium">
                        Promote premier routes to the homepage banner grid. Maximized capping allocation is locked at 6 slots.
                    </p>
                </div>

                {/* Main Client Control Panel */}
                <ClientAdvertiseView initialTickets={tickets} />

            </div>
        </div>
    );
};

export default AdvertisePage;