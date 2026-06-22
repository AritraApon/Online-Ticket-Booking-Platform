'use client'

import React from 'react';
import { Quote, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const reviews = [
  {
    name: "Rahat Chowdhury",
    role: "Frequent Flyer",
    comment: "TicketBari made my flight booking to Cox's Bazar incredibly seamless! The instant ticket generation is next level.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
  },
  {
    name: "Anika Rahman",
    role: "Corporate Traveller",
    comment: "The 24/7 support team helped me reschedule my launch ticket at midnight within just 5 minutes! Unbelievable service.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
  },
  {
    name: "Sajid Hasan",
    role: "Tour Enthusiast",
    comment: "Best ticket prices in Bangladesh, absolutely no hidden fees, and the UI is super smooth, clean and modern.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
  },
  {
    name: "Zayan Ahmed",
    role: "Backpacker",
    comment: "Booking bus tickets used to be a hassle, but this platform made it a matter of a few clicks. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150"
  },
  {
    name: "Nusrat Jahan",
    role: "Regular Commuter",
    comment: "I love the clean interface and the seamless easy cancellation policy. Makes online ticketing totally stress-free.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150"
  },
  {
    name: "Tanvir Rahman",
    role: "Business Executive",
    comment: "Flawless payment gateway integration and bank-grade security. TicketBari is now my go-to choice for travel.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
  }
];

export function Testimonials() {
  // স্লাইডারের ইনফিনিট ইফেক্টের জন্য অ্যারেকে ডাবল করে নেওয়া হয়েছে
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden relative">

      {/* 🏔️ সেকশন হেডার */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/30 text-[#FF6B35] text-xs font-black uppercase tracking-widest mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          Testimonials
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
          What Our Travellers Say
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-3 max-w-xl mx-auto font-medium">
          Real experiences from real explorers who trust TicketBari for their journeys.
        </p>
      </div>

      {/* 🎞️ অটো-স্লাইডিং কন্টেইনার (এডভার্টাইজ কার্ডের মতো স্লাইড মেকানিজম) */}
      <div className="flex w-full overflow-hidden relative py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-zinc-50 before:to-transparent dark:before:from-zinc-950 after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-zinc-50 after:to-transparent dark:after:from-zinc-950">

        <motion.div
          className="flex gap-6 shrink-0 pr-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35, // স্পীড বাড়াতে/কমাতে চাইলে এই ভ্যালু চেঞ্জ করবি মামা
            repeat: Infinity,
          }}
          whileHover={{ transition: { duration: 0 } }} // মাউস নিলে স্লাইডার হালকা পজ হতে পারে বা স্পীড স্লো হবে
        >
          {duplicatedReviews.map((rev, i) => (
            <div
              key={i}
              // 🎨 হাই-কনট্রাস্ট লাক্সারি কার্ড কালার (লাইট মোডে ক্লিয়ার, ডার্ক মোডে প্রিমিয়াম ব্ল্যাক-গ্রে)
              className="w-[300px] sm:w-[380px] bg-zinc-100/90 dark:bg-zinc-900/90 p-6 sm:p-8 rounded-[24px] border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl dark:hover:border-[#1E3A8A] hover:border-orange-500/50 transition-all duration-500 relative flex flex-col justify-between group cursor-pointer"
            >
              <div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-[#FF6B35] text-[#FF6B35]" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-zinc-300 dark:text-zinc-800 group-hover:text-[#FF6B35]/20 dark:group-hover:text-blue-500/20 transition-colors duration-300" />
                </div>

                {/* 💬 কমেন্ট টেক্সট */}
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed font-semibold">
                  {rev.comment}
                </p>
              </div>

              {/* 👤 ইউজার প্রোফাইল সেকশন */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-[#FF6B35] dark:group-hover:border-blue-400 transition-colors">
                  <Image
                    fill
                    src={rev.avatar}
                    alt={rev.name}
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-black dark:text-white tracking-tight group-hover:text-[#FF6B35] dark:group-hover:text-blue-400 transition-colors duration-300">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 font-bold tracking-wide">
                    {rev.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}