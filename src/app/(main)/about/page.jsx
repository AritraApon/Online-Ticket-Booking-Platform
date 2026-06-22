'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Heart, Award, Sparkles, Users, Milestone } from 'lucide-react';
import Image from 'next/image';

const values = [
  { icon: <ShieldCheck className="h-6 w-6 text-blue-500" />, title: "Absolute Trust", desc: "We prioritize your safety and security above everything else with bulletproof systems." },
  { icon: <Compass className="h-6 w-6 text-[#FF6B35]" />, title: "Infinite Exploring", desc: "Connecting every corner of Bangladesh so you can explore without limitations." },
  { icon: <Heart className="h-6 w-6 text-emerald-500" />, title: "Passenger First", desc: "Our product ecosystem revolves around making your journey completely stress-free." },
];

export default function AboutPage() {
  return (
    <main className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen transition-colors duration-300">

      {/* 🚀 Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#162A65] to-zinc-950 text-white text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-black uppercase tracking-widest mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight"
          >
            Redefining Travel in <span className="text-[#FF6B35]">Bangladesh</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            TicketBari is not just an online ticketing platform. We are building the smartest, safest, and most intuitive transit infrastructure for every dreamer and explorer.
          </motion.p>
        </div>
      </section>

      {/* 🎯 Our Mission Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[350px] sm:h-[450px] rounded-[32px] overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
        >
          <Image
            src="https://i.ibb.co.com/RwDLBNZ/photo-1544620347-c4fd4a3d5957-q-80-w-800.jpg"
            alt="Our Journey"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent flex items-end p-8">
            <p className="text-white font-bold text-lg italic">Connecting People, Destination, and Memories.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 text-[#FF6B35] font-black text-xs uppercase tracking-wider">
            <Milestone className="h-4 w-4" /> Who We Are
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
            Making Every Mile Smooth and Memorable
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            Started with a vision to eliminate the traditional hassles of standing in long terminal queues, TicketBari brings Bangladesh's entire bus, launch, and flight network right into your pocket.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            We operate with absolute pricing transparency, ensuring zero hidden charges, real-time live tracking, and single-click cancellation capabilities.
          </p>
        </motion.div>
      </section>

      {/* 💎 Core Values Section (High Contrast Cards) */}
      <section className="py-20 bg-zinc-100 dark:bg-zinc-900/40 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">The Values We Live By</h2>
            <p className="text-sm text-zinc-500 mt-2">The core engine that powers TicketBari everyday.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-[24px] border border-zinc-200 dark:border-zinc-800 shadow-md transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800 w-fit rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {v.icon}
                </div>
                <h3 className="text-xl font-black text-black dark:text-white tracking-tight group-hover:text-[#FF6B35] transition-colors">
                  {v.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed font-semibold">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}