"use client";

import React from "react";
import { TravelStyle, TravelerType } from "@/lib/types";
import { FilterIcon, XIcon, CompassIcon, RefreshIcon as RotateCcw } from "@/components/shared/icons";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedRegion: "all" | "domestic" | "international";
  setSelectedRegion: (val: "all" | "domestic" | "international") => void;
  selectedStyle: string;
  setSelectedStyle: (val: string) => void;
  maxBudget: number;
  setMaxBudget: (val: number) => void;
  selectedDays: string;
  setSelectedDays: (val: string) => void;
  selectedTravelerType: string;
  setSelectedTravelerType: (val: string) => void;
  selectedSeason: string;
  setSelectedSeason: (val: string) => void;
  onReset: () => void;
  totalResultsCount: number;
}

export function FilterDrawer({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedStyle,
  setSelectedStyle,
  maxBudget,
  setMaxBudget,
  selectedDays,
  setSelectedDays,
  selectedTravelerType,
  setSelectedTravelerType,
  selectedSeason,
  setSelectedSeason,
  onReset,
  totalResultsCount,
}: FilterDrawerProps) {
  if (!isOpen) return null;

  const styles: TravelStyle[] = [
    "adventure",
    "relaxation",
    "food",
    "culture",
    "luxury",
    "family",
    "romantic",
    "solo",
    "nature",
  ];

  const travelerTypes: TravelerType[] = [
    "Couples",
    "Solo Traveler",
    "Families",
    "Group of Friends",
    "Honeymooners",
    "Budget Explorers",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-sm bg-[#FAF7F2] h-full p-6 sm:p-7 overflow-y-auto space-y-6 shadow-2xl border-l border-[#E7DFD5]">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E7DFD5]">
          <div className="flex items-center gap-2">
            <FilterIcon size={16} className="text-[#C2542D]" />
            <h3 className="font-serif text-lg font-medium text-[#181614]">Trip Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="btn-icon-sm"
            aria-label="Close filters"
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-[#8C827A] block">
            GEOGRAPHIC SPHERE
          </label>
          <div className="grid grid-cols-3 gap-1 bg-[#F8F5F0] p-1 rounded-lg border border-[#E7DFD5] text-xs font-mono">
            {(["all", "domestic", "international"] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`py-1.5 rounded uppercase text-[10px] transition-all ${
                  selectedRegion === reg ? "bg-[#181614] text-[#FAF7F2] font-semibold shadow-xs" : "text-[#5C554E]"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Style */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-[#8C827A] block">
            TRAVEL DISCIPLINE & STYLE
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedStyle("")}
              className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                selectedStyle === ""
                  ? "bg-[#181614] text-[#FAF7F2] border-[#181614] font-semibold"
                  : "bg-[#F8F5F0] text-[#5C554E] border-[#E7DFD5] hover:text-[#181614]"
              }`}
            >
              All Disciplines
            </button>
            {styles.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStyle(s)}
                className={`text-xs px-2.5 py-1 rounded-md border capitalize transition-all ${
                  selectedStyle === s
                    ? "bg-[#181614] text-[#FAF7F2] border-[#181614] font-semibold"
                    : "bg-[#F8F5F0] text-[#5C554E] border-[#E7DFD5] hover:text-[#181614]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2 bg-[#F8F5F0] p-4 rounded-xl border border-[#E7DFD5]">
          <div className="flex justify-between text-xs font-semibold text-[#181614]">
            <span className="font-mono text-[10px] uppercase text-[#8C827A]">MAX BUDGET / PERSON</span>
            <span className="font-mono font-bold text-[#C2542D]">₹{maxBudget.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min="10000"
            max="60000"
            step="5000"
            value={maxBudget}
            onChange={(e) => setMaxBudget(parseInt(e.target.value))}
            className="w-full accent-[#C2542D] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#8C827A]">
            <span>₹10,000</span>
            <span>₹60,000+</span>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-[#8C827A] block">
            EXPEDITION DURATION
          </label>
          <select
            value={selectedDays}
            onChange={(e) => setSelectedDays(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs font-sans text-[#181614] focus:outline-none"
          >
            <option value="all">Any Length</option>
            <option value="weekend">Quick Weekend (3-4 Days)</option>
            <option value="week">Classic Week (5-7 Days)</option>
            <option value="extended">Deep Dive (8+ Days)</option>
          </select>
        </div>

        {/* Traveler Type */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-[#8C827A] block">
            TRAVELER PERSONA
          </label>
          <select
            value={selectedTravelerType}
            onChange={(e) => setSelectedTravelerType(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs font-sans text-[#181614] focus:outline-none"
          >
            <option value="">All Traveler Personas</option>
            {travelerTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Season or Month */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-[#8C827A] block">
            RECOMMENDED SEASON
          </label>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs font-sans text-[#181614] focus:outline-none"
          >
            <option value="">Any Season</option>
            <option value="winter">Winter (Nov - Feb)</option>
            <option value="monsoon">Monsoon Greenery (Jul - Sep)</option>
            <option value="summer">Summer / High Passes (May - Jun)</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex gap-2.5 border-t border-[#E7DFD5]">
          <button
            onClick={onReset}
            className="flex-1 py-2.5 rounded-lg border border-[#E7DFD5] bg-[#F8F5F0] hover:bg-[#E7DFD5] text-xs font-semibold text-[#181614] flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98]"
          >
            <RotateCcw size={14} className="text-[#8C827A]" />
            <span>Reset</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            Show ({totalResultsCount})
          </button>
        </div>
      </div>
    </div>
  );
}
