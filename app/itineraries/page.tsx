"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MOCK_ITINERARIES, MOCK_CREATORS } from "@/lib/data/mock-db";
import { useApp } from "@/lib/context/app-context";
import { ItineraryCard } from "@/components/shared/ItineraryCard";
import { FilterDrawer } from "@/components/shared/FilterDrawer";
import { 
  SearchIcon as Search, 
  FilterIcon as SlidersHorizontal, 
  PlusIcon as Plus, 
  BookOpenIcon as BookOpen, 
  SparklesIcon as Sparkles,
  GridIcon as LayoutGrid,
  ListIcon as ListFilter,
  FilterIcon as RotateCcw
} from "@/components/shared/icons";

function ItinerariesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialStyle = searchParams.get("style") || "";

  const { itineraries } = useApp();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState<"all" | "domestic" | "international">("all");
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [maxBudget, setMaxBudget] = useState(60000);
  const [selectedDays, setSelectedDays] = useState("all");
  const [selectedTravelerType, setSelectedTravelerType] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "budget_low" | "budget_high">("popular");
  const [viewMode, setViewMode] = useState<"grid" | "feed">("grid");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const filteredItineraries = useMemo(() => {
    return itineraries.filter((item) => {
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
    }).sort((a, b) => {
      if (sortBy === "popular") return b.savesCount - a.savesCount;
      if (sortBy === "newest") return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      if (sortBy === "budget_low") return a.budgetPerPersonInr - b.budgetPerPersonInr;
      if (sortBy === "budget_high") return b.budgetPerPersonInr - a.budgetPerPersonInr;
      return 0;
    });
  }, [itineraries, searchQuery, selectedRegion, selectedStyle, maxBudget, selectedDays, selectedTravelerType, sortBy]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Editorial Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#78716C] mb-1">
            <span className="text-[#C2542D] font-bold">THE ROUTE REGISTRY</span>
            <span>•</span>
            <span>EXPEDITION BLUEPRINTS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181614] tracking-tight">
            The Itinerary Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-xl font-sans">
            Complete day-by-day expedition schedules with honest ground timings, local food recommendations, and verified budget breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <Link
            href="/itineraries/create"
            className="px-4 py-2.5 rounded-xl bg-[#263D33] hover:bg-[#1B2D26] text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#D9822B]" />
            <span>Publish Route</span>
          </Link>

          <div className="inline-flex rounded-xl bg-[#FAF7F2] p-1 border border-[#E7DFD5]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "grid" ? "bg-[#C2542D] text-white shadow-xs" : "text-[#78716C]"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("feed")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "feed" ? "bg-[#C2542D] text-white shadow-xs" : "text-[#78716C]"
              }`}
              title="Journal Feed View"
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FAF7F2] p-3 rounded-2xl border border-[#E7DFD5] shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, destination, or creator..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-medium text-[#181614] bg-transparent placeholder:text-[#A8A29E] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto font-mono text-xs">
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="px-3 py-1.5 rounded-xl border border-[#E7DFD5] text-xs font-semibold tracking-wider text-[#181614] hover:border-[#C2542D] flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C2542D]" />
            <span>Filters {hasActiveFilters && "•"}</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#F2EDE4] border border-[#E7DFD5] rounded-xl px-2.5 py-1.5 text-xs font-medium text-[#181614] focus:outline-none cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Recently Published</option>
            <option value="budget_low">Budget: Low to High</option>
            <option value="budget_high">Budget: High to Low</option>
          </select>
        </div>
      </div>

      {/* Itineraries Display */}
      {filteredItineraries.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItineraries.map((itin) => (
              <ItineraryCard key={itin.id} itinerary={itin} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItineraries.map((itin) => (
              <ItineraryCard key={itin.id} itinerary={itin} layout="horizontal" />
            ))}
          </div>
        )
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs space-y-3">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-bold text-base text-charcoal-900">No matching itineraries found</h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
            Try adjusting your budget or clearing travel style filters.
          </p>
          <button
            onClick={handleReset}
            className="mt-2 px-4 py-2 rounded-xl bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-600"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Reusable Filter Drawer */}
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

export default function ItinerariesIndexPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-stone-500">Loading itineraries...</div>}>
      <ItinerariesContent />
    </Suspense>
  );
}
