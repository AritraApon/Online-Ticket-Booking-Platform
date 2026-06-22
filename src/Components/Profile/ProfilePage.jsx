"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { User, Mail, Shield, Calendar, Edit2, ShieldAlert, Loader2, AlertTriangle } from "lucide-react";
import { AnimatePresence } from "framer-motion";
 // পাথ ঠিকমতো মিলিয়ে নিস মামা
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // মোডাল ওপেন/ক্লোজ স্টেট কন্ট্রোল
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultAvatar = "https://i.ibb.co.com/S4p625c4/image.png";

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-[#1E3A8A] dark:text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto transition-colors duration-300 px-4 py-8">

      {/* ⚠️ Fraud Alert Notification Banner */}
      {user?.isFraud && (
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-600 dark:bg-red-500/10 dark:text-red-400 shadow-sm animate-pulse">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
          <div className="text-xs sm:text-sm font-black uppercase tracking-wide">
            Warning: Your account has been flagged for fraudulent activity.
          </div>
        </div>
      )}

      {/* 1. Premium Header Banner & Identity Segment */}
      <div className="relative rounded-[32px] bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden">
        {/* Top Gradient Aesthetic Strip */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-[#1E3A8A] to-indigo-900 dark:from-zinc-950 dark:to-indigo-950 relative" />

        {/* User Badge Grid Flex Info */}
        <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center sm:items-end justify-between relative -mt-16 sm:-mt-20 sm:space-x-6 space-y-4 sm:space-y-0 text-center sm:text-left">

          {/* Bigger Profile Avatar Display */}
          <div className="relative inline-block shrink-0">
            <Image width={200} height={200}
              src={user?.image || defaultAvatar}
              alt="Profile Avatar"
              className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-cover ring-4 ring-white dark:ring-zinc-900 shadow-md bg-white dark:bg-zinc-800"
            />
          </div>

          {/* User Display Text Meta */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl font-black text-zinc-950 dark:text-zinc-100 tracking-tight truncate">
              {user?.name || "Dashboard User"}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-100 dark:bg-orange-500/10 text-[#FF6B35]">
                {user?.role || "user"} Mode
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5 text-zinc-400" /> UUID: {user?.id?.slice(0, 12) || "N/A"}...
              </span>
            </div>
          </div>

          {/* Edit Profile Button - অ্যাক্টিভেট করা হয়েছে মোডালের সাথে */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 px-5 py-3 bg-[#1E3A8A] hover:bg-indigo-900 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-white font-black text-xs rounded-xl shadow-sm transition-all w-full sm:w-auto justify-center uppercase tracking-widest"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* 2. Account Specifications Display Box */}
      <div className="bg-white dark:bg-zinc-900 rounded-[32px] shadow-sm border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 space-y-5">
        <h2 className="text-sm font-black text-zinc-950 dark:text-zinc-200 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4 uppercase tracking-wide">
          <User className="h-4 w-4 text-[#1E3A8A] dark:text-blue-400" />
          Account Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

          {/* Display Meta Item: Full Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide block pl-0.5">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </span>
              <div className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 select-all">
                {user?.name || "Not Specified"}
              </div>
            </div>
          </div>

          {/* Display Meta Item: Email Address */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide block pl-0.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </span>
              <div className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 select-all">
                {user?.email || "Not Specified"}
              </div>
            </div>
          </div>

          {/* Display Meta Item: System Role */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide block pl-0.5">Role Authorization</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Shield className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </span>
              <div className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-400 capitalize">
                {user?.role || "user"}
              </div>
            </div>
          </div>

          {/* Display Meta Item: Account Verification */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide block pl-0.5">Verification Status</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </span>
              <div className={`w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-black rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 ${
                user?.emailVerified ? "text-emerald-600 dark:text-emerald-500" : "text-amber-500"
              }`}>
                {user?.emailVerified ? "Verified Account" : "Pending Verification"}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* মোডাল রেন্ডারিং (AnimatePresence দিয়ে এক্সিট অ্যানিমেশন হ্যান্ডেল হবে) */}
      <AnimatePresence>
        {isModalOpen && (
          <EditProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            currentUser={user}
          />
        )}
      </AnimatePresence>

    </div>
  );
}