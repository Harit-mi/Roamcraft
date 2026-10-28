"use client";

import React, { useState } from "react";
import { MOCK_DESTINATIONS } from "@/lib/data/mock-db";
import { DestinationCard } from "@/components/shared/DestinationCard";
import { 
  SearchIcon, 
  LocationPinIcon as MapPin, 
  GlobeIcon as Globe, 
  CompassIcon as Compass, 
  FilterIcon as Filter 
} from "@/components/shared/icons";

export default function DestinationsIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<"all" | "domestic" | "international">("all");

  const filteredDestinations = MOCK_DESTINATIONS.filter((d) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!d.name.toLowerCase().includes(q) && !d.stateOrCountry.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (regionFilter === "domestic" && d.isInternational) return false;
    if (regionFilter === "international" && !d.isInternational) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-[#E7DFD5] pb-8 space-y-3">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#78716C]">
          <span className="text-[#C2542D] font-bold">THE GEOGRAPHIC GAZETTE</span>
          <span>•</span>
          <span>REGIONAL CORRESPONDENCE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181614] tracking-tight">
          Explore Regional Archives
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] max-w-2xl leading-relaxed">
          Detailed geographic field guides across India and selected international sanctuaries. Every guide details optimal seasonal windows, realistic INR daily spending, and connected creator routes.
        </p>

        {/* Search & Region Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <SearchIcon size={16} className="text-[#78716C] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by state or destination name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] text-xs sm:text-sm font-medium text-[#181614] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C2542D] shadow-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-[10px] uppercase text-[#78716C] mr-1">Scope:</span>
            {(["all", "domestic", "international"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`px-3 py-1.5 rounded-lg uppercase text-[10px] tracking-wider transition-all ${
                  regionFilter === r
                    ? "bg-[#C2542D] text-white font-bold"
                    : "bg-[#FAF7F2] text-[#57534E] border border-[#E7DFD5] hover:border-[#C2542D]"
                }`}
              >
                {r === "all" ? "All Archives" : r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} variant="tall" />
        ))}
      </div>
    </div>
  );
}
