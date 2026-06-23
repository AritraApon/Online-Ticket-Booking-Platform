import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar";

const sansBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "TicketBari - Dashboard",
  description: "Your Trusted Journey Companion",
};

export default function DashboardLayout({ children }) {
  return (
    // 💡 HTML/Body bad diye original layout style directly div wrappers-e apply kora holo
    // 🎯 ডার্ক মোডে গ্লোবাল ব্যাকগ্রাউন্ড ডিপ স্লেট ব্লু করার জন্য dark:bg-[#0F172A] এবং টেক্সট ডাইনামিক করা হয়েছে
    <div className={`${sansBody.className} antialiased w-full min-h-screen bg-gray-50 dark:bg-[#0F172A] text-zinc-900 dark:text-slate-100 transition-colors duration-300`}>

      {/* 🚀 h-screen abong overflow-hidden desktop view-e layout scaling limit fixed rakhbe */}
      <div className="h-screen bg-gray-50 dark:bg-[#000000] flex flex-col md:flex-row overflow-hidden transition-colors duration-300">

        {/* 1. Sidebar Panel Wrapper */}
        <DashboardSidebar />

        {/* 2. Main Content Frame (h-full abong overflow-y-auto shudhu main body area ke scroll korabe) */}
        <main className="flex-1 w-full h-full p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Global Notification System */}
        <ToastContainer position="top-center" />

      </div>
    </div>
  );
}