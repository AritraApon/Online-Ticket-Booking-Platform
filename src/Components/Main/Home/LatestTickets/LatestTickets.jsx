"use client";

import React, { useEffect, useState } from "react";
import { getLatestTickets } from "@/lib/api/latestTickets";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, MapPin, Bus, Train, Plane, Ship } from "lucide-react";
import Image from "next/image";

// ট্রান্সপোর্ট টাইপ অনুযায়ী আইকন জেনারেট করার হেল্পার ফাংশন
const getTransportIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "bus":
      return <Bus className="h-4 w-4" />;
    case "train":
      return <Train className="h-4 w-4" />;
    case "plane":
    case "flight":
      return <Plane className="h-4 w-4" />;
    case "launch":
    case "ship":
      return <Ship className="h-4 w-4" />;
    default:
      return <Bus className="h-4 w-4" />;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function LatestTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchTickets = async () => {
    try {
      const response = await getLatestTickets();
      console.log("Latest Tickets API Raw Response:", response);

      // সব ধরনের রেসপন্স ফরম্যাট চেক করা হচ্ছে:
      if (Array.isArray(response)) {
        setTickets(response);
      } else if (response?.data && Array.isArray(response.data)) {
        setTickets(response.data);
      } else if (response?.tickets && Array.isArray(response.tickets)) {
        setTickets(response.tickets);
      } else if (response?.result && Array.isArray(response.result)) {
        setTickets(response.result);
      }
    } catch (error) {
      console.error("Error fetching latest tickets:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchTickets();
}, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FF6B35]"></div>
      </div>
    );
  }

  // যদি ডাটাবেজ থেকে কোনো টিকিটই না আসে
  if (!tickets || tickets.length === 0) {
    return (
      <div className="w-full py-16 text-center text-zinc-500 dark:text-zinc-400 bg-[#F8FAFC] dark:bg-zinc-950">
        No latest approved tickets found.
      </div>
    );
  }

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* 🏔️ সেকশন হেডার */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">
              Exclusive Deals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">
              Latest Ticket Discoveries
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Grab the newest approved routes and tickets before they run out.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/all-tickets"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white text-sm font-bold rounded-xl shadow-md transition-all"
            >
              View All Tickets
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* 🎴 টিকিট কার্ডস গ্রিড */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tickets.map((ticket) => (
            <motion.div
              key={ticket._id || ticket.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-zinc-100 dark:border-zinc-800 flex flex-col h-full transition-all"
            >
              {/* 🖼️ ইমেজ */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  width={500}
                  height={500}
                  unoptimized
                  src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop"}
                  alt={ticket.title || "Ticket Image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md dark:bg-zinc-900/90 text-[#1E3A8A] dark:text-indigo-400 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
                  {getTransportIcon(ticket.transportType)}
                  {ticket.transportType}
                </div>
              </div>

              {/* 📝 কন্টেন্ট */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      {formatDate(ticket.departureDateTime)}
                    </span>
                    <span className="text-[#FF6B35] font-bold">★★★★★</span>
                  </div>

                  <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-100 line-clamp-1 group-hover:text-[#1E3A8A] dark:group-hover:text-indigo-400 transition-colors">
                    {ticket.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-3 text-sm text-zinc-600 dark:text-zinc-300 font-semibold bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-xl">
                    <MapPin className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span className="truncate">{ticket.from}</span>
                    <span className="text-zinc-400 font-light">→</span>
                    <span className="truncate">{ticket.to}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Fare From
                    </span>
                    <span className="text-lg font-black text-[#FF6B35]">
                      ৳{ticket.pricePerUnit}
                    </span>
                  </div>

                  <Link
                    href={`/all-tickets/${ticket._id || ticket.id}`}
                    className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-[#FF6B35] group-hover:text-white rounded-full transition-all shadow-sm active:scale-95"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}