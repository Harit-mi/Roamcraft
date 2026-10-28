"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  MOCK_DESTINATIONS, 
  MOCK_ITINERARIES, 
  MOCK_HOTELS, 
  MOCK_VIDEOS 
} from "@/lib/data/mock-db";
import { ItineraryCard } from "@/components/shared/ItineraryCard";
import { HotelCard } from "@/components/shared/HotelCard";
import { 
  LocationPinIcon as MapPin, 
  CalendarIcon as Calendar, 
  ClockIcon as Clock, 
  RupeeIcon as IndianRupee, 
  PlayCircleIcon as Play, 
  CheckIcon as CheckCircle2, 
  ArrowRightIcon as ArrowRight,
  InfoIcon as Info,
  ShieldCheckIcon as ShieldCheck,
  CompassIcon as Compass,
  BookOpenIcon as BookOpen
} from "@/components/shared/icons";
import { handleImageError } from "@/lib/utils/image-fallback";

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const destination = MOCK_DESTINATIONS.find((d) => d.slug === slug) || MOCK_DESTINATIONS[0];

  const relatedItineraries = MOCK_ITINERARIES.filter(
    (i) => i.destinationId === destination.id || i.destinationName.toLowerCase().includes(destination.name.toLowerCase())
  );

  const relatedHotels = MOCK_HOTELS.filter(
    (h) => h.destinationId === destination.id
  );

  const relatedVideos = MOCK_VIDEOS.filter(
    (v) => v.destinationId === destination.id
  );

  const otherDestinations = MOCK_DESTINATIONS.filter((d) => d.id !== destination.id).slice(0, 3);

  return (
    <div className="pb-24 space-y-16">
      {/* 1. EDITORIAL DESTINATION COVER SPREAD */}
      <div className="relative min-h-[480px] bg-[#181614] text-[#F8F5F0] flex flex-col justify-end border-b border-[#2A2623]">
        <div className="absolute inset-0 z-0">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover opacity-50"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-[#181614]/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-stone-300">
            <span className="bg-[#C2542D] px-2.5 py-0.5 rounded text-white font-bold">
              REGIONAL DISPATCH
            </span>
            <span className="bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded text-stone-200">
              {destination.stateOrCountry}
            </span>
            <span className="bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded text-stone-300">
              {destination.isInternational ? "INTERNATIONAL ROUTE" : "DOMESTIC INDIA"}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl leading-[1.12]">
            {destination.name} Field Guide
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-stone-200 max-w-2xl leading-relaxed">
            &ldquo;{destination.overview}&rdquo;
          </p>
        </div>
      </div>

      {/* 2. REGIONAL FAST-FACTS LEDGER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7DFD5] space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block">
              Optimal Season & Windows
            </span>
            <h4 className="font-serif font-bold text-base text-[#181614]">
              {destination.bestSeasons[0]}
            </h4>
            <p className="text-xs text-[#57534E] font-serif italic pt-1">
              Secondary: {destination.bestSeasons[1] || "Year-round exploration"}
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7DFD5] space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block">
              Ideal Expedition Pace
            </span>
            <h4 className="font-serif font-bold text-base text-[#181614]">
              {destination.idealDurationDays} Recommended
            </h4>
            <p className="text-xs text-[#57534E] font-serif italic pt-1">
              Allows slow travel without excessive highway transfers
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7DFD5] space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block">
              Realistic Ground Spend
            </span>
            <h4 className="font-serif font-bold text-base text-[#181614]">
              ₹{destination.avgDailyBudgetInr.toLocaleString("en-IN")}{" "}
              <span className="text-xs text-[#78716C] font-normal font-sans">/ day / person</span>
            </h4>
            <p className="text-xs text-[#57534E] font-serif italic pt-1">
              Includes mid-tier stays, local meals & scooter/taxi rental
            </p>
          </div>
        </div>
      </div>

      {/* 3. CREATOR REELS FROM THIS REGION */}
      {relatedVideos.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-[#E7DFD5] pb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
              FIELD OBSERVATIONS
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#181614]">
              Creator Video Dispatches from {destination.name}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedVideos.map((video) => (
              <Link
                key={video.id}
                href={`/videos/${video.id}`}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#181614] border border-[#E7DFD5] shadow-xs hover:border-[#C2542D] transition-all"
              >
                <img
                  src={video.posterUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <span className="font-mono text-[9px] text-[#D9822B] uppercase block">
                    {video.creator.name}
                  </span>
                  <h4 className="font-serif text-xs font-bold line-clamp-2 leading-snug">
                    {video.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 4. READY-TO-FOLLOW ROUTES (Itineraries) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
              FIELD TESTED EXPEDITIONS
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#181614]">
              Published Routes for {destination.name}
            </h3>
          </div>
          <span className="font-mono text-xs text-[#78716C]">
            {relatedItineraries.length} Complete Blueprints
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedItineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      </div>

      {/* 5. HOTEL RECOMMENDATIONS NEAR REGION */}
      {relatedHotels.length > 0 && (
        <div className="bg-[#FAF7F2] py-16 border-y border-[#E7DFD5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="border-b border-[#E7DFD5] pb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
                LODGING PICKS
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#181614]">
                Handpicked Stays in {destination.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. PRACTICAL FIELD ADVICE & GROUND TIPS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#E7DFD5] space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E7DFD5] pb-3">
            <Info className="w-4 h-4 text-[#C2542D]" />
            <h3 className="font-serif font-bold text-xl text-[#181614]">
              Ground Transit & Practical Field Guidelines
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {destination.travelTips.map((tip, idx) => (
              <div key={idx} className="p-4 bg-[#F2EDE4] rounded-xl border border-[#E7DFD5] text-xs text-[#44403C] space-y-1">
                <span className="font-mono text-[9px] font-bold uppercase text-[#C2542D]">
                  Field Rule 0{idx + 1}
                </span>
                <p className="font-serif italic leading-relaxed text-[#181614]">
                  &ldquo;{tip}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. NEIGHBORING REGIONAL DISPATCHES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[#E7DFD5] pb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
            ADJACENT CORRESPONDENCE
          </span>
          <h3 className="font-serif font-bold text-2xl text-[#181614]">
            Other Regional Field Guides
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherDestinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group p-5 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] hover:border-[#C2542D] transition-all block text-left"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-200 mb-3">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={handleImageError}
                />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#78716C] block">
                {dest.stateOrCountry}
              </span>
              <h4 className="font-serif font-bold text-xl text-[#181614] group-hover:text-[#C2542D] transition-colors leading-tight mt-0.5">
                {dest.name}
              </h4>
              <p className="text-xs text-[#57534E] font-serif italic mt-1 line-clamp-2">
                &ldquo;{dest.overview}&rdquo;
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
