"use client";

import React, { useEffect, useState } from "react";
import { getAdvertiseTickets } from "@/lib/api/advertiseTickets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, ArrowUpRight, Calendar, Clock } from "lucide-react";

// Swiper এর প্রয়োজনীয় স্টাইল ইম্পোর্ট
import "swiper/css";
import "swiper/css/pagination";

export default function AdvertiseCard() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertiseTickets = async () => {
      try {
        const response = await getAdvertiseTickets();
        const data = response?.tickets || response || [];
        setTickets(data);
      } catch (error) {
        console.error("Error fetching advertised tickets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvertiseTickets();
  }, []);

  // 🗓️ ফরম্যাটেড ডেট জেনারেটর (যেমন: 23 Jun 2026)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ⏰ ফরম্যাটেড টাইম জেনারেটর (যেমন: 08:30 PM)
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="animate-ping rounded-full h-8 w-8 bg-[#FF6B35]"></div>
      </div>
    );
  }

  if (!tickets || tickets.length === 0) return null;

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* 🌟 সেকশন হেডার */}
        <div className="text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/50 text-[#FF6B35] text-xs font-black uppercase tracking-widest mb-3 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Destinations
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Top Picked Packages
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
            Exclusive routes handpicked by our experts for your luxury and comfort. Book now before slots run out!
          </p>
        </div>

        {/* 🎚️ Swiper Premium Slider Container */}
        <div className="relative px-2 py-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            spacing={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="advertised-swiper !pb-14"
          >
            {tickets.map((ticket) => (
              <SwiperSlide key={ticket._id || ticket.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => router.push(`/all-tickets/${ticket._id || ticket.id}`)}
                  className="group relative h-[470px] w-full rounded-[32px] overflow-hidden shadow-xl dark:shadow-black/40 border border-white dark:border-zinc-800 bg-white dark:bg-zinc-950 cursor-pointer flex flex-col justify-end"
                >

                  {/* 🖼️ ফুল-স্কেল ব্যাকগ্রাউন্ড ইমেজ লেয়ার */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={ticket.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"}
                      alt={ticket.title || "Destination"}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />
                  </div>

                  {/* 🚏 ট্রান্সপোর্ট টাইপ ফ্লোটিং ব্যাজ */}
                  <div className="absolute top-5 left-5 z-20 px-3.5 py-1.5 bg-white/90 backdrop-blur-md dark:bg-zinc-900/90 text-[#1E3A8A] dark:text-indigo-400 rounded-2xl text-xs font-black uppercase tracking-wider shadow-md">
                    {ticket.transportType || "Transit"}
                  </div>

                  {/* 💎 গ্লাসমরফিক ইনফো কার্ড */}
                  <div className="relative z-20 m-5 p-5 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-zinc-800/50 shadow-2xl transition-colors duration-300">

                    {/* ⏱️ ডেট এবং টাইম সেকশন (তোর রিকোয়ারমেন্ট অনুযায়ী এড করা হলো) */}
                    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-2.5 font-bold">
                      <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">
                        <Calendar className="h-3.5 w-3.5 text-[#FF6B35]" />
                        {formatDate(ticket.departureDateTime)}
                      </span>
                      <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">
                        <Clock className="h-3.5 w-3.5 text-[#FF6B35]" />
                        {formatTime(ticket.departureDateTime)}
                      </span>
                    </div>

                    {/* টাইটেল এবং অ্যারো আইকন */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-black text-zinc-900 dark:text-white line-clamp-1 group-hover:text-[#FF6B35] transition-colors duration-300">
                        {ticket.title}
                      </h3>
                      <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-[#FF6B35] group-hover:text-white rounded-xl transition-all shadow-sm shrink-0">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* রুট ট্র্যাকিং বা টেক্সট ডিটেইলস */}
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-4">
                      <span>{ticket.from || "Start"}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">→</span>
                      <span>{ticket.to || "End"}</span>
                    </div>

                    {/* Perks / সুযোগ-সুবিধা (ট্যাগস) */}
                    {ticket.perks && ticket.perks.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {ticket.perks.slice(0, 2).map((perk, index) => (
                          <span
                            key={index}
                            className="text-[10px] font-extrabold px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg uppercase tracking-wide"
                          >
                            ✨ {perk}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 💳 ফুটার গ্রিড (Price, Quantity) */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-zinc-100 dark:border-zinc-800">
                      <div>
                        <span className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                          Price per unit
                        </span>
                        <span className="text-lg font-black text-[#FF6B35] tracking-tight">
                          ৳{ticket.pricePerUnit}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                          Available Slots
                        </span>
                        <span className="text-xs font-black px-2.5 py-1 bg-orange-50 dark:bg-orange-950/30 text-[#FF6B35] rounded-lg">
                          {ticket.quantity} Left
                        </span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* 🎨 কিউট গ্লোবাল পেজিনেশন ডট স্টাইলিং ওভাররাইড */}
      <style jsx global>{`
        .advertised-swiper .swiper-pagination-bullet-active {
          background: #FF6B35 !important;
          width: 24px !important;
          border-radius: 6px !important;
        }
        .advertised-swiper .swiper-pagination-bullet {
          background: #zinc-400;
          opacity: 0.6;
        }
      `}</style>
    </section>
  );
}