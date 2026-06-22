'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Image, ArrowRight, Sparkles } from "lucide-react";

export default function EditProfileModal({ isOpen, onClose, currentUser }) {
  const [name, setName] = useState(currentUser?.name || "");
  const [imageUrl, setImageUrl] = useState(currentUser?.image || "");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // মামা, এখানে তোর ব্যাকএন্ড লজিক বা মিউটেশন অ্যাড করে নিস
    console.log("Submitting updated info:", { name, imageUrl });
    alert("মামা, ইনফো সাবমিট হয়েছে! এবার ব্যাকএন্ড দিয়ে আপডেট করে নাও।");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ব্যাকড্রপ ওভারলে */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
      />

      {/* মোডাল কন্টেনার */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[28px] shadow-2xl p-6 overflow-hidden z-10"
      >
        {/* টপ ডেকোরেশন গ্লো */}
        <div className="absolute -top-12 -right-12 h-32 w-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl" />

        {/* হেডার */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#FF6B35]" />
            <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
              Update Profile
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-xl hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ফর্ম */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* নাম পরিবর্তনের ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide block">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold outline-none focus:border-[#FF6B35] focus:bg-white dark:focus:bg-zinc-950 transition-all duration-200"
                placeholder="e.g. Aritra"
              />
            </div>
          </div>

          {/* ইমেজ URL ফিল্ড (ImgBB-র জন্য) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide block">
              Profile Image URL (ImgBB)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Image className="h-4 w-4" />
              </span>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold outline-none focus:border-[#FF6B35] focus:bg-white dark:focus:bg-zinc-950 transition-all duration-200"
                placeholder="https://i.ibb.co/..."
              />
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium pl-1">
              * Upload your photo to ImgBB and paste the direct link here.
            </p>
          </div>

          {/* সাবমিট বাটন */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#1E3A8A] to-blue-600 hover:from-[#FF6B35] hover:to-orange-600 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-widest"
            >
              Save Changes <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}