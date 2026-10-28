"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MOCK_ITINERARIES, MOCK_DESTINATIONS } from "@/lib/data/mock-db";
import { useApp } from "@/lib/context/app-context";
import { AccommodationCard } from "@/components/shared/AccommodationCard";
import { DayTimeline } from "@/components/shared/DayTimeline";
import { MapPreview } from "@/components/shared/MapPreview";
import { BudgetSummary } from "@/components/shared/BudgetSummary";
import { SaveButton } from "@/components/shared/SaveButton";
import { ShareModal } from "@/components/shared/ShareModal";
import { 
  HeartIcon as Heart, 
  ShareIcon as Share2, 
  ClockIcon as Clock, 
  LocationPinIcon as MapPin, 
  CalendarIcon as Calendar, 
  CheckIcon as CheckCircle2, 
  SparklesIcon as Sparkles, 
  AlertCircleIcon as AlertCircle, 
  ExternalLinkIcon as ExternalLink, 
  ShieldCheckIcon as ShieldAlert, 
  InfoIcon as Info, 
  ArrowRightIcon as ArrowRight,
  CopyIcon as Edit,
  ShieldCheckIcon,
  BookOpenIcon as BookOpen
} from "@/components/shared/icons";

export default function ItineraryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { 
    itineraries, 
    createTripFromItinerary, 
    submitContentReport 
  } = useApp();

  const [visitedStopIds, setVisitedStopIds] = useState<string[]>([]);
  const [shareOpen, setShareOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState<any>("Outdated pricing/timings");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSuccess, setReportSuccess] = useState(false);

  const itinerary = itineraries.find((i) => i.slug === slug || i.id === slug) || itineraries[0] || MOCK_ITINERARIES[0];

  const toggleVisited = (stopId: string) => {
    setVisitedStopIds((prev) =>
      prev.includes(stopId) ? prev.filter((id) => id !== stopId) : [...prev, stopId]
    );
  };

  const handleCustomizeTrip = () => {
    const newTripId = createTripFromItinerary(itinerary);
    router.push(`/my-trips?tripId=${newTripId}`);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    submitContentReport({
      itemType: "itinerary",
      itemId: itinerary.id,
      itemTitle: itinerary.title,
      reporterEmail: "traveler@roamcraft.demo",
      reason: reportReason,
      details: reportDetails || "Reported via itinerary page.",
    });
    setReportSuccess(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSuccess(false);
      setReportDetails("");
    }, 1800);
  };

  const allStops = itinerary.days.flatMap((d) => d.stops);
  const totalStops = allStops.length;

  return (
    <div className="pb-24 space-y-12">
      {/* 1. EDITORIAL DISPATCH HEADER COVER */}
      <div className="relative bg-[#181614] text-[#F8F5F0] min-h-[480px] flex flex-col justify-end border-b border-[#2A2623]">
        <div className="absolute inset-0 z-0">
          <img
            src={itinerary.coverImage}
            alt={itinerary.title}
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-[#181614]/65 to-black/35" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-5">
          {/* Metadata Stamp */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-stone-300">
            <Link
              href={`/destinations/${itinerary.destinationId.replace("dest-", "")}`}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md px-3 py-1 rounded text-white flex items-center gap-1 transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#D9822B]" />
              {itinerary.destinationName}
            </Link>
            <span className="bg-[#C2542D] px-2.5 py-1 rounded text-white font-bold">
              {itinerary.durationDays} DAYS • {totalStops} STOPS
            </span>
            <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded text-stone-300">
              IDEAL FOR {itinerary.travelerType}
            </span>
            {itinerary.status === "draft" && (
              <span className="bg-amber-600/80 text-white px-2 py-0.5 rounded font-bold text-[9px]">
                DRAFT PREVIEW
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl leading-[1.12]">
            {itinerary.title}
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-stone-200 max-w-3xl leading-relaxed">
            &ldquo;{itinerary.tagline}&rdquo;
          </p>

          {/* Creator Attribution & Dispatch Toolbar */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-white/15">
            <Link
              href={`/creators/${itinerary.creator.handle.replace("@", "")}`}
              className="flex items-center gap-3.5 group/creator text-left"
            >
              <img
                src={itinerary.creator.avatarUrl}
                alt={itinerary.creator.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#C2542D]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-base text-white group-hover/creator:text-[#D9822B] transition-colors">
                    {itinerary.creator.name}
                  </span>
                  {itinerary.creator.verified && (
                    <CheckCircle2 className="w-4 h-4 fill-[#C2542D] text-white" />
                  )}
                </div>
                <span className="font-mono text-[10px] text-stone-400 block tracking-wider uppercase">
                  Field Explorer • Published {itinerary.publishedDate}
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2 flex-wrap">
              <SaveButton itemId={itinerary.id} itemType="itinerary" variant="button" />

              <button
                onClick={() => setShareOpen(true)}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white transition-all duration-200 border border-white/20 hover:border-white/40 flex items-center justify-center active:scale-95 shadow-xs"
                title="Share Dispatch"
                aria-label="Share Dispatch"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleCustomizeTrip}
                className="btn-editorial-terracotta"
              >
                <Sparkles className="w-4 h-4 text-[#D9822B]" />
                <span>Customize This Route</span>
              </button>

              <Link
                href={`/itineraries/${itinerary.id}/edit`}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all duration-200 border border-white/20 hover:border-white/40 flex items-center justify-center active:scale-95 shadow-xs"
                title="Edit in Creator Desk"
              >
                <Edit className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN GRID: DAY TIMELINE + EXPEDITION LEDGER SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (8 cols): Creator Ground Notes & Day-by-Day Timeline */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Creator Field Notes & Ground Advice */}
            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E7DFD5] space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#E7DFD5] pb-3">
                <BookOpen className="w-4 h-4 text-[#C2542D]" />
                <h3 className="font-serif font-bold text-lg text-[#181614]">
                  Creator Ground Dispatch & Field Rules
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed font-sans">
                {itinerary.introNotes}
              </p>

              {/* Practical Field Guidelines */}
              <div className="pt-3 border-t border-[#E7DFD5] space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#C2542D] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Packing & Ground Guidelines
                </span>
                <ul className="space-y-1.5 pt-1">
                  {itinerary.packingAndPracticalTips.map((tip, idx) => (
                    <li key={idx} className="text-xs text-[#57534E] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C2542D] mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Day-by-Day Schedule */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-[#E7DFD5] pb-3">
                <h3 className="font-serif font-bold text-2xl text-[#181614]">
                  Day-by-Day Field Schedule ({totalStops} Stops)
                </h3>
                <span className="font-mono text-[10px] text-[#78716C] uppercase">
                  Check off stops as you complete them
                </span>
              </div>

              <DayTimeline
                days={itinerary.days}
                destinationName={itinerary.destinationName}
                visitedStopIds={visitedStopIds}
                onToggleVisited={toggleVisited}
              />
            </div>

            {/* Ground Reality Notice */}
            <div className="bg-[#F2EDE4] p-5 rounded-2xl border border-[#E7DFD5] text-xs text-[#44403C] leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#C2542D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#181614] block font-mono text-[10px] uppercase tracking-wider mb-0.5">
                  Ground Reality & Ethics Disclosure
                </strong>
                Timings, entry costs, and transit duration reflect firsthand creator expeditions. Hours may vary during regional festivals or seasonal weather. Hotel bookings and live rates are fulfilled on partner platforms.
              </div>
            </div>

            {/* Content Correction Link */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowReportModal(true)}
                className="text-xs font-mono text-[#78716C] hover:text-[#C2542D] flex items-center gap-1.5 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Notice an outdated price or timing? Submit a field correction</span>
              </button>
            </div>
          </div>

          {/* Right Column (4 cols): Ledger Sidebar & Accommodations */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Expedition Expense Ledger */}
            <BudgetSummary
              budgetPerPersonInr={itinerary.budgetPerPersonInr}
              partySize={2}
              durationDays={itinerary.durationDays}
            />

            {/* Map Preview */}
            <MapPreview
              destinationName={itinerary.destinationName}
              stops={allStops}
            />

            {/* Recommended Stays Near Route */}
            <div className="space-y-4">
              <div className="border-b border-[#E7DFD5] pb-2">
                <h4 className="font-serif font-bold text-xl text-[#181614]">
                  Handpicked Stays Near Route
                </h4>
                <span className="font-mono text-[10px] text-[#78716C] uppercase">
                  Creator selected & partner verified
                </span>
              </div>

              <div className="space-y-4">
                {itinerary.hotels.length > 0 ? (
                  itinerary.hotels.map((hotel) => (
                    <AccommodationCard
                      key={hotel.id}
                      hotel={hotel}
                      itineraryId={itinerary.id}
                      sourceContext={itinerary.destinationName}
                    />
                  ))
                ) : (
                  <p className="text-xs font-mono text-[#78716C]">
                    No partner stays linked to this specific route.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={itinerary.title}
        url={typeof window !== "undefined" ? window.location.href : ""}
      />

      {/* Content Correction Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF7F2] max-w-md w-full rounded-2xl p-6 border border-[#E7DFD5] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7DFD5] pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#C2542D]" />
                <h4 className="font-serif font-bold text-base text-[#181614]">
                  Submit Field Correction
                </h4>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-stone-400 hover:text-stone-600 text-xs font-mono uppercase"
              >
                Close
              </button>
            </div>

            {reportSuccess ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#EAF2ED] text-[#1B4332] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h5 className="font-serif font-bold text-base text-[#181614]">Correction Logged</h5>
                <p className="text-xs text-[#57534E]">
                  Thank you for keeping our independent travel field notes accurate and honest.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
                <div>
                  <label className="font-mono text-[10px] uppercase font-bold text-[#78716C] block mb-1">
                    Issue Category
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E7DFD5] text-xs font-medium text-[#181614]"
                  >
                    <option value="Outdated pricing/timings">Outdated pricing or timings</option>
                    <option value="Inaccurate location/directions">Inaccurate location / directions</option>
                    <option value="Closed attraction/restaurant">Permanently closed location</option>
                    <option value="Misleading recommendation">Misleading recommendation</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase font-bold text-[#78716C] block mb-1">
                    Details / Ground Observation
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Describe what changed on the ground..."
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E7DFD5] text-xs text-[#181614] placeholder:text-[#A8A29E]"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#E7DFD5] text-[#57534E] text-xs font-mono uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#C2542D] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
