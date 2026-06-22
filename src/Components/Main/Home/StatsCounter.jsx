'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Users, Ticket, Route, ShieldAlert } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  { icon: <Users className="h-6 w-6 text-[#FF6B35]" />, target: 500, suffix: "K+", label: "Happy Travellers" },
  { icon: <Ticket className="h-6 w-6 text-blue-400" />, target: 1.2, suffix: "M+", label: "Tickets Sold" },
  { icon: <Route className="h-6 w-6 text-emerald-400" />, target: 250, suffix: "+", label: "Routes Covered" },
  { icon: <ShieldAlert className="h-6 w-6 text-purple-400" />, target: 99.9, suffix: "%", label: "Reliability Rate" },
];

// 🔢 রিয়েল-টাইম স্ক্রোল কাউন্টার সাব-কমপোনেন্ট
function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  // স্মুথ স্প্রিং ট্রানজিশন (ড্যাম্পিং আর স্টিফনেস দিয়ে গতি কন্ট্রোল করা হয়েছে)
  const springValue = useSpring(motionValue, { stiffness: 40, damping: 20 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // যদি ডেসিমাল নাম্বার হয় (যেমন ১.২ বা ৯৯.৯) তবে ১ ঘর ফিক্সড রাখবে, নয়তো পুর্ণসংখ্যা দেখাবে
        ref.current.textContent = latest % 1 === 0 ? Math.floor(latest) : latest.toFixed(1);
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export function StatsCounter() {
  return (
    <section className="w-full bg-gradient-to-br from-[#1E3A8A] via-[#162A65] to-zinc-950 text-white py-16 px-4 relative overflow-hidden transition-all duration-300">

      {/* 🔮 ব্যাকগ্রাউন্ড গ্লো ডেকোরেশন */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-64 w-64 bg-[#FF6B35]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-64 w-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{
              y: -8,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
            className="flex flex-col items-center gap-2 p-6 rounded-[24px] bg-white/5 border border-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300 shadow-lg group"
          >
            {/* 🛸 আইকন কন্টেইনার (হোভার করলে হালকা ঘুরবে এবং গ্লো করবে) */}
            <div className="p-3 bg-white/10 rounded-2xl mb-1 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              {stat.icon}
            </div>

            {/* 📈 কাউন্টিং নাম্বার ও সাফিক্স */}
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white group-hover:text-[#FF6B35] transition-colors duration-300 flex items-center justify-center">
              <AnimatedNumber value={stat.target} />
              <span>{stat.suffix}</span>
            </div>

            {/* 🏷️ লেবেল */}
            <span className="text-[11px] sm:text-xs text-zinc-300 dark:text-zinc-400 font-bold tracking-widest uppercase transition-colors group-hover:text-white">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}