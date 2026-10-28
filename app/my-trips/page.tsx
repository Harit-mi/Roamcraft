"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/app-context";
import { ShareModal } from "@/components/shared/ShareModal";
import { 
  SuitcaseIcon as Luggage, 
  PlusIcon as Plus, 
  CalendarIcon as Calendar, 
  LocationPinIcon as MapPin, 
  UsersIcon as Users, 
  RupeeIcon as IndianRupee, 
  ShareIcon as Share2, 
  TrashIcon as Trash2, 
  ArrowRightIcon as ArrowRight, 
  SparklesIcon as Sparkles,
  CheckIcon as CheckCircle2,
  ClockIcon as Clock,
  CompassIcon as Compass
} from "@/components/shared/icons";

export default function MyTripsPage() {
  const { personalTrips, createEmptyTrip, deleteTrip, updateTrip } = useApp();
  const [filterStatus, setFilterStatus] = useState<"all" | "planning" | "booked" | "completed">("all");
  const [activeShareTrip, setActiveShareTrip] = useState<{ id: string; title: string } | null>(null);

  const filteredTrips = personalTrips.filter((t) => {
    if (filterStatus === "all") return true;
    return t.status === filterStatus;
  });

  const handleCreateNewTrip = () => {
    createEmptyTrip("South Goa", 4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[#E7DFD5] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E7DFD5] text-[#263D33] text-[11px] font-mono uppercase tracking-widest">
              <Luggage className="w-3.5 h-3.5 text-[#C2542D]" />
              <span>TRAVELER EXPEDITION LOGBOOK</span>
            </span>
            <span className="font-mono text-[11px] text-[#8C827A] hidden sm:inline-block">
              SERIES 2026
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#181614] tracking-tight">
            My Customized Expeditions
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-2xl leading-relaxed">
            Manage your personal travel logbooks, adjust travel party size, calibrate daily stop timelines, and track booking confirmations.
          </p>
        </div>

        <button
          onClick={handleCreateNewTrip}
          className="btn-editorial-terracotta self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Expedition Blueprint</span>
        </button>
      </div>

      {/* Filter Status Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pb-2 border-b border-[#E7DFD5]">
        {(["all", "planning", "booked", "completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`btn-editorial-pill capitalize ${
              filterStatus === status
                ? "bg-[#181614] text-[#FAF7F2] font-semibold shadow-xs"
                : "bg-[#FAF7F2] text-[#5C554E] border border-[#E7DFD5] hover:text-[#181614] hover:bg-white"
            }`}
          >
            {status === "all" ? `All Logbooks (${personalTrips.length})` : status}
          </button>
        ))}
      </div>

      {/* Trips Cards Stack */}
      {filteredTrips.length > 0 ? (
        <div className="space-y-5 animate-in fade-in">
          {filteredTrips.map((trip) => {
            const totalBudget = trip.budgetPerPersonInr * trip.partySize;
            const totalStops = trip.days.reduce((acc, d) => acc + d.stops.length, 0);

            return (
              <div
                key={trip.id}
                className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#E7DFD5] shadow-xs hover:border-[#C2542D]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono">
                    <span className="text-[#C2542D] font-semibold bg-[#F8F5F0] px-2.5 py-0.5 rounded border border-[#E7DFD5] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {trip.destinationName}
                    </span>

                    {/* Status badge & selector */}
                    <div className="relative">
                      <select
                        value={trip.status}
                        onChange={(e) => updateTrip(trip.id, { status: e.target.value as any })}
                        className="text-[10px] font-mono uppercase font-semibold px-2.5 py-1 rounded bg-[#F8F5F0] border border-[#E7DFD5] text-[#263D33] focus:outline-none cursor-pointer"
                      >
                        <option value="planning">PLANNING</option>
                        <option value="booked">CONFIRMED / BOOKED</option>
                        <option value="completed">COMPLETED</option>
                      </select>
                    </div>

                    <span className="text-[#8C827A]">
                      LOGGED ON {trip.createdAt}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#181614]">
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
                      Total Est. ₹{totalBudget.toLocaleString("en-IN")}
                    </span>
                    <span>•</span>
                    <span className="text-[#8C827A]">{totalStops} Field Stops</span>
                  </div>

                  {trip.notes && (
                    <p className="text-xs text-[#5C554E] italic font-serif border-l-2 border-[#C2542D]/40 pl-3 py-0.5">
                      &ldquo;{trip.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Right Action Tools */}
                <div className="flex items-center gap-2.5 self-start md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E7DFD5] w-full md:w-auto justify-between md:justify-start">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveShareTrip({ id: trip.id, title: trip.title })}
                      className="btn-editorial-icon"
                      title="Share Expedition Logbook"
                      aria-label="Share Expedition Logbook"
                    >
                      <Share2 className="w-4 h-4 text-[#5C554E]" />
                    </button>

                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="btn-editorial-icon hover:border-rose-400 hover:text-rose-600"
                      title="Archive / Remove Logbook"
                      aria-label="Archive / Remove Logbook"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link
                    href={`/itineraries`}
                    className="btn-editorial-primary text-xs"
                  >
                    <span>Inspect Stops</span>
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
            <Compass className="w-5 h-5 text-[#C2542D]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold text-[#181614]">
              No Logbooks in This Filter
            </h3>
            <p className="text-xs text-[#5C554E] leading-relaxed">
              You can clone any published creator expedition or create an unhurried blank itinerary from scratch.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/discover"
              className="px-5 py-2.5 rounded-full bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-medium transition-colors"
            >
              Explore Creator Routes
            </Link>
            <button
              onClick={handleCreateNewTrip}
              className="px-5 py-2.5 rounded-full border border-[#E7DFD5] bg-[#F8F5F0] hover:bg-[#E7DFD5] text-[#181614] text-xs font-medium transition-colors"
            >
              Create Blank Blueprint
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {activeShareTrip && (
        <ShareModal
          isOpen={!!activeShareTrip}
          onClose={() => setActiveShareTrip(null)}
          title={activeShareTrip.title}
          url={typeof window !== "undefined" ? `${window.location.origin}/itineraries` : ""}
        />
      )}
    </div>
  );
}
