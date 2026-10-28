"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_ITINERARIES, MOCK_CREATORS } from "@/lib/data/mock-db";
import { Itinerary, TravelStyle } from "@/lib/types";
import { ItineraryCard } from "@/components/shared/ItineraryCard";
import { 
  SearchIcon as Search, 
  FilterIcon as SlidersHorizontal, 
  XIcon as X, 
  SparklesIcon as Sparkles,
  LocationPinIcon as MapPin,
  CalendarIcon as Calendar,
  RupeeIcon as IndianRupee,
  CompassIcon as Compass,
  GridIcon as LayoutGrid,
  ListIcon as ListFilter,
  FilterIcon as RotateCcw
} from "@/components/shared/icons";

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialStyle = searchParams.get("style") || "";
  const initialBudget = searchParams.get("budget") || "";
  const initialInternational = searchParams.get("international") === "true";
  const initialCreator = searchParams.get("creator") || "";

  // State Filters
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState<"all" | "domestic" | "international">(
    initialInternational ? "international" : "all"
  );
  const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle);
  const [maxBudget, setMaxBudget] = useState<number>(initialBudget ? parseInt(initialBudget) : 60000);
  const [selectedDays, setSelectedDays] = useState<string>("all");
  const [selectedCreator, setSelectedCreator] = useState<string>(initialCreator);
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "budget_low" | "budget_high">("popular");
  const [viewMode, setViewMode] = useState<"grid" | "feed">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const travelStyles: { label: string; value: TravelStyle }[] = [
    { label: "Adventure", value: "adventure" },
    { label: "Relaxation", value: "relaxation" },
    { label: "Food & Wine", value: "food" },
    { label: "Culture & Heritage", value: "culture" },
    { label: "Romantic", value: "romantic" },
    { label: "Luxury", value: "luxury" },
    { label: "Family", value: "family" },
    { label: "Solo", value: "solo" },
    { label: "Nature", value: "nature" },
  ];

  // Filtering Logic
  const filteredItineraries = useMemo(() => {
    return MOCK_ITINERARIES.filter((item) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDest = item.destinationName.toLowerCase().includes(q);
        const matchesCreator = item.creator.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDest && !matchesCreator) return false;
      }

      // Region filter
      if (selectedRegion === "domestic" && item.isInternational) return false;
      if (selectedRegion === "international" && !item.isInternational) return false;

      // Travel style filter
      if (selectedStyle && !item.travelStyle.includes(selectedStyle as TravelStyle)) return false;

      // Budget filter
      if (item.budgetPerPersonInr > maxBudget) return false;

      // Days filter
      if (selectedDays === "weekend" && (item.durationDays < 3 || item.durationDays > 4)) return false;
      if (selectedDays === "week" && (item.durationDays < 5 || item.durationDays > 7)) return false;
      if (selectedDays === "extended" && item.durationDays < 8) return false;

      // Creator filter
      if (selectedCreator && item.creator.name !== selectedCreator) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "popular") return b.savesCount - a.savesCount;
      if (sortBy === "newest") return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      if (sortBy === "budget_low") return a.budgetPerPersonInr - b.budgetPerPersonInr;
      if (sortBy === "budget_high") return b.budgetPerPersonInr - a.budgetPerPersonInr;
      return 0;
    });
  }, [
    searchQuery,
    selectedRegion,
    selectedStyle,
    maxBudget,
    selectedDays,
    selectedCreator,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setSelectedStyle("");
    setMaxBudget(60000);
    setSelectedDays("all");
    setSelectedCreator("");
    setSortBy("popular");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedRegion !== "all" ||
    selectedStyle ||
    maxBudget < 60000 ||
    selectedDays !== "all" ||
    selectedCreator;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            Creator Travel Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight">
            Explore Creator Itineraries
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-xl">
            Filter by duration, style, and realistic per-person INR budget. Copy any route into your personal trip planner with one click.
          </p>
        </div>

        {/* View Mode Toggle & Mobile Filter Button */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-charcoal-800 shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-forest-700" />
            <span>Filters {hasActiveFilters && "•"}</span>
          </button>

          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "grid" ? "bg-white text-forest-700 shadow-xs" : "text-stone-500"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("feed")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "feed" ? "bg-white text-forest-700 shadow-xs" : "text-stone-500"
              }`}
              title="Feed / Detailed View"
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 rounded-3xl border border-stone-200 shadow-sm self-start sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="font-bold text-sm text-charcoal-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-forest-700" />
              Filter Results
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-ochre-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Search Box */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1.5">
              Keyword or Place
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ladakh, Goa..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-700"
              />
            </div>
          </div>

          {/* Region Tabs */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1.5">
              Region
            </label>
            <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedRegion("all")}
                className={`py-1.5 rounded-lg transition-all ${
                  selectedRegion === "all" ? "bg-white text-forest-700 shadow-xs" : "text-stone-600"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedRegion("domestic")}
                className={`py-1.5 rounded-lg transition-all ${
                  selectedRegion === "domestic" ? "bg-white text-forest-700 shadow-xs" : "text-stone-600"
                }`}
              >
                Domestic
              </button>
              <button
                onClick={() => setSelectedRegion("international")}
                className={`py-1.5 rounded-lg transition-all ${
                  selectedRegion === "international" ? "bg-white text-forest-700 shadow-xs" : "text-stone-600"
                }`}
              >
                International
              </button>
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1.5">
              Travel Style
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedStyle("")}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                  selectedStyle === ""
                    ? "bg-forest-700 text-white border-forest-700"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                All Styles
              </button>
              {travelStyles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => setSelectedStyle(style.value)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                    selectedStyle === style.value
                      ? "bg-forest-700 text-white border-forest-700"
                      : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trip Duration */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1.5">
              Duration
            </label>
            <select
              value={selectedDays}
              onChange={(e) => setSelectedDays(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-forest-700"
            >
              <option value="all">Any Length</option>
              <option value="weekend">Short Weekend (3-4 Days)</option>
              <option value="week">Classic Week (5-7 Days)</option>
              <option value="extended">Deep Dive (8+ Days)</option>
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-charcoal-500 mb-1.5">
              <span>Max Budget / Person</span>
              <span className="text-forest-700 font-bold">₹{maxBudget.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="60000"
              step="5000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(parseInt(e.target.value))}
              className="w-full accent-forest-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>₹10,000</span>
              <span>₹60,000+</span>
            </div>
          </div>

          {/* Creator Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1.5">
              Creator
            </label>
            <select
              value={selectedCreator}
              onChange={(e) => setSelectedCreator(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-forest-700"
            >
              <option value="">All Verified Creators</option>
              {MOCK_CREATORS.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.handle})
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort Bar */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <span className="text-xs font-semibold text-charcoal-700">
              Showing <strong className="text-charcoal-900">{filteredItineraries.length}</strong> Creator Itineraries
            </span>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <span className="text-stone-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 font-semibold text-charcoal-900 focus:outline-none focus:border-forest-700"
              >
                <option value="popular">Most Popular (Saves)</option>
                <option value="newest">Recently Published</option>
                <option value="budget_low">Budget: Low to High</option>
                <option value="budget_high">Budget: High to Low</option>
              </select>
            </div>
          </div>

          {/* Itineraries List / Grid */}
          {filteredItineraries.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-charcoal-900">No itineraries match your criteria</h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Try widening your budget, resetting travel style, or exploring all destinations.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 rounded-xl bg-forest-700 text-white text-xs font-semibold hover:bg-forest-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="font-bold text-base text-charcoal-900">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-lg text-stone-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">Search Place</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Goa, Ladakh"
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold"
              />
            </div>

            {/* Region */}
            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold"
              >
                <option value="all">All Regions</option>
                <option value="domestic">Domestic (India)</option>
                <option value="international">International</option>
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">Travel Style</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold"
              >
                <option value="">All Styles</option>
                {travelStyles.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <div className="flex justify-between text-xs font-bold text-charcoal-700 mb-1">
                <span>Max Budget</span>
                <span className="text-forest-700">₹{maxBudget.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="60000"
                step="5000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                className="w-full accent-forest-700"
              />
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-charcoal-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-forest-700 text-white text-xs font-semibold"
              >
                Apply ({filteredItineraries.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-stone-500">Loading creator itineraries...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
