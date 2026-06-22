"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import SearchCard from "../SearchCard";

// Swiper styles আমদানি
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function HeroSlider() {
  // স্লাইডারের ৪টি অবজেক্ট ডাটা (বাস, ট্রেন, প্লেন, লঞ্চ)
  const slidesData = [
    {
      id: 1,
      title: "Fly High, Explore Further",
      subtitle: "Find Cheap Flights & Airline Tickets Easily",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop", // Plane
    },
    {
      id: 2,
      title: "Scenic Routes & Smooth Rides",
      subtitle: "Book Premium Intercity Bus Tickets Instantly",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop", // Bus
    },
    {
      id: 3,
      title: "Track Your Next Adventure",
      subtitle: "Comfortable and Secure Train Journey Across the Country",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1600&auto=format&fit=crop", // Train
    },
    {
      id: 4,
      title: "Sail the Serene Waters",
      subtitle: "Get Top-Tier Launch Cabins & Deck Slots Effortlessly",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop", // Launch / Cruise Water concept
    },
  ];

  return (
    <div className="relative w-full h-[20vh] min-h-[480px] bg-zinc-900 overflow-hidden">

      {/* 🔮 Swiper Background Engine */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="absolute inset-0 w-full h-full z-0"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* ডার্ক গ্রেডিয়েন্ট ওভারলে যাতে টেক্সট এবং কার্ড ক্রিস্টাল ক্লিয়ার দেখায় */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-zinc-950/80 z-10" />
            <Image width={1000} height={1000}
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🏯 ফোরগ্রাউন্ড কন্টেন্ট লেয়ার (স্লাইডারের উপরে যা থাকবে) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-center">

        {/* টাইটেল এবং সাবটাইটেল সেকশন (Framer Motion দিয়ে মসৃণ এন্ট্রান্স) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 max-w-2xl text-white"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-md">
            Where to <span className="text-[#FF6B35]">Explore?</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-200 mt-3 drop-shadow-sm font-medium">
            Find Cheap Bus, Train, Flight & Launch Tickets in Bangladesh
          </p>
        </motion.div>

        {/* 💳 ইন্টারেক্টিভ সার্চ কার্ড মেকানিজম */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <SearchCard />
        </motion.div>

      </div>
    </div>
  );
}