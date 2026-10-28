"use client";

import React from "react";
import Link from "next/link";
import { Destination } from "@/lib/types";
import { LocationPinIcon, CalendarIcon, ClockIcon, ArrowRightIcon } from "@/components/shared/icons";
import { handleImageError } from "@/lib/utils/image-fallback";

interface DestinationCardProps {
  destination: Destination;
  variant?: "tall" | "compact" | "horizontal";
}

export function DestinationCard({ destination, variant = "tall" }: DestinationCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/destinations/${destination.slug}`}
        className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-[#181614] border border-[#E7DFD5] shadow-xs hover:border-[#C2542D] transition-all"
      >
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-[#181614]/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="font-mono text-[9px] tracking-widest text-[#D9822B] uppercase block">
            {destination.stateOrCountry}
          </span>
          <h3 className="font-serif font-bold text-base text-white group-hover:text-[#D9822B] transition-colors">
            {destination.name}
          </h3>
          <span className="font-mono text-[10px] text-stone-300">
            {destination.idealDurationDays} • ₹{destination.avgDailyBudgetInr.toLocaleString("en-IN")}/day
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/destinations/${destination.slug}`}
        className="group p-5 bg-[#FAF7F2] rounded-xl border border-[#E7DFD5] hover:border-[#C2542D] transition-all flex flex-col sm:flex-row gap-5"
      >
        <div className="relative sm:w-52 aspect-[16/10] sm:aspect-auto rounded-lg overflow-hidden bg-stone-100 shrink-0">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            onError={handleImageError}
          />
          <div className="absolute top-2 left-2 bg-[#181614]/80 backdrop-blur-sm text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded">
            {destination.isInternational ? "International" : "Domestic India"}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#78716C] tracking-widest uppercase mb-1">
              <LocationPinIcon size={12} className="text-[#C2542D]" />
              <span>{destination.stateOrCountry}</span>
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#181614] group-hover:text-[#C2542D] transition-colors leading-snug">
              {destination.name}
            </h3>
            <p className="text-xs text-[#57534E] font-serif italic mt-1 line-clamp-2 leading-relaxed">
              &ldquo;{destination.overview}&rdquo;
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {destination.topAttractions.slice(0, 3).map((sight, idx) => (
                <span
                  key={idx}
                  className="bg-[#F2EDE4] text-[#44403C] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-[#E7DFD5]"
                >
                  {sight}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E7DFD5] flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] text-[#181614]">
              EST. ₹{destination.avgDailyBudgetInr.toLocaleString("en-IN")}{" "}
              <span className="text-[#78716C] font-normal">/ day</span>
            </span>
            <span className="font-semibold text-xs text-[#C2542D] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Explore Field Guide</span>
              <ArrowRightIcon size={14} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default "tall" card (Editorial Magazine Cover Style)
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-[#181614] border border-[#E7DFD5] shadow-xs hover:border-[#C2542D] transition-all"
    >
      <img
        src={destination.heroImage}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        loading="lazy"
        onError={handleImageError}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-[#181614]/30 to-transparent" />

      {/* Top Tag */}
      <div className="absolute top-3.5 left-3.5 bg-[#181614]/80 backdrop-blur-sm px-2.5 py-1 rounded text-[#F8F5F0] text-[9px] font-mono tracking-widest uppercase">
        {destination.stateOrCountry}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
        <h3 className="font-serif font-bold text-2xl text-white group-hover:text-[#D9822B] transition-colors leading-tight">
          {destination.name}
        </h3>
        <p className="text-xs text-stone-300 font-serif italic line-clamp-1 opacity-90">
          {destination.overview}
        </p>
        <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-stone-300 border-t border-white/15">
          <span>{destination.idealDurationDays}</span>
          <span className="text-[#D9822B]">₹{destination.avgDailyBudgetInr.toLocaleString("en-IN")}/day</span>
        </div>
      </div>
    </Link>
  );
}
