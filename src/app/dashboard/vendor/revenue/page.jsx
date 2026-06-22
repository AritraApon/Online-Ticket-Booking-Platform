import ClientVendorRevenueView from '@/Components/Dashboard/Vendor/Revenue/ClientVendorRevenueView';
import { getVendorRevenue } from '@/lib/api/vendorRevenue';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';


const VendorRevenuePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const vendor = session?.user;
    const vendorId = vendor?.id;

    // এপিআই থেকে অবজেক্ট নিয়ে আসা
    const vendorRevenue = await getVendorRevenue(vendorId) || {
        totalTicketsAdded: 0,
        totalTicketsSold: 0,
        totalRevenue: 0,
        paidBookings: []
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 text-left">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Dashboard Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] tracking-tight">
                        Vendor Revenue Hub
                    </h1>
                    <p className="text-xs md:text-sm text-slate-400 font-medium">
                        Track your ticket inventory pipeline, sales performance, and systemic payout structures.
                    </p>
                </div>

                {/* Main Dynamic View */}
                <ClientVendorRevenueView data={vendorRevenue} />

            </div>
        </div>
    );
};

export default VendorRevenuePage;