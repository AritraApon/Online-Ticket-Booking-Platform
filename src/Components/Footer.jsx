import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-[#09090b] text-zinc-400 border-t border-zinc-900/60 overflow-hidden">

      {/* Dynamic Background Glow Effect (Modern Touch) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B35]/5 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none select-none" />

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">

        {/* 4 Columns Grid Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">

          {/* Column 1: Brand & Description */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#FF6B35] rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center">
                {/* Custom Bus SVG Icon */}
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v10h1M14 17H9" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Ticket<span className="text-[#FF6B35]">Bari</span>
              </span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-zinc-500 max-w-xs">
              Book bus, train, launch & flight tickets easily. Your trusted transit booking companion network.
            </p>

            {/* Transit Micro-Icons Layout (All SVG) */}
            <div className="flex items-center gap-3.5 pt-2 text-zinc-600">
              {/* Bus */}
              <svg className="h-4 w-4 hover:text-[#FF6B35] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M4 12h16"/></svg>
              {/* Train */}
              <svg className="h-4 w-4 hover:text-[#FF6B35] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM4 11h16M12 3v8"/></svg>
              {/* Ship/Launch */}
              <svg className="h-4 w-4 hover:text-[#FF6B35] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 10V4h-3v3H5V4H2v6c0 1.7.9 3.5 2.7 4.8L12 19l7.3-4.2z"/></svg>
              {/* Plane */}
              <svg className="h-4 w-4 hover:text-[#FF6B35] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-2-2h-3.5l-4-4H8.5l2 4H6L4.5 5H2v3l2 2v4l-2 2v3h2.5L6 16h4.5l-2 4h3l4-4H19a2 2 0 0 0 2-2z"/></svg>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-medium text-zinc-500">
              {[
                { label: 'Home', path: '/' },
                { label: 'All Tickets', path: "/all-tickets" },
                { label: 'Support', path: '/support' },
                { label: 'About Us', path: '/about' }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.path}
                    className="hover:text-white flex items-center gap-1 group transition-colors duration-200"
                  >
                    <span>{link.label}</span>
                    {/* Tiny Arrow Up Right SVG */}
                    <svg className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
              Contact Info
            </h4>
            <ul className="space-y-3.5 text-sm font-medium text-zinc-500">
              <li>
                <a href="mailto:support@ticketbari.com" className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                  {/* Mail SVG */}
                  <svg className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>support@ticketbari.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+8801700000000" className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                  {/* Phone SVG */}
                  <svg className="h-4 w-4 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+880 1700-000000</span>
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                  {/* Brand Facebook SVG */}
                  <svg className="h-4 w-4 text-zinc-600 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                  </svg>
                  <span>Official Facebook Page</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
              Payment Methods
            </h4>
            <p className="text-xs font-medium text-zinc-600">
              Securely encrypted transactions pipelines.
            </p>

            {/* Stripe & SSL Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-900 bg-[#121214]/60 backdrop-blur-md text-xs font-semibold text-zinc-300">
                {/* Credit Card Card SVG */}
                <svg className="h-3.5 w-3.5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                <span>Stripe</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-900 bg-[#121214]/60 backdrop-blur-md text-xs font-semibold text-zinc-300">
                <span className="text-emerald-500 font-extrabold tracking-tight">SSL</span>
                <span>Commerz</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Segment */}
        <div className="mt-14 pt-6 border-t border-zinc-900/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-600">
          <p>© 2025 TicketBari. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}