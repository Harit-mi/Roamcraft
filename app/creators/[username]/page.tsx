"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_CREATORS } from "@/lib/data/mock-db";
import { useApp } from "@/lib/context/app-context";
import { ItineraryCard } from "@/components/shared/ItineraryCard";
import { VideoCard } from "@/components/shared/VideoCard";
import { handleImageError } from "@/lib/utils/image-fallback";
import { 
  CheckIcon as CheckCircle2, 
  LocationPinIcon as MapPin, 
  ExternalLinkIcon as ExternalLink, 
  BookOpenIcon as BookOpen, 
  PlayCircleIcon as Video, 
  CompassIcon as Compass, 
  ArrowLeftIcon as ArrowLeft, 
  GlobeIcon as Globe, 
  ShareIcon as Share2,
  InstagramIcon as Instagram,
  YoutubeIcon as Youtube
} from "@/components/shared/icons";

export default function CreatorDetailPage() {
  const params = useParams();
  const username = params?.username as string;

  const { itineraries, videos } = useApp();
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<"itineraries" | "videos">("itineraries");

  // Find creator matching handle (with or without @)
  const creator = MOCK_CREATORS.find(
    (c) => c.handle.toLowerCase().replace("@", "") === username.toLowerCase() ||
           c.id === username ||
           c.userId === username
  ) || MOCK_CREATORS[0];

  const creatorItineraries = itineraries.filter(
    (i) => i.creatorId === creator.id || i.creator.name === creator.name
  );

  const creatorVideos = videos.filter(
    (v) => v.creatorId === creator.id || v.creator.name === creator.name
  );

  return (
    <div className="pb-28">
      {/* Editorial Breadcrumb Strip */}
      <div className="bg-[#FAF7F2] border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-[11px] text-[#5C554E]">
          <Link
            href="/creators"
            className="inline-flex items-center gap-1.5 font-medium hover:text-[#C2542D] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Guild Directory</span>
          </Link>
          <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[10px]">
            <span>DOSSIER: {creator.handle}</span>
            <span>•</span>
            <span className="text-[#263D33] font-semibold">VERIFIED DISPATCHER</span>
          </div>
        </div>
      </div>

      {/* Cinematic Cover with Editorial Masthead */}
      <div className="relative bg-[#181614] text-white min-h-[360px] sm:min-h-[420px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={creator.coverUrl}
            alt={`${creator.name}'s expedition background`}
            onError={handleImageError}
            className="w-full h-full object-cover opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-[#181614]/65 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#181614]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              <div className="relative">
                <img
                  src={creator.avatarUrl}
                  alt={creator.name}
                  onError={handleImageError}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-2 ring-[#E7DFD5]/40 shadow-2xl bg-[#231F1C]"
                />
                {creator.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-[#C2542D] text-white p-1 rounded-full shadow-md" title="Verified Creator">
                    <CheckCircle2 className="w-4 h-4 fill-white text-[#C2542D]" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 backdrop-blur-xs text-[10px] font-mono uppercase tracking-widest text-[#E7DFD5]">
                  <Compass className="w-3 h-3 text-[#C2542D]" />
                  <span>Resident Dispatcher</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7F2] tracking-tight">
                  {creator.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#E7DFD5]/80 font-mono">
                  <span className="text-[#C2542D] font-semibold">{creator.handle}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#E7DFD5]">
                    <MapPin className="w-3.5 h-3.5 text-[#C2542D]" />
                    {creator.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setFollowing(!following)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${
                  following
                    ? "bg-[#FAF7F2] text-[#181614] hover:bg-white border border-white"
                    : "bg-[#C2542D] hover:bg-[#a6431f] text-white"
                }`}
              >
                {following ? "✓ Subscribed to Dispatches" : "+ Follow Dispatches"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dossier Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Creator Credentials & Field Biography (Col 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF7F2] p-7 rounded-2xl border border-[#E7DFD5] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD5]">
                <span className="font-mono uppercase text-[10px] tracking-widest text-[#8C827A]">
                  FIELD DOSSIER
                </span>
                <span className="font-mono text-[10px] text-[#263D33] font-semibold">
                  EST. 2024
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-base text-[#181614] font-semibold">
                  Field Biography
                </h3>
                <p className="text-xs text-[#5C554E] leading-relaxed font-sans">
                  {creator.bio}
                </p>
              </div>

              {/* Specializations */}
              <div className="space-y-2 pt-4 border-t border-[#E7DFD5]">
                <span className="font-mono uppercase text-[10px] tracking-widest text-[#8C827A] block">
                  TRAVEL DOMAINS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {creator.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="bg-[#F8F5F0] text-[#181614] text-[11px] px-2.5 py-1 rounded-md border border-[#E7DFD5] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Ledger Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E7DFD5]">
                <div className="p-3.5 bg-[#F8F5F0] rounded-xl border border-[#E7DFD5]">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C827A] block">
                    PUBLISHED ROUTES
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#181614] mt-0.5 block">
                    {creator.totalTripsPublished}
                  </span>
                  <span className="text-[10px] text-[#5C554E]">Verified Journeys</span>
                </div>
                <div className="p-3.5 bg-[#F8F5F0] rounded-xl border border-[#E7DFD5]">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C827A] block">
                    COMMUNITY
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#181614] mt-0.5 block">
                    {(creator.followersCount / 1000).toFixed(0)}k
                  </span>
                  <span className="text-[10px] text-[#5C554E]">Subscribers</span>
                </div>
              </div>

              {/* Verified Social Channels */}
              {creator.socials && (
                <div className="pt-4 border-t border-[#E7DFD5] space-y-2">
                  <span className="font-mono uppercase text-[10px] tracking-widest text-[#8C827A] block">
                    DIRECT DISPATCH FEEDS
                  </span>
                  <div className="flex items-center gap-2">
                    {creator.socials.instagram && (
                      <a
                        href={creator.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#F8F5F0] hover:bg-[#E7DFD5] text-[#181614] border border-[#E7DFD5] text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5 text-[#C2542D]" />
                        <span>Instagram</span>
                      </a>
                    )}
                    {creator.socials.youtube && (
                      <a
                        href={creator.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#F8F5F0] hover:bg-[#E7DFD5] text-[#181614] border border-[#E7DFD5] text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Youtube className="w-3.5 h-3.5 text-[#C2542D]" />
                        <span>YouTube</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Archival Note */}
              <div className="pt-4 border-t border-[#E7DFD5] text-[10px] text-[#8C827A] leading-relaxed">
                All itineraries published by this creator are curated through on-the-ground exploration. Field notes and accommodation choices are verified before publication.
              </div>
            </div>
          </div>

          {/* Published Content Ledger (Col 5-12) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Editorial Segment Tabs */}
            <div className="flex items-center justify-between border-b border-[#E7DFD5] pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("itineraries")}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
                    activeTab === "itineraries"
                      ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
                      : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Published Itineraries ({creatorItineraries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("videos")}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
                    activeTab === "videos"
                      ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
                      : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Field Reels ({creatorVideos.length})</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#8C827A] hidden sm:inline-block">
                SHOWING ARCHIVE DISPATCHES
              </span>
            </div>

            {/* TAB 1: ITINERARIES */}
            {activeTab === "itineraries" && (
              <div>
                {creatorItineraries.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in">
                    {creatorItineraries.map((itin) => (
                      <ItineraryCard key={itin.id} itinerary={itin} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#FAF7F2] p-12 rounded-2xl border border-[#E7DFD5] text-center space-y-3">
                    <Compass className="w-8 h-8 text-[#8C827A] mx-auto" />
                    <h3 className="font-serif text-base text-[#181614]">
                      No Public Itineraries Listed
                    </h3>
                    <p className="text-xs text-[#5C554E] max-w-sm mx-auto">
                      This creator is currently drafting and field-testing new expeditions. Check back soon for updated route dispatches.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: VIDEOS */}
            {activeTab === "videos" && (
              <div>
                {creatorVideos.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-in fade-in">
                    {creatorVideos.map((vid) => (
                      <VideoCard key={vid.id} video={vid} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#FAF7F2] p-12 rounded-2xl border border-[#E7DFD5] text-center space-y-3">
                    <Video className="w-8 h-8 text-[#8C827A] mx-auto" />
                    <h3 className="font-serif text-base text-[#181614]">
                      No Travel Reels Published
                    </h3>
                    <p className="text-xs text-[#5C554E] max-w-sm mx-auto">
                      Video field dispatches will appear here once published from the field studio.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
