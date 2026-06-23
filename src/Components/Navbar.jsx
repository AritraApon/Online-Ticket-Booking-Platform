"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Train, LogOut, User, Loader2, Sun, Moon } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 🌗 Next-Themes Setup
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const defaultAvatar = "https://i.ibb.co.com/S4p625c4/image.png";
  const isActive = (path) => pathname === path;

  // 🚀 Working Async Better-Auth Logout Configuration
  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      setIsOpen(false);

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (err) {
      console.error("Authentication execution failure:", err);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Tickets", path: "/all-tickets" },
    { name: "About", path: "/about" },
    { name: "Support", path: "/support" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1E3A8A] dark:bg-[#0F172A] text-white shadow-md border-b border-indigo-900/40 dark:border-slate-800/80 transition-colors duration-200">
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(link.path)
                    ? "bg-indigo-900/50 dark:bg-slate-800 text-[#FF6B35] font-semibold"
                    : "text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/30 dark:hover:bg-slate-800/50 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dashboard Link - Rendered strictly if user exists */}
            {!isPending && user && (
              <Link
                href={
                  user.role === "admin"
                    ? "/dashboard/admin"
                    : user.role === "vendor"
                      ? "/dashboard/vendor"
                      : "/dashboard/user"
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname.startsWith("/dashboard")
                    ? "bg-indigo-900/50 dark:bg-slate-800 text-[#FF6B35] font-semibold"
                    : "text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/30 dark:hover:bg-slate-800/50 hover:text-white"
                  }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Control Section (Dynamic User State Handling & Dark Mode) */}
          <div className="hidden md:flex items-center space-x-4">

            {/* 🌗 Desktop Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl bg-indigo-900/40 dark:bg-slate-800 text-indigo-200 dark:text-amber-400 border border-indigo-700/30 dark:border-slate-700 transition-all hover:text-white active:scale-95"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}

            {isPending ? (
              <div className="flex items-center justify-center w-8 h-8">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-300" />
              </div>
            ) : user ? (
              <div className="relative">
                {/* Profile Trigger Element */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-indigo-900/40 dark:hover:bg-slate-800 focus:outline-none border border-transparent hover:border-indigo-700/50 dark:hover:border-slate-700 transition-all"
                >
                  <Image width={30} height={30}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-[#FF6B35]"
                    src={user?.image || defaultAvatar}
                    alt="User Avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                    }}
                  />
                  <span className="text-sm font-medium text-indigo-50 dark:text-slate-200 max-w-30 truncate">
                    {user?.name || "User"}
                  </span>
                </button>

                {/* Dropdown Menu Box */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-slate-900 text-zinc-800 dark:text-slate-200 shadow-xl ring-1 ring-black/5 dark:ring-slate-800 divide-y divide-zinc-100 dark:divide-slate-800 focus:outline-none transition-all py-1">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-zinc-400 dark:text-slate-500 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-zinc-700 dark:text-slate-300 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-[#FF6B35] px-2 py-0.5 rounded-full">
                        {user?.role || "user"}
                      </span>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-zinc-700 dark:text-slate-300 hover:bg-zinc-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <User className="h-4 w-4 text-zinc-400 dark:text-slate-500" />
                        <span>My Profile</span>
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4 text-red-500 dark:text-red-400" />
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
                  className="text-sm font-medium text-indigo-100 dark:text-slate-300 hover:text-white px-3 py-2 transition-colors"
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

          {/* Mobile View: Hamburger Controls & Theme Sync Panel */}
          <div className="flex md:hidden items-center space-x-2">
            {/* 🌗 Mobile Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-indigo-900/40 dark:bg-slate-800 text-indigo-200 dark:text-amber-400 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-indigo-200 dark:text-slate-300 hover:text-white hover:bg-indigo-900/40 dark:hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Slide Navigation Area Layout Panel */}
      {isOpen && (
        <div className="md:hidden bg-[#1a337a] dark:bg-[#0F172A] border-t border-indigo-900/50 dark:border-slate-800 px-2 pt-2 pb-4 space-y-1 shadow-inner animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${isActive(link.path)
                  ? "bg-indigo-900/70 dark:bg-slate-800 text-[#FF6B35] font-bold"
                  : "text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/40 dark:hover:bg-slate-800/50 hover:text-white"
                }`}
            >
              {link.name}
            </Link>
          ))}

          {!isPending && user && (
            <Link
              href={
                user.role === "admin"
                  ? "/dashboard/admin"
                  : user.role === "vendor"
                    ? "/dashboard/vendor"
                    : "/dashboard/user"
              }
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${pathname.startsWith("/dashboard")
                  ? "bg-indigo-900/70 dark:bg-slate-800 text-[#FF6B35] font-bold"
                  : "text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/40 dark:hover:bg-slate-800/50 hover:text-white"
                }`}
            >
              Dashboard
            </Link>
          )}

          <hr className="border-indigo-900/40 dark:border-slate-800 my-2 mx-3" />

          {/* Mobile Session Actions Panel Box */}
          {isPending ? (
            <div className="flex justify-center py-2">
              <Loader2 className="h-5 w-5 animate-spin text-indigo-300" />
            </div>
          ) : user ? (
            <div className="pt-2 px-3">
              <div className="flex items-center space-x-3 mb-3">
                <Image width={40} height={40}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-[#FF6B35]"
                  src={user?.image || defaultAvatar}
                  alt="User"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{user?.name || "User"}</h4>
                  <p className="text-xs text-indigo-200 dark:text-slate-400 truncate max-w-50">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2.5 w-full text-left px-3 py-2 text-sm text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/40 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
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
                className="w-full text-center py-2.5 text-sm font-medium border border-indigo-700 dark:border-slate-700 rounded-xl text-indigo-100 dark:text-slate-300 hover:bg-indigo-900/30 dark:hover:bg-slate-800/50"
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