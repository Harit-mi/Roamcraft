"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/app-context";
import { UserRole } from "@/lib/types";
import { 
  CompassIcon, 
  LocationPinIcon, 
  BookmarkIcon, 
  UserIcon, 
  SparklesIcon, 
  MenuIcon, 
  XIcon, 
  PlusIcon, 
  SuitcaseIcon, 
  UsersIcon, 
  BookOpenIcon,
  ArrowRightIcon 
} from "@/components/shared/icons";

export function Navbar() {
  const pathname = usePathname();
  const { role, setRole, savedItineraryIds, savedVideoIds, personalTrips } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalSaved = savedItineraryIds.length + savedVideoIds.length;

  const navLinks = [
    { href: "/discover", label: "Dispatches", icon: CompassIcon },
    { href: "/destinations", label: "Destinations", icon: LocationPinIcon },
    { href: "/itineraries", label: "Routes & Guides", icon: BookOpenIcon },
    { href: "/creators", label: "Field Explorers", icon: UsersIcon },
    { href: "/my-trips", label: "My Journal", icon: SuitcaseIcon, badge: personalTrips.length },
    { href: "/studio", label: "Creator Desk", icon: SparklesIcon },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5F0]/95 backdrop-blur-md border-b border-[#E7DFD5]">
      {/* Editorial Top Gazette Strip */}
      <div className="bg-[#181614] text-[#E7DFD5] text-[10px] tracking-widest uppercase px-4 sm:px-8 py-1.5 flex items-center justify-between border-b border-[#2A2623]">
        <div className="flex items-center gap-3">
          <span className="font-serif italic tracking-normal text-[#D9822B] lowercase text-xs">vol. iv</span>
          <span className="hidden sm:inline text-stone-500">•</span>
          <span className="hidden sm:inline font-mono text-[9px] text-stone-400">AN INDEPENDENT TRAVEL JOURNAL</span>
        </div>

        {/* Interactive Role Switcher Credential */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[9px] text-stone-400">View As:</span>
          <div className="inline-flex rounded-full bg-[#262220] p-0.5 border border-[#3A3430]">
            {(["traveler", "creator", "admin"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-2 py-0.5 rounded-full text-[9px] tracking-wider uppercase font-semibold transition-all ${
                  role === r
                    ? "bg-[#C2542D] text-white shadow-xs"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {r === "creator" ? "Creator" : r === "admin" ? "Editor" : "Traveler"}
              </button>
            ))}
          </div>
          <span className="hidden lg:inline text-stone-600 pl-2">|</span>
          <span className="hidden lg:inline font-mono text-[9px] text-[#D9822B]">₹ INR PRICING</span>
        </div>
      </div>

      {/* Main Journal Masthead Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Masthead Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex flex-col group">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#181614] group-hover:text-[#C2542D] transition-colors leading-none">
              ROAMCRAFT
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-[#78716C] tracking-[0.2em] uppercase mt-1">
              Field Journal of Creator Routes
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 pl-4 border-l border-[#E7DFD5]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs tracking-wide uppercase transition-all ${
                    isActive
                      ? "text-[#C2542D] font-bold border-b-2 border-[#C2542D] bg-[#F2EDE4]/50"
                      : "text-[#57534E] hover:text-[#181614] hover:bg-[#F2EDE4]/70 font-medium"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && link.badge > 0 ? (
                    <span className="ml-1.5 text-[9px] px-1.5 py-0.2 bg-[#C2542D] text-white rounded-full">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/itineraries/create"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-semibold tracking-wide transition-all duration-200 shadow-xs hover:shadow-md active:scale-95"
          >
            <PlusIcon size={14} className="text-[#D9822B]" />
            <span>Publish Route</span>
          </Link>

          <Link
            href="/saved"
            className="btn-icon w-9 h-9 relative"
            title="Saved Journal Dispatches"
            aria-label="Saved items"
          >
            <BookmarkIcon size={16} className="text-[#57534E]" />
            {totalSaved > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C2542D] text-white text-[9px] font-bold flex items-center justify-center">
                {totalSaved}
              </span>
            )}
          </Link>

          <Link
            href="/profile"
            className="btn-icon w-9 h-9"
            title="Passport & Settings"
            aria-label="Profile"
          >
            <UserIcon size={16} className="text-[#57534E]" />
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden btn-icon w-9 h-9"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5F0] border-t border-[#E7DFD5] px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors ${
                    isActive
                      ? "bg-[#C2542D] text-white"
                      : "text-[#57534E] hover:bg-[#F2EDE4]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{link.label}</span>
                  </div>
                  <ArrowRightIcon size={14} className="opacity-60" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-[#E7DFD5] flex gap-2">
            <Link
              href="/itineraries/create"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 rounded-lg bg-[#263D33] text-white text-xs font-semibold text-center uppercase tracking-wide"
            >
              + Publish Route
            </Link>
            <Link
              href="/creator/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 rounded-lg bg-[#F2EDE4] text-[#181614] border border-[#E7DFD5] text-xs font-semibold text-center uppercase tracking-wide"
            >
              Join Guild
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
