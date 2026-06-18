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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 🚀 body tag-er bhetor font class ebong bakipuranocode wrap hobe */}
      <body className={`${sansBody.className} antialiased`}>
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

          {/* 1. Sidebar Panel Wrapper */}
          <DashboardSidebar />

          {/* 2. Main Content Frame */}
          <main className="flex-1 w-full min-h-screen p-4 md:p-6 lg:p-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>

          {/* Global Notification System */}
          <ToastContainer position="top-center" />
        </div>
      </body>
    </html>
  );
}