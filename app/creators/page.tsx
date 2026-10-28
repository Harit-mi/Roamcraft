"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_CREATORS } from "@/lib/data/mock-db";
import { CreatorProfileCard } from "@/components/shared/CreatorProfileCard";
import { 
  UsersIcon as Users, 
  SearchIcon as Search, 
  SparklesIcon as Sparkles, 
  ArrowRightIcon as ArrowRight, 
  ShieldCheckIcon as ShieldCheck 
} from "@/components/shared/icons";

export default function CreatorsIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const allSpecialties = Array.from(
    new Set(MOCK_CREATORS.flatMap((c) => c.specialties))
  );

  const filteredCreators = MOCK_CREATORS.filter((creator) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!creator.name.toLowerCase().includes(q) && !creator.handle.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedSpecialty && !creator.specialties.includes(selectedSpecialty)) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#78716C] mb-1">
            <span className="text-[#C2542D] font-bold">THE CREATOR REGISTRY</span>
            <span>•</span>
            <span>FIELD CORRESPONDENTS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181614] tracking-tight">
            The Explorers Guild
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-xl font-sans">
            Independent photographers, motorcycle nomads, and regional culinary writers publishing verified ground notes across India and overseas.
          </p>
        </div>

        <Link
          href="/creator/apply"
          className="px-4 py-2.5 rounded-xl bg-[#263D33] hover:bg-[#1B2D26] text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
          <span>Apply to Publish</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by creator name or handle..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] text-xs sm:text-sm font-medium text-[#181614] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C2542D] shadow-xs"
          />
        </div>

        {/* Specialty Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
          <span className="text-[10px] uppercase text-[#78716C] mr-1 shrink-0">Specialty:</span>
          <button
            onClick={() => setSelectedSpecialty("")}
            className={`px-3 py-1 rounded-lg uppercase text-[10px] tracking-wider shrink-0 transition-all ${
              selectedSpecialty === ""
                ? "bg-[#C2542D] text-white font-bold"
                : "bg-[#FAF7F2] text-[#57534E] border border-[#E7DFD5] hover:border-[#C2542D]"
            }`}
          >
            All Specialties
          </button>
          {allSpecialties.slice(0, 4).map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(selectedSpecialty === spec ? "" : spec)}
              className={`px-3 py-1 rounded-lg uppercase text-[10px] tracking-wider shrink-0 transition-all ${
                selectedSpecialty === spec
                  ? "bg-[#C2542D] text-white font-bold"
                  : "bg-[#FAF7F2] text-[#57534E] border border-[#E7DFD5] hover:border-[#C2542D]"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator) => (
          <CreatorProfileCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
}
