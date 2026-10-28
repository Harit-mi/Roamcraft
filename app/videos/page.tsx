"use client";

import React, { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_VIDEOS, MOCK_ITINERARIES, MOCK_DESTINATIONS } from "@/lib/data/mock-db";
import { useApp } from "@/lib/context/app-context";
import { 
  HeartIcon as Heart, 
  BookmarkIcon as Bookmark, 
  ShareIcon as Share2, 
  PlayCircleIcon as Play, 
  LocationPinIcon as MapPin, 
  ArrowRightIcon as ArrowRight, 
  CheckIcon as CheckCircle2, 
  ArrowUpIcon as ChevronUp, 
  ArrowDownIcon as ChevronDown,
  SparklesIcon as Sparkles,
  ExternalLinkIcon as ExternalLink,
  VolumeIcon as Volume2,
  VolumeXIcon as VolumeX
} from "@/components/shared/icons";

function VideoDiscoveryContent() {
  const searchParams = useSearchParams();
  const initialVideoId = searchParams.get("v");
  
  const initialIndex = initialVideoId 
    ? Math.max(0, MOCK_VIDEOS.findIndex(v => v.id === initialVideoId)) 
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideoIds, setLikedVideoIds] = useState<string[]>([]);
  const [followedCreatorIds, setFollowedCreatorIds] = useState<string[]>([]);
  const [copiedShare, setCopiedShare] = useState(false);

  const { isVideoSaved, toggleSaveVideo } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = MOCK_VIDEOS[currentIndex] || MOCK_VIDEOS[0];
  const relatedItinerary = MOCK_ITINERARIES.find(i => i.slug === currentVideo.itinerarySlug);
  const relatedDestination = MOCK_DESTINATIONS.find(d => d.id === currentVideo.destinationId);

  const isLiked = likedVideoIds.includes(currentVideo.id);
  const isSaved = isVideoSaved(currentVideo.id);
  const isFollowing = followedCreatorIds.includes(currentVideo.creatorId);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleToggleLike = () => {
    setLikedVideoIds(prev => 
      prev.includes(currentVideo.id) 
        ? prev.filter(id => id !== currentVideo.id) 
        : [...prev, currentVideo.id]
    );
  };

  const handleToggleFollow = () => {
    setFollowedCreatorIds(prev => 
      prev.includes(currentVideo.creatorId) 
        ? prev.filter(id => id !== currentVideo.creatorId) 
        : [...prev, currentVideo.creatorId]
    );
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const goToNext = () => {
    if (currentIndex < MOCK_VIDEOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
      {/* Page Header Intro */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-ochre-600 uppercase tracking-wider block">
            Bite-Sized Travel Inspiration
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal-900 tracking-tight">
            Short Travel Reels & Field Notes
          </h1>
        </div>
        <div className="text-xs text-stone-500 font-medium hidden sm:block">
          Use buttons or arrows to switch clips • {currentIndex + 1} of {MOCK_VIDEOS.length}
        </div>
      </div>

      {/* Main Reels Viewport Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Reel Mobile Frame (Col 1-7) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-stone-800">
            {/* Playable Video Element */}
            <video
              ref={videoRef}
              src={currentVideo.videoUrl}
              poster={currentVideo.posterUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover cursor-pointer"
              onClick={handleTogglePlay}
            />

            {/* Top Overlay Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <Link
                href={`/destinations/${relatedDestination?.slug || ""}`}
                className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 hover:bg-black/70 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-ochre-400" />
                <span>{currentVideo.destinationName}</span>
              </Link>

              <button
                onClick={handleToggleMute}
                className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Play/Pause Overlay indicator */}
            {!isPlaying && (
              <div
                onClick={handleTogglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Play className="w-8 h-8 fill-white translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Right Action Bar (Reels Style) */}
            <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4">
              {/* Like */}
              <button
                onClick={handleToggleLike}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-11 h-11 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-ochre-500 text-ochre-500" : ""}`} />
                </div>
                <span className="text-[10px] font-bold text-white shadow-sm">
                  {(currentVideo.likesCount + (isLiked ? 1 : 0)).toLocaleString()}
                </span>
              </button>

              {/* Save */}
              <button
                onClick={() => toggleSaveVideo(currentVideo.id)}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-11 h-11 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Bookmark className={`w-5 h-5 ${isSaved ? "fill-forest-400 text-forest-400" : ""}`} />
                </div>
                <span className="text-[10px] font-bold text-white shadow-sm">Save</span>
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1 group relative"
              >
                <div className="w-11 h-11 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white shadow-sm">Share</span>
                {copiedShare && (
                  <span className="absolute -top-7 bg-white text-charcoal-900 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Copied!
                  </span>
                )}
              </button>
            </div>

            {/* Bottom Caption & Itinerary Link */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 text-white space-y-2.5">
              {/* Creator Info & Follow */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={currentVideo.creator.avatarUrl}
                    alt={currentVideo.creator.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/60"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs text-white">{currentVideo.creator.name}</span>
                      {currentVideo.creator.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 fill-forest-400 text-black" />
                      )}
                    </div>
                    <span className="text-[10px] text-stone-300">{currentVideo.creator.handle}</span>
                  </div>
                </div>

                <button
                  onClick={handleToggleFollow}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isFollowing
                      ? "bg-white/20 text-stone-200"
                      : "bg-ochre-500 hover:bg-ochre-600 text-white"
                  }`}
                >
                  {isFollowing ? "Following" : "+ Follow"}
                </button>
              </div>

              {/* Caption */}
              <p className="text-xs text-stone-200 line-clamp-3 leading-relaxed">
                {currentVideo.caption}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 text-[10px] text-ochre-300 font-medium">
                {currentVideo.tags.map((t, idx) => (
                  <span key={idx}>{t}</span>
                ))}
              </div>

              {/* Direct Full Itinerary Trigger */}
              <Link
                href={`/itinerary/${currentVideo.itinerarySlug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs flex items-center justify-between transition-colors shadow-lg"
              >
                <span>View Full Day-by-Day Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Vertical Navigation Buttons */}
          <div className="hidden sm:flex flex-col gap-2 ml-4 self-center">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-2xl bg-white border border-stone-200 shadow-sm transition-all ${
                currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-stone-50 text-charcoal-900"
              }`}
              title="Previous Video"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === MOCK_VIDEOS.length - 1}
              className={`p-3 rounded-2xl bg-white border border-stone-200 shadow-sm transition-all ${
                currentIndex === MOCK_VIDEOS.length - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-stone-50 text-charcoal-900"
              }`}
              title="Next Video"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Information & Attached Itinerary Details (Col 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          {relatedItinerary && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-forest-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Linked Itinerary Blueprint
              </div>

              <h3 className="font-bold text-lg text-charcoal-900 leading-snug">
                {relatedItinerary.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-charcoal-600 bg-stone-50 p-3 rounded-2xl border border-stone-100">
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-bold">Duration</span>
                  <span className="font-semibold text-charcoal-900">{relatedItinerary.durationDays} Days</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-bold">Est. Budget</span>
                  <span className="font-semibold text-charcoal-900">
                    ₹{relatedItinerary.budgetPerPersonInr.toLocaleString("en-IN")}/person
                  </span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-bold">Traveler Type</span>
                  <span className="font-semibold text-charcoal-900">{relatedItinerary.travelerType}</span>
                </div>
              </div>

              {/* Day-by-day preview stops */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-charcoal-700 block">Day 1 Highlights:</span>
                {relatedItinerary.days[0]?.stops.slice(0, 3).map((stop) => (
                  <div key={stop.id} className="text-xs p-2.5 rounded-xl bg-canvas-subtle border border-stone-200/80">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-charcoal-900">{stop.title}</span>
                      <span className="text-[10px] text-stone-500">{stop.durationMins} mins</span>
                    </div>
                    {stop.foodTips && (
                      <p className="text-[11px] text-ochre-700 mt-1 italic">
                        Tip: {stop.foodTips}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <Link
                href={`/itinerary/${relatedItinerary.slug}`}
                className="w-full py-3 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs text-center block transition-colors shadow-xs"
              >
                Open Complete {relatedItinerary.durationDays}-Day Route & Map →
              </Link>
            </div>
          )}

          {/* Quick Destination Context */}
          {relatedDestination && (
            <div className="bg-canvas-subtle p-6 rounded-3xl border border-stone-200 space-y-3">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Destination Insight
              </span>
              <h4 className="font-bold text-base text-charcoal-900">
                About {relatedDestination.name}
              </h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {relatedDestination.overview}
              </p>
              <div className="pt-2">
                <Link
                  href={`/destinations/${relatedDestination.slug}`}
                  className="text-xs font-bold text-forest-700 hover:underline flex items-center gap-1"
                >
                  <span>Explore {relatedDestination.name} Travel Guide</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VideoDiscoveryPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-12 text-center text-xs text-stone-500">Loading reels player...</div>}>
      <VideoDiscoveryContent />
    </Suspense>
  );
}
