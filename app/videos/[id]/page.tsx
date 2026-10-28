"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MOCK_VIDEOS, MOCK_ITINERARIES, MOCK_DESTINATIONS } from "@/lib/data/mock-db";
import { useApp } from "@/lib/context/app-context";
import { SaveButton } from "@/components/shared/SaveButton";
import { ShareModal } from "@/components/shared/ShareModal";
import { 
  PlayCircleIcon as Play, 
  LocationPinIcon as MapPin, 
  ArrowRightIcon as ArrowRight, 
  CheckIcon as CheckCircle2, 
  ShareIcon as Share2, 
  AlertCircleIcon as AlertTriangle, 
  SparklesIcon as Sparkles, 
  ArrowLeftIcon as ChevronLeft,
  RefreshIcon as RefreshCw,
  VolumeIcon as Volume2,
  VolumeXIcon as VolumeX
} from "@/components/shared/icons";

export default function VideoPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params?.id as string;

  const { videos, isVideoSaved, toggleSaveVideo } = useApp();
  const video = videos.find((v) => v.id === videoId) || MOCK_VIDEOS.find((v) => v.id === videoId);

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setHasPlaybackError(false);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [videoId]);

  // Unavailable Video State
  if (!video) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-cream-200 text-charcoal-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-terracotta" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal-900">Video Unavailable</h2>
        <p className="text-xs text-charcoal-600 max-w-md mx-auto leading-relaxed">
          The requested travel reel could not be located or may have been unlisted by the creator. Explore other creator videos below.
        </p>
        <div className="pt-2">
          <Link
            href="/discover"
            className="px-5 py-2.5 rounded-2xl bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>Back to Discovery Feed</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const relatedItinerary = MOCK_ITINERARIES.find((i) => i.slug === video.itinerarySlug);
  const relatedDestination = MOCK_DESTINATIONS.find((d) => d.id === video.destinationId);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasPlaybackError(true));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const retryPlayback = () => {
    setHasPlaybackError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasPlaybackError(true));
      }
    }, 500);
  };

  const otherVideos = MOCK_VIDEOS.filter((v) => v.id !== video.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/discover"
          className="text-xs font-semibold text-charcoal-600 hover:text-terracotta inline-flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Video Viewport (Col 1-7) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden bg-charcoal-950 shadow-2xl border-4 border-charcoal-800 flex flex-col justify-between">
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="absolute inset-0 z-30 bg-charcoal-900 flex flex-col items-center justify-center space-y-3 text-stone-300">
                <RefreshCw className="w-8 h-8 animate-spin text-terracotta" />
                <span className="text-xs font-medium">Loading creator reel...</span>
              </div>
            )}

            {/* Playback Error State */}
            {hasPlaybackError && (
              <div className="absolute inset-0 z-30 bg-charcoal-950/95 flex flex-col items-center justify-center p-6 text-center space-y-3 text-white">
                <AlertTriangle className="w-10 h-10 text-terracotta" />
                <h4 className="font-bold text-sm">Media Playback Interrupted</h4>
                <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
                  The video stream could not be decoded. Check your network or retry playback.
                </p>
                <button
                  onClick={retryPlayback}
                  className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Stream</span>
                </button>
              </div>
            )}

            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              src={video.videoUrl}
              poster={video.posterUrl}
              playsInline
              loop
              onLoadedData={() => setIsLoading(false)}
              onError={() => setHasPlaybackError(true)}
              onClick={togglePlay}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />

            {/* Top Bar Controls */}
            <div className="relative z-20 p-4 flex items-center justify-between">
              <Link
                href={`/destinations/${relatedDestination?.slug || ""}`}
                className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 hover:bg-black/70 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>{video.destinationName}</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <SaveButton itemId={video.id} itemType="video" />
                <button
                  onClick={() => setShareOpen(true)}
                  className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  aria-label="Share video"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Play/Pause Center Indicator */}
            {!isPlaying && !isLoading && !hasPlaybackError && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform hover:scale-110 shadow-xl">
                  <Play className="w-8 h-8 fill-white translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Bottom Caption & Itinerary Link */}
            <div className="relative z-20 p-4 bg-gradient-to-t from-charcoal-950 via-charcoal-950/90 to-transparent text-white space-y-3">
              {/* Creator Byline */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/creators/${video.creator.handle.replace("@", "")}`}
                  className="flex items-center gap-2.5"
                >
                  <img
                    src={video.creator.avatarUrl}
                    alt={video.creator.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/60"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs text-white">{video.creator.name}</span>
                      {video.creator.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 fill-terracotta text-white" />
                      )}
                    </div>
                    <span className="text-[10px] text-stone-300">{video.creator.handle}</span>
                  </div>
                </Link>

                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isFollowing
                      ? "bg-white/20 text-stone-200"
                      : "bg-terracotta hover:bg-terracotta-600 text-white shadow-xs"
                  }`}
                >
                  {isFollowing ? "Following" : "+ Follow"}
                </button>
              </div>

              {/* Caption */}
              <p className="text-xs text-stone-200 line-clamp-3 leading-relaxed">
                {video.caption}
              </p>

              {/* Direct Full Itinerary Trigger */}
              <Link
                href={`/itineraries/${video.itinerarySlug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C2542D] hover:bg-[#A94320] text-white font-mono uppercase tracking-wider text-xs font-semibold flex items-center justify-between transition-colors shadow-lg"
              >
                <span>View Full Route Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Info: Attached Itinerary Details + More Reels (Col 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          {relatedItinerary && (
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7DFD5] shadow-xs space-y-4">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#C2542D] uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Linked Field Blueprint
              </div>

              <h3 className="font-serif font-bold text-xl text-[#181614] leading-snug">
                {relatedItinerary.title}
              </h3>

              <div className="flex items-center gap-4 text-xs font-mono text-[#57534E] bg-[#F2EDE4] p-3.5 rounded-xl border border-[#E7DFD5]">
                <div>
                  <span className="block text-[9px] text-[#78716C] uppercase font-bold">Duration</span>
                  <span className="font-semibold text-[#181614]">{relatedItinerary.durationDays} Days</span>
                </div>
                <div className="h-6 w-px bg-[#E7DFD5]" />
                <div>
                  <span className="block text-[9px] text-[#78716C] uppercase font-bold">Total Stops</span>
                  <span className="font-semibold text-[#181614]">{relatedItinerary.days.reduce((a, d) => a + d.stops.length, 0)} Sights</span>
                </div>
                <div className="h-6 w-px bg-[#E7DFD5]" />
                <div>
                  <span className="block text-[9px] text-[#78716C] uppercase font-bold">Est. Cost</span>
                  <span className="font-semibold text-[#181614]">₹{relatedItinerary.budgetPerPersonInr.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <p className="text-xs text-[#57534E] font-serif italic line-clamp-3">
                &ldquo;{relatedItinerary.tagline}&rdquo;
              </p>

              <Link
                href={`/itineraries/${relatedItinerary.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#C2542D] hover:underline uppercase tracking-wider"
              >
                <span>Read Ground Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* More Short Reels to Watch */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-charcoal-900">More Creator Reels</h4>
            <div className="grid grid-cols-3 gap-2.5">
              {otherVideos.map((v) => (
                <Link
                  key={v.id}
                  href={`/videos/${v.id}`}
                  className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-charcoal-900 shadow-xs hover:shadow-md transition-all"
                >
                  <img
                    src={v.posterUrl}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="text-[10px] font-bold line-clamp-1">{v.destinationName}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={video.title}
        url={typeof window !== "undefined" ? `${window.location.origin}/videos/${video.id}` : ""}
      />
    </div>
  );
}
