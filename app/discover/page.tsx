"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  MOCK_DESTINATIONS, 
  MOCK_ITINERARIES, 
  MOCK_VIDEOS, 
  MOCK_CREATORS 
} from "@/lib/data/mock-db";
import { DestinationCard } from "@/components/shared/DestinationCard";
import { VideoCard } from "@/components/shared/VideoCard";
import { CreatorProfileCard } from "@/components/shared/CreatorProfileCard";
import { ItineraryCard } from "@/components/shared/ItineraryCard";
import { FilterDrawer } from "@/components/shared/FilterDrawer";
import { 
  SearchIcon, 
  FilterIcon, 
  CompassIcon, 
  ArrowRightIcon 
} from "@/components/shared/icons";

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialStyle = searchParams.get("style") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState<"all" | "domestic" | "international">("all");
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [maxBudget, setMaxBudget] = useState(60000);
  const [selectedDays, setSelectedDays] = useState("all");
  const [selectedTravelerType, setSelectedTravelerType] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filtered itineraries
  const filteredItineraries = useMemo(() => {
    return MOCK_ITINERARIES.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDest = item.destinationName.toLowerCase().includes(q);
        const matchesCreator = item.creator.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDest && !matchesCreator) return false;
      }
      if (selectedRegion === "domestic" && item.isInternational) return false;
      if (selectedRegion === "international" && !item.isInternational) return false;
      if (selectedStyle && !item.travelStyle.includes(selectedStyle as any)) return false;
      if (item.budgetPerPersonInr > maxBudget) return false;
      if (selectedDays === "weekend" && (item.durationDays < 3 || item.durationDays > 4)) return false;
      if (selectedDays === "week" && (item.durationDays < 5 || item.durationDays > 7)) return false;
      if (selectedDays === "extended" && item.durationDays < 8) return false;
      if (selectedTravelerType && item.travelerType !== selectedTravelerType) return false;
      return true;
    });
  }, [searchQuery, selectedRegion, selectedStyle, maxBudget, selectedDays, selectedTravelerType]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setSelectedStyle("");
    setMaxBudget(60000);
    setSelectedDays("all");
    setSelectedTravelerType("");
    setSelectedSeason("");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedRegion !== "all" ||
    selectedStyle ||
    maxBudget < 60000 ||
    selectedDays !== "all" ||
    selectedTravelerType ||
    selectedSeason;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Header & Prominent Search */}
      <div className="space-y-4 border-b border-[#E7DFD5] pb-8">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#78716C]">
          <span className="text-[#C2542D] font-bold">THE EXPEDITION INDEX</span>
          <span>•</span>
          <span>CURATED CREATOR BLUEPRINTS</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181614] tracking-tight">
          Find Your Next Journey Through Real Creators
        </h1>

        <p className="text-xs sm:text-sm text-[#57534E] max-w-2xl leading-relaxed font-sans">
          Search complete day-by-day itineraries, explore verified ground video observations, and filter expeditions by regional window, party size, and realistic budgets.
        </p>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
          <div className="relative flex-1">
            <SearchIcon size={16} className="text-[#78716C] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations (Goa, Ladakh, Bali...), creators or styles..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] text-xs sm:text-sm font-medium text-[#181614] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C2542D] shadow-xs"
            />
          </div>

          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="px-5 py-3 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] hover:border-[#C2542D] text-[#181614] text-xs sm:text-sm font-mono tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <FilterIcon size={16} className="text-[#C2542D]" />
            <span>Trip Filters {hasActiveFilters && "•"}</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="px-3 py-3 rounded-lg text-xs font-mono uppercase tracking-wider text-[#C2542D] hover:bg-[#F2EDE4] flex items-center justify-center gap-1 shrink-0"
            >
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Style Quick Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs pt-1 font-mono">
          <span className="text-[#78716C] uppercase text-[10px] shrink-0">Ethos:</span>
          {["romantic", "adventure", "food", "relaxation", "culture"].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStyle(selectedStyle === s ? "" : s)}
              className={`px-3 py-1 rounded-lg uppercase text-[10px] tracking-wider shrink-0 transition-all ${
                selectedStyle === s
                  ? "bg-[#C2542D] text-white font-bold"
                  : "bg-[#FAF7F2] text-[#57534E] border border-[#E7DFD5] hover:border-[#C2542D]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: SHORT-VIDEO REELS */}
      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-[#E7DFD5] pb-2">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-0.5">
              CREATOR OBSERVATIONS
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#181614]">
              Field Reels
            </h2>
          </div>
          <Link
            href="/videos/video-1"
            className="text-xs font-semibold text-[#C2542D] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
          >
            <span>Watch In Dedicated Player</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MOCK_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* SECTION 2: TRENDING DESTINATIONS */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider block">
              Popular Regions
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-charcoal-900">
              Trending Destinations
            </h2>
          </div>
          <Link
            href="/destinations"
            className="text-xs font-semibold text-[#C2542D] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
          >
            <span>All Destinations</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {MOCK_DESTINATIONS.slice(0, 4).map((dest) => (
            <DestinationCard key={dest.id} destination={dest} variant="tall" />
          ))}
        </div>
      </section>

      {/* SECTION 3: CURATED ITINERARY COLLECTIONS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#C2542D] uppercase tracking-wider block">
              Field-Tested Routes
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#181614]">
              Featured Itineraries ({filteredItineraries.length})
            </h2>
          </div>
          <Link
            href="/itineraries"
            className="text-xs font-semibold text-[#C2542D] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
          >
            <span>Explore All Itineraries</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        {filteredItineraries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItineraries.map((itin) => (
              <ItineraryCard key={itin.id} itinerary={itin} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FAF7F2] rounded-2xl p-12 text-center border border-[#E7DFD5] shadow-xs space-y-3">
            <CompassIcon size={40} className="text-stone-300 mx-auto" />
            <h3 className="font-bold text-base text-[#181614]">No matching itineraries found</h3>
            <p className="text-xs text-[#57534E] max-w-sm mx-auto">
              Try adjusting your budget, clearing the travel style, or exploring all destinations.
            </p>
            <button
              onClick={handleReset}
              className="mt-2 btn-cta text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* SECTION 4: FEATURED CREATORS */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#C2542D] uppercase tracking-wider block">
              The Navigators
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#181614]">
              Meet Verified Travel Creators
            </h2>
          </div>
          <Link
            href="/creators"
            className="text-xs font-semibold text-[#C2542D] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
          >
            <span>All Creators</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_CREATORS.map((creator) => (
            <CreatorProfileCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      {/* Filter Drawer Component */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        maxBudget={maxBudget}
        setMaxBudget={setMaxBudget}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        selectedTravelerType={selectedTravelerType}
        setSelectedTravelerType={setSelectedTravelerType}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
        onReset={handleReset}
        totalResultsCount={filteredItineraries.length}
      />
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-stone-500">Loading discovery feed...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
