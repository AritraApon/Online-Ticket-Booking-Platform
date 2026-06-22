"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Input, Button } from "@heroui/react";
import { MapPin, Navigation, Bus } from "lucide-react";

export default function SearchCard() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transport, setTransport] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (transport && transport !== "all") params.append("transport", transport);

    router.push(`/all-tickets?${params.toString()}`);
  };

  const transportTypes = [
    { key: "all", label: "All Vehicles" },
    { key: "bus", label: "Bus" },
    { key: "train", label: "Train" },
    { key: "plane", label: "Flight" },
    { key: "launch", label: "Launch" },
  ];

  return (
    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-zinc-100 p-6 lg:p-8 text-zinc-800">
      <form onSubmit={handleSearch} className="flex flex-col gap-6">

        {/* 🎛️ যানবাহন সিলেকশন ট্যাব গ্রুপ */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-100 pb-4">
          {transportTypes.map((type) => (
            <button
              key={type.key}
              type="button"
              onClick={() => setTransport(type.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                transport === type.key
                  ? "bg-[#1E3A8A] text-white shadow-md shadow-blue-900/20"
                  : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* 🔍 ইনপুট গ্রিড সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-left">

          {/* From Location */}
          <div className="md:col-span-4 relative flex flex-col gap-1 w-full">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider pl-1">From</label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3 h-4 w-4 text-zinc-400 z-10" />
              <Input
                name="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Where from?"
                className="w-full h-12 pl-8 pr-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-indigo-500 text-sm outline-none transition-colors"
              />
            </div>
          </div>

          {/* To Location */}
          <div className="md:col-span-4 relative flex flex-col gap-1 w-full">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider pl-1">To</label>
            <div className="relative flex items-center">
              <Navigation className="absolute left-3 h-4 w-4 text-zinc-400 z-10" />
              <Input
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Where to?"
                className="w-full h-12 pl-8 pr-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:border-indigo-500 text-sm outline-none transition-colors"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-4 w-full">
            <Button
              type="submit"
              className="w-full h-12 bg-[#FF6B35] hover:bg-[#e05626] text-white font-extrabold rounded-xl shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Bus className="h-5 w-5" />
              Find Best Tickets
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}