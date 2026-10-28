"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/app-context";
import { ItineraryCard } from "@/components/shared/ItineraryCard";
import { VideoCard } from "@/components/shared/VideoCard";
import { 
  BookmarkIcon as Bookmark, 
  PlayCircleIcon as Video, 
  CompassIcon as Compass, 
  CalendarIcon as Calendar, 
  LocationPinIcon as MapPin, 
  UsersIcon as Users, 
  ArrowRightIcon as ArrowRight,
  SuitcaseIcon as Luggage,
  SparklesIcon as Sparkles
} from "@/components/shared/icons";

export default function SavedItemsPage() {
  const { savedItineraryIds, savedVideoIds, personalTrips, itineraries, videos } = useApp();
  const [activeTab, setActiveTab] = useState<"itineraries" | "videos" | "trips">("itineraries");

  const savedItineraries = itineraries.filter((i) => savedItineraryIds.includes(i.id));
  const savedVideos = videos.filter((v) => savedVideoIds.includes(v.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[#E7DFD5] pb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E7DFD5] text-[#263D33] text-[11px] font-mono uppercase tracking-widest">
            <Bookmark className="w-3.5 h-3.5 text-[#C2542D]" />
            <span>PERSONAL DOSSIER & ARCHIVE</span>
          </div>
          <span className="font-mono text-[11px] text-[#8C827A] hidden sm:inline-block">
            ARCHIVE NO. SV-2026
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#181614] tracking-tight">
          Saved Field Dispatches & Inspirations
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554E] max-w-2xl leading-relaxed">
          Your curated compendium of bookmarked creator routes, cinematic visual reels, and tailored personal expedition plans.
        </p>
      </div>

      {/* Archival Tabs Strip */}
      <div className="flex items-center gap-2 border-b border-[#E7DFD5] pb-3 overflow-x-auto no-scrollbar whitespace-nowrap">
        <button
          onClick={() => setActiveTab("itineraries")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "itineraries"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>Saved Itineraries ({savedItineraries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("videos")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "videos"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <Video className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>Saved Reels ({savedVideos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("trips")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "trips"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <Luggage className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>Custom Trip Logbooks ({personalTrips.length})</span>
        </button>
      </div>

      {/* TAB 1: SAVED ITINERARIES */}
      {activeTab === "itineraries" && (
        <div className="space-y-6">
          {savedItineraries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
              {savedItineraries.map((itin) => (
                <ItineraryCard key={itin.id} itinerary={itin} />
              ))}
            </div>
          ) : (
            <div className="bg-[#FAF7F2] rounded-2xl p-12 text-center border border-[#E7DFD5] shadow-xs space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#F8F5F0] border border-[#E7DFD5] flex items-center justify-center mx-auto text-[#8C827A]">
                <Bookmark className="w-5 h-5 text-[#C2542D]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-[#181614]">
                  No Saved Itineraries Yet
                </h3>
                <p className="text-xs text-[#5C554E] leading-relaxed">
                  While browsing expedition blueprints, select the bookmark icon on any dispatch to save it to your permanent collection.
                </p>
              </div>
              <Link
                href="/itineraries"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-medium transition-colors"
              >
                <span>Browse Expedition Index</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED VIDEOS */}
      {activeTab === "videos" && (
        <div className="space-y-6">
          {savedVideos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in">
              {savedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="bg-[#FAF7F2] rounded-2xl p-12 text-center border border-[#E7DFD5] shadow-xs space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#F8F5F0] border border-[#E7DFD5] flex items-center justify-center mx-auto text-[#8C827A]">
                <Video className="w-5 h-5 text-[#C2542D]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-[#181614]">
                  No Saved Visual Reels
                </h3>
                <p className="text-xs text-[#5C554E] leading-relaxed">
                  Save field footage and short creator recordings while watching in the theatre player.
                </p>
              </div>
              <Link
                href="/videos/video-1"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-medium transition-colors"
              >
                <span>Watch First Visual Reel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CUSTOM TRIPS */}
      {activeTab === "trips" && (
        <div className="space-y-6">
          {personalTrips.length > 0 ? (
            <div className="space-y-4 animate-in fade-in">
              {personalTrips.map((trip) => {
                const totalCost = trip.budgetPerPersonInr * trip.partySize;
                const totalStops = trip.days.reduce((acc, d) => acc + d.stops.length, 0);

                return (
                  <div
                    key={trip.id}
                    className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E7DFD5] shadow-xs hover:border-[#C2542D]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono">
                        <span className="text-[#C2542D] font-semibold bg-[#F8F5F0] px-2.5 py-0.5 rounded border border-[#E7DFD5] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {trip.destinationName}
                        </span>
                        <span className="uppercase px-2 py-0.5 rounded text-[10px] font-semibold bg-[#263D33]/10 text-[#263D33] border border-[#263D33]/20">
                          {trip.status}
                        </span>
                        <span className="text-[#8C827A]">
                          Created {trip.createdAt}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-medium text-[#181614]">
                        {trip.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C554E] font-sans">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#8C827A]" />
                          {trip.startDate} to {trip.endDate} ({trip.days.length} Days)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#8C827A]" />
                          {trip.partySize} {trip.partySize === 1 ? "Traveler" : "Travelers"}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-[#181614]">
                          Est. Total ₹{totalCost.toLocaleString("en-IN")}
                        </span>
                        <span>•</span>
                        <span className="text-[#8C827A]">{totalStops} Field Stops</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href="/my-trips"
                        className="px-4 py-2 rounded-lg bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>Open Trip Hub</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#FAF7F2] rounded-2xl p-12 text-center border border-[#E7DFD5] shadow-xs space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#F8F5F0] border border-[#E7DFD5] flex items-center justify-center mx-auto text-[#8C827A]">
                <Luggage className="w-5 h-5 text-[#C2542D]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-[#181614]">
                  No Custom Trip Logbooks
                </h3>
                <p className="text-xs text-[#5C554E] leading-relaxed">
                  Customize any published creator itinerary or build a new expedition blueprint from scratch.
                </p>
              </div>
              <Link
                href="/my-trips"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-medium transition-colors"
              >
                <span>Go to Trip Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
