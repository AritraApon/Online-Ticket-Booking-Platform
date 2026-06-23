"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  User, Ticket, History, PlusCircle,
  Layers, FolderCheck, DollarSign, ShieldAlert,
  Users, Megaphone, LogOut, Menu, X, Train ,LucideHome,
  Target,
  Download
} from "lucide-react";

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Better-Auth Core Hook Context
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const currentRole = user?.role || "user"; // Fallback 'user' role checking wrapper

  // Asynchronous Clear Session Core Signout Handler
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (err) {
      console.error("Dashboard sidebar signout stream exception:", err);
    }
  };

  // 📝 Dynamic Role Matrix Mapping Array configurations
  const roleRoutes = {
    user: [
      { name: "Overview", path: "/dashboard/user", icon: Target },
      { name: "User Profile", path: "/dashboard/user/profile", icon: User },
      { name: "My Booked Tickets", path: "/dashboard/user/booked-tickets", icon: Ticket },
      { name: "Download Ticket", path: "/dashboard/user/download-tickets", icon: Download },
      { name: "Transaction History", path: "/dashboard/user/transactions", icon: History },
    ],
    vendor: [
        { name: "Overview", path: "/dashboard/vendor", icon: Target },
      { name: "Vendor Profile", path: "/dashboard/vendor/vendor-profile", icon: User },
      { name: "Add Ticket", path: "/dashboard/vendor/add-ticket", icon: PlusCircle },
      { name: "My Added Tickets", path: "/dashboard/vendor/my-tickets", icon: Layers },
      { name: "Requested Bookings", path: "/dashboard/vendor/bookings", icon: FolderCheck },
      { name: "Revenue Overview", path: "/dashboard/vendor/revenue", icon: DollarSign },
    ],
    admin: [
      { name: "Overview", path: "/dashboard/admin", icon: Target },
      { name: "Admin Profile", path: "/dashboard/admin/admin-profile", icon: User },
      { name: "Manage Tickets", path: "/dashboard/admin/manage-tickets", icon: ShieldAlert },
      { name: "Manage Users", path: "/dashboard/admin/manage-users", icon: Users },
      { name: "Advertise Tickets", path: "/dashboard/admin/advertise", icon: Megaphone },
    ]
  };

  // Safe mapping derived parameters safely based on context roles
  const activeLinks = roleRoutes[currentRole] || roleRoutes["user"];

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Mobile Top Navigation Trigger Controller (Only visible on screens below MD) */}
      <div className="flex items-center justify-between bg-[#1E3A8A] text-white px-4 h-16 md:hidden border-b border-indigo-900/40 sticky top-0 z-40">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight">
          <span className="p-1.5 bg-[#FF6B35] rounded-lg">
            <Train className="h-5 w-5 text-white" />
          </span>
          <span>Ticket<span className="text-[#FF6B35]">Bari</span></span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-indigo-900/40 rounded-lg text-indigo-100 hover:text-white"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Main Sidebar Shell Panel Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1E3A8A] text-white border-r border-indigo-900/40 
        flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* Top Section block: Interactive Brand Container */}
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-indigo-900/30">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-white group">
              <span className="p-1.5 bg-[#FF6B35] rounded-lg transition-transform group-hover:scale-105">
                <Train className="h-5 w-5 text-white" />
              </span>
              <span className="font-extrabold">
                Ticket<span className="text-[#FF6B35]">Bari</span>
              </span>
            </Link>
            {/* Close Mobile Drawer Trigger element screen tracking toggle panel */}
            <button onClick={() => setIsOpen(false)} className="md:hidden text-indigo-200 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Meta Identity Badge Context Group */}
          <div className="px-4 py-4 border-b border-indigo-900/30 bg-indigo-900/20">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-full bg-[#6435ff] flex items-center justify-center font-bold text-sm text-white border border-orange-400/30 uppercase">
                {user?.name ? user.name.slice(0, 2) : "US"}
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold truncate text-indigo-50">{user?.name || "Dashboard User"}</p>
                <span className="inline-block text-[10px] uppercase font-extrabold tracking-wider bg-orange-500/20 text-[#FF6B35] px-2 py-0.5 rounded-md mt-0.5">
                  {currentRole} Mode
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Navigation System Link Render Stack block */}
          <nav className="p-4 space-y-1.5 overflow-y-auto">
            {activeLinks.map((link, idx) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={idx}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                    isActive(link.path)
                      ? "bg-indigo-900/60 text-[#FF6B35] shadow-inner font-semibold border-l-4 border-[#FF6B35]"
                      : "text-indigo-100 hover:bg-indigo-900/30 hover:text-white"
                  }`}
                >
                  <IconComponent className={`h-4 w-4 transition-colors ${
                    isActive(link.path) ? "text-[#FF6B35]" : "text-indigo-300 group-hover:text-white"
                  }`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>


        {/* Bottom Section Block: Global Signout Control Core Anchor */}
        <div className="p-4 border-t border-indigo-900/30 bg-indigo-950/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-xl transition-all"
          >
            <LogOut className="h-4 w-4 text-red-400" />
            <span>Sign Out Session</span>
          </button>
        </div>

      </aside>

      {/* Overlay Backdrop background shell mask logic for mobile view drawers */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}