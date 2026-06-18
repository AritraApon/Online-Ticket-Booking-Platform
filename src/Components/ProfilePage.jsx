"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { User, Mail, Shield, Calendar, Edit2, ShieldAlert, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const defaultAvatar = "https://i.ibb.co.com/S4p625c4/image.png";

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-[#1E3A8A] dark:text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto transition-colors duration-300">

      {/* 1. Premium Header Banner & Identity Segment */}
      <div className="relative rounded-3xl bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/40 dark:shadow-none border border-zinc-100 dark:border-zinc-800/80 overflow-hidden">
        {/* Top Gradient Aesthetic Strip */}
        <div className="h-40 bg-gradient-to-r from-[#1E3A8A] to-indigo-900 dark:from-zinc-950 dark:to-indigo-950 relative" />

        {/* User Badge Grid Flex Info */}
        <div className="p-8 pt-0 sm:flex items-end justify-between relative -mt-20 sm:space-x-8 space-y-6 sm:space-y-0 text-center sm:text-left">

          {/* Bigger Profile Avatar Display */}
          <div className="relative inline-block mx-auto sm:mx-0">
            <img
              src={user?.image || defaultAvatar}
              alt="Profile Avatar"
              className="h-36 w-36 rounded-2xl object-cover ring-4 ring-white dark:ring-zinc-900 shadow-xl bg-white dark:bg-zinc-800"
            />
          </div>

          {/* User Display Text Meta */}
          <div className="flex-1 pb-1 ml-4">
            <h1 className="text-3xl font-black text-zinc-800 dark:text-zinc-100 tracking-tight">
              {user?.name || "Dashboard User"}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-2.5">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 text-[#FF6B35]">
                {user?.role || "user"} Mode
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5" /> UUID: {user?.id?.slice(0, 12) || "N/A"}...
              </span>
            </div>
          </div>

          {/* Simple Clean Normal Button - Click Handler-e pore modal trigger add korte parbe */}
          <button
            onClick={() => console.log("Open edit modal layout screen container stream")}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1E3A8A] hover:bg-indigo-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white dark:text-zinc-200 font-bold text-sm rounded-xl shadow-md active:scale-95 transition-all w-full sm:w-auto justify-center"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* 2. Account Meta parameters Display Box (Read-Only State Layout) */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-zinc-200/40 dark:shadow-none border border-zinc-100 dark:border-zinc-800/80 p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <User className="h-5 w-5 text-[#1E3A8A] dark:text-blue-400" />
          Account Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Display Meta Item: Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </span>
              <div className="w-full pl-11 pr-4 py-3.5 text-sm font-semibold rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300 select-all">
                {user?.name || "Not Specified"}
              </div>
            </div>
          </div>

          {/* Display Meta Item: Email Address */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </span>
              <div className="w-full pl-11 pr-4 py-3.5 text-sm font-semibold rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300 select-all">
                {user?.email || "Not Specified"}
              </div>
            </div>
          </div>

          {/* Display Meta Item: System Role */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Role Authorization</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Shield className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </span>
              <div className="w-full pl-11 pr-4 py-3.5 text-sm font-semibold rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-600 dark:text-zinc-400 capitalize">
                {user?.role || "user"}
              </div>
            </div>
          </div>

          {/* Display Meta Item: Account Verification */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Verification Status</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </span>
              <div className={`w-full pl-11 pr-4 py-3.5 text-sm font-bold rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 ${
                user?.emailVerified ? "text-emerald-600 dark:text-emerald-500" : "text-amber-500"
              }`}>
                {user?.emailVerified ? "Verified Account" : "Pending Verification"}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}