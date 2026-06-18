"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Train, LogOut, User, LayoutDashboard, Ticket } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // 📝 Mock Auth State - Better-Auth Integration shomoy real session database property diye update korbe
  // Logic Testing er jonno toggle: true/false and role values: 'user' | 'vendor' | 'admin'
  const session = {
    user: {
      name: "Aritro Mazumder",
      email: "aritro@example.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      role: "admin",
    },
    isLoggedIn: true,
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Tickets", path: "/all-tickets" },
  ];

  // Dynamic active link checker wrapper
  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1E3A8A] text-white shadow-md border-b border-indigo-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left Block: Logo Brand Segment */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-white group">
              <span className="p-1.5 bg-[#FF6B35] rounded-lg transition-transform group-hover:scale-105">
                <Train className="h-6 w-6 text-white" />
              </span>
              <span className="font-extrabold">
                Ticket<span className="text-[#FF6B35]">Bari</span>
              </span>
            </Link>
          </div>

          {/* Desktop Central Menu Items Group */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-indigo-900/50 text-[#FF6B35] font-semibold"
                    : "text-indigo-100 hover:bg-indigo-900/30 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dashboard Private Route - Only visible when user logged in */}
            {session.isLoggedIn && (
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname.startsWith("/dashboard")
                    ? "bg-indigo-900/50 text-[#FF6B35] font-semibold"
                    : "text-indigo-100 hover:bg-indigo-900/30 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Control Section (Auth State Actions) */}
          <div className="hidden md:flex items-center space-x-4">
            {session.isLoggedIn ? (
              <div className="relative">
                {/* Profile Trigger Element */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-indigo-900/40 focus:outline-none border border-transparent hover:border-indigo-700/50 transition-all"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-[#FF6B35]"
                    src={session.user.image}
                    alt="User Avatar"
                  />
                  <span className="text-sm font-medium text-indigo-50 max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                </button>

                {/* Dropdown Menu Box */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white text-zinc-800 shadow-xl ring-1 ring-black/5 divide-y divide-zinc-100 focus:outline-none transition-all py-1">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-zinc-400 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-zinc-700 truncate">{session.user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                        {session.user.role}
                      </span>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        <User className="h-4 w-4 text-zinc-400" />
                        <span>My Profile</span>
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          // Clear session context hooks / Better-Auth trigger handler executions
                        }}
                        className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-indigo-100 hover:text-white px-3 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#FF6B35] hover:bg-[#ff571a] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-orange-900/20 active:scale-95 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile View: Hamburger Trigger Button Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-indigo-200 hover:text-white hover:bg-indigo-900/40 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Slide Navigation Area Layout Panel */}
      {isOpen && (
        <div className="md:hidden bg-[#1a337a] border-t border-indigo-900/50 px-2 pt-2 pb-4 space-y-1 shadow-inner animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? "bg-indigo-900/70 text-[#FF6B35] font-bold"
                  : "text-indigo-100 hover:bg-indigo-900/40 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {session.isLoggedIn && (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                pathname.startsWith("/dashboard")
                  ? "bg-indigo-900/70 text-[#FF6B35] font-bold"
                  : "text-indigo-100 hover:bg-indigo-900/40 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
          )}

          <hr className="border-indigo-900/40 my-2 mx-3" />

          {/* Mobile Session Actions Panel Box */}
          {session.isLoggedIn ? (
            <div className="pt-2 px-3">
              <div className="flex items-center space-x-3 mb-3">
                <img className="h-10 w-10 rounded-full object-cover ring-2 ring-[#FF6B35]" src={session.user.image} alt="User" />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{session.user.name}</h4>
                  <p className="text-xs text-indigo-200 truncate max-w-[200px]">{session.user.email}</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2.5 w-full text-left px-3 py-2 text-sm text-indigo-100 hover:bg-indigo-900/40 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Logout execution blocks
                  }}
                  className="flex items-center space-x-2.5 w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-950/20 rounded-lg transition-colors font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 pb-1 px-3 grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium border border-indigo-700 rounded-xl text-indigo-100 hover:bg-indigo-900/30"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 text-sm font-bold bg-[#FF6B35] hover:bg-[#ff571a] rounded-xl text-white shadow-md shadow-orange-900/20"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}