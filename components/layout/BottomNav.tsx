"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  CompassIcon, 
  LocationPinIcon, 
  SuitcaseIcon, 
  BookmarkIcon, 
  UserIcon 
} from "@/components/shared/icons";
import { useApp } from "@/lib/context/app-context";

export function BottomNav() {
  const pathname = usePathname();
  const { savedItineraryIds, savedVideoIds, personalTrips } = useApp();
  const totalSaved = savedItineraryIds.length + savedVideoIds.length;

  const items = [
    { href: "/discover", label: "Explore", icon: CompassIcon },
    { href: "/destinations", label: "Places", icon: LocationPinIcon },
    { href: "/my-trips", label: "Trips", icon: SuitcaseIcon, badge: personalTrips.length },
    { href: "/saved", label: "Saved", icon: BookmarkIcon, badge: totalSaved },
    { href: "/profile", label: "Profile", icon: UserIcon },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#E7DFD5] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-safe">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center relative py-1 transition-colors ${
                isActive ? "text-[#C2542D]" : "text-[#78716C] hover:text-[#181614]"
              }`}
            >
              <div className="relative">
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.6} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 bg-[#C2542D] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[9px] mt-1 font-mono uppercase tracking-wider ${isActive ? "font-bold text-[#C2542D]" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
