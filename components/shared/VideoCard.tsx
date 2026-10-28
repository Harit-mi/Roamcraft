"use client";

import React, { useState } from "react";
import Link from "next/link";
import { VideoClip } from "@/lib/types";
import { SaveButton } from "./SaveButton";
import { ShareModal } from "./ShareModal";
import { 
  PlayCircleIcon, 
  LocationPinIcon, 
  ShareIcon, 
  ArrowRightIcon, 
  CheckIcon 
} from "@/components/shared/icons";
import { handleImageError } from "@/lib/utils/image-fallback";

interface VideoCardProps {
  video: VideoClip;
  layout?: "vertical" | "compact";
}

export function VideoCard({ video, layout = "vertical" }: VideoCardProps) {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <div className="group relative rounded-xl overflow-hidden bg-[#181614] border border-[#E7DFD5] hover:border-[#C2542D] shadow-xs transition-all aspect-[9/16] flex flex-col justify-between">
        {/* Background Poster / Image */}
        <img
          src={video.posterUrl}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-black/40" />

        {/* Top Header: Destination Pill & Save/Share Controls */}
        <div className="relative z-10 p-3.5 flex items-center justify-between">
          <Link
            href={`/destinations/${video.destinationId.replace("dest-", "")}`}
            className="bg-[#181614]/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase text-white flex items-center gap-1 hover:bg-[#181614] transition-colors"
          >
            <LocationPinIcon size={10} className="text-[#D9822B]" />
            <span>{video.destinationName}</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShareOpen(true);
              }}
              className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-90 border border-white/10 hover:border-white/30"
              aria-label="Share video"
            >
              <ShareIcon size={12} />
            </button>
            <SaveButton itemId={video.id} itemType="video" />
          </div>
        </div>

        {/* Center Play Button (Navigates to dedicated player /videos/[id]) */}
        <Link
          href={`/videos/${video.id}`}
          className="relative z-10 self-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 active:scale-95 shadow-lg"
          aria-label={`Play video: ${video.title}`}
        >
          <PlayCircleIcon size={24} className="fill-white/80 translate-x-0.5" />
        </Link>

        {/* Bottom Metadata & Link to Itinerary */}
        <div className="relative z-10 p-3.5 text-white space-y-2 bg-gradient-to-t from-[#181614] via-[#181614]/90 to-transparent">
          {/* Creator Attribution */}
          <Link
            href={`/creators/${video.creator.handle.replace("@", "")}`}
            className="flex items-center gap-2 group/creator"
          >
            <img
              src={video.creator.avatarUrl}
              alt={video.creator.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-[#D9822B]"
            />
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-xs font-semibold text-white group-hover/creator:text-[#D9822B] truncate">
                {video.creator.name}
              </span>
              {video.creator.verified && (
                <span className="w-3.5 h-3.5 rounded-full bg-[#C2542D] flex items-center justify-center text-white shrink-0">
                  <CheckIcon size={9} strokeWidth={2.5} />
                </span>
              )}
            </div>
          </Link>

          {/* Title */}
          <Link href={`/videos/${video.id}`}>
            <h4 className="font-serif text-xs font-bold leading-snug line-clamp-2 hover:text-[#D9822B] transition-colors">
              {video.title}
            </h4>
          </Link>

          {/* Direct Link to Itinerary */}
          <Link
            href={`/itineraries/${video.itinerarySlug}`}
            className="w-full py-2 px-3.5 rounded-lg bg-[#C2542D] hover:bg-[#A94320] text-white font-mono uppercase tracking-wider text-[10px] font-semibold flex items-center justify-between transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 mt-1"
          >
            <span>Read Itinerary Blueprint</span>
            <ArrowRightIcon size={12} />
          </Link>
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={video.title}
        url={typeof window !== "undefined" ? `${window.location.origin}/videos/${video.id}` : ""}
      />
    </>
  );
}
