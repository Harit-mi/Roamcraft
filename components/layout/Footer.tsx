"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#181614] text-[#E7DFD5] pt-16 pb-28 md:pb-14 border-t border-[#2A2623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2A2623]">
          {/* Brand Colophon */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                ROAMCRAFT
              </span>
              <span className="font-mono text-[9px] text-[#D9822B] tracking-[0.2em] uppercase mt-1">
                An Independent Travel Journal & Field Gazette
              </span>
            </Link>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm font-sans">
              Discover authentic journeys researched by real creators. Day-by-day routes, honest ground costs, and vetted partner hotels across India and international destinations.
            </p>
            <div className="p-4 bg-[#201D1A] rounded-xl border border-[#2E2A26] text-[11px] text-stone-400 leading-relaxed font-mono">
              <span className="font-bold text-stone-300 block mb-1 uppercase tracking-wider text-[9px] text-[#D9822B]">
                Publication & Affiliate Disclosure:
              </span>
              RoamCraft earns partner booking referral commissions from approved hotel booking platforms. All prices shown are estimated ground figures reported by creators. Actual bookings and live rates are fulfilled on partner platforms.
            </div>
          </div>

          {/* Regional Archives */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-stone-300 uppercase tracking-widest mb-4">
              Regional Archives
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-serif italic">
              <li>
                <Link href="/destinations/south-goa" className="hover:text-white transition-colors">
                  South Goa Coves & Latin Quarters
                </Link>
              </li>
              <li>
                <Link href="/destinations/ladakh" className="hover:text-white transition-colors">
                  Leh Ladakh High Passes
                </Link>
              </li>
              <li>
                <Link href="/destinations/kerala" className="hover:text-white transition-colors">
                  Munnar & Alleppey Waterways
                </Link>
              </li>
              <li>
                <Link href="/destinations/rajasthan-heritage" className="hover:text-white transition-colors">
                  Udaipur & Jodhpur Havelis
                </Link>
              </li>
              <li>
                <Link href="/destinations/bali" className="hover:text-white transition-colors">
                  Bali (Ubud & Uluwatu)
                </Link>
              </li>
            </ul>
          </div>

          {/* Field Desks */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-stone-300 uppercase tracking-widest mb-4">
              Expedition Registry
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/discover" className="hover:text-white transition-colors">
                  Field Dispatches
                </Link>
              </li>
              <li>
                <Link href="/itineraries" className="hover:text-white transition-colors">
                  The Itinerary Library
                </Link>
              </li>
              <li>
                <Link href="/creators" className="hover:text-white transition-colors">
                  The Explorers Guild
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white transition-colors">
                  Creator Publishing Desk
                </Link>
              </li>
              <li>
                <Link href="/my-trips" className="hover:text-white transition-colors">
                  Personal Travel Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Legal */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-stone-300 uppercase tracking-widest mb-4">
              Colophon & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-mono text-[11px]">
              <li>
                <Link href="/creator/apply" className="hover:text-white transition-colors text-[#D9822B]">
                  Apply as a Field Creator
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Traveler Preferences
                </Link>
              </li>
              <li>
                <span className="text-stone-500">ASCI / FTC Endorsement Policy</span>
              </li>
              <li>
                <span className="text-stone-500">Editorial Independence Charter</span>
              </li>
              <li>
                <a
                  href="https://www.flaticon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-stone-300 transition-colors"
                >
                  Icons by Freepik from Flaticon
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400 text-[10px]">
          <div>
            © {new Date().getFullYear()} ROAMCRAFT DISPATCH • INDEPENDENT TRAVEL JOURNAL • ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>CURRENCY: INR (₹)</span>
            <span>•</span>
            <span>EDITION: OCTOBER 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
