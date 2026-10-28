"use client";

import React from "react";
import Link from "next/link";
import { Itinerary } from "@/lib/types";
import { useApp } from "@/lib/context/app-context";
import { HeartIcon, ClockIcon, LocationPinIcon, ArrowRightIcon } from "@/components/shared/icons";
import { handleImageError } from "@/lib/utils/image-fallback";

interface ItineraryCardProps {
  itinerary: Itinerary;
  layout?: "grid" | "horizontal" | "compact";
}

export function ItineraryCard({ itinerary, layout = "grid" }: ItineraryCardProps) {
  const { isItinerarySaved, toggleSaveItinerary } = useApp();
  const saved = isItinerarySaved(itinerary.id);
  const totalStops = itinerary.days.reduce((acc, d) => acc + d.stops.length, 0);

  if (layout === "horizontal") {
    return (
      <article className="bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#E7DFD5] hover:border-[#C2542D] transition-all duration-300 flex flex-col md:flex-row group">
        <div className="relative md:w-5/12 aspect-[16/10] md:aspect-auto overflow-hidden bg-stone-100">
          <img
            src={itinerary.coverImage}
            alt={itinerary.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={handleImageError}
          />
          <div className="absolute top-3 left-3 bg-[#181614]/85 backdrop-blur-sm text-[#F8F5F0] text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded">
            {itinerary.durationDays} DAYS • {itinerary.destinationName}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSaveItinerary(itinerary.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#181614]/60 hover:bg-[#181614]/90 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-90 border border-white/15 hover:border-white/40 shadow-xs"
            aria-label="Save itinerary"
          >
            <HeartIcon size={14} filled={saved} className={`transition-transform duration-200 active:scale-125 ${saved ? "text-[#C2542D]" : ""}`} />
          </button>
        </div>

        <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[10px] font-mono tracking-widest uppercase text-[#78716C]">
              <span>DISPATCH REF: {itinerary.slug.slice(0, 8)}</span>
              <span>•</span>
              <span>{itinerary.travelerType}</span>
            </div>

            <Link href={`/itineraries/${itinerary.slug}`}>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#181614] group-hover:text-[#C2542D] transition-colors leading-snug">
                {itinerary.title}
              </h3>
            </Link>
            <p className="text-xs text-[#57534E] font-serif italic mt-2 line-clamp-2 leading-relaxed">
              &ldquo;{itinerary.tagline}&rdquo;
            </p>
          </div>

          <div className="pt-4 border-t border-[#E7DFD5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={itinerary.creator.avatarUrl}
                alt={itinerary.creator.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#C2542D]/40"
              />
              <div className="text-left">
                <span className="text-[11px] font-semibold text-[#181614] block leading-tight">
                  {itinerary.creator.name}
                </span>
                <span className="text-[9px] text-[#78716C] font-mono uppercase">Field Explorer</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#78716C] font-mono uppercase block">Est. Budget</span>
              <span className="text-xs font-bold text-[#181614] font-mono">
                ₹{itinerary.budgetPerPersonInr.toLocaleString("en-IN")}{" "}
                <span className="text-[10px] text-stone-400 font-normal">/ pax</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default Grid Card
  return (
    <article className="bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#E7DFD5] hover:border-[#C2542D] transition-all duration-300 flex flex-col group">
      {/* Photography Header */}
      <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
        <img
          src={itinerary.coverImage}
          alt={itinerary.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={handleImageError}
        />
        <div className="absolute top-3 left-3 bg-[#181614]/85 backdrop-blur-sm text-[#F8F5F0] text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded">
          {itinerary.destinationName}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaveItinerary(itinerary.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#181614]/60 hover:bg-[#181614]/90 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-90 border border-white/15 hover:border-white/40 shadow-xs"
          aria-label="Save itinerary"
        >
          <HeartIcon size={14} filled={saved} className={`transition-transform duration-200 active:scale-125 ${saved ? "text-[#C2542D]" : ""}`} />
        </button>

        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className="bg-[#FAF7F2]/95 backdrop-blur-sm text-[#181614] text-[10px] font-mono tracking-wider font-semibold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
            <ClockIcon size={12} className="text-[#78716C]" />
            {itinerary.durationDays} DAYS • {totalStops} STOPS
          </span>
        </div>
      </div>

      {/* Editorial Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#78716C] mb-1.5">
            <span>{itinerary.travelerType}</span>
            <span>{itinerary.recommendedSeason}</span>
          </div>

          <Link href={`/itineraries/${itinerary.slug}`}>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#181614] leading-snug group-hover:text-[#C2542D] transition-colors line-clamp-2">
              {itinerary.title}
            </h3>
          </Link>

          <p className="text-xs text-[#57534E] font-serif italic mt-2 line-clamp-2 leading-relaxed">
            &ldquo;{itinerary.tagline}&rdquo;
          </p>
        </div>

        {/* Footer Ledger */}
        <div className="pt-3 border-t border-[#E7DFD5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={itinerary.creator.avatarUrl}
              alt={itinerary.creator.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-[#C2542D]/30"
            />
            <div>
              <span className="text-[11px] font-semibold text-[#181614] block leading-tight">
                {itinerary.creator.name}
              </span>
              <span className="text-[9px] text-[#78716C] font-mono">Dispatched Route</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] text-[#78716C] font-mono uppercase block">Budget Est.</span>
            <span className="text-xs font-bold text-[#181614] font-mono">
              ₹{itinerary.budgetPerPersonInr.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
