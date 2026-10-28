"use client";

import React, { useState } from "react";
import { HeartIcon, BookmarkIcon } from "@/components/shared/icons";
import { useApp } from "@/lib/context/app-context";

interface SaveButtonProps {
  itemId: string;
  itemType: "itinerary" | "video";
  variant?: "icon" | "button" | "pill";
  label?: string;
  className?: string;
}

export function SaveButton({
  itemId,
  itemType,
  variant = "icon",
  label,
  className = "",
}: SaveButtonProps) {
  const { isItinerarySaved, isVideoSaved, toggleSaveItinerary, toggleSaveVideo } = useApp();
  const [animating, setAnimating] = useState(false);

  const isSaved = itemType === "itinerary" ? isItinerarySaved(itemId) : isVideoSaved(itemId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    if (itemType === "itinerary") {
      toggleSaveItinerary(itemId);
    } else {
      toggleSaveVideo(itemId);
    }
  };

  if (variant === "button") {
    return (
      <button
        onClick={handleClick}
        aria-label={isSaved ? "Remove from saved" : "Save to my collection"}
        className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-xs ${
          isSaved
            ? "bg-[#C2542D] text-white hover:bg-[#A94320] border border-[#C2542D]"
            : "bg-[#FAF7F2] text-[#181614] border border-[#E7DFD5] hover:bg-white hover:border-[#181614]/40"
        } ${className}`}
      >
        <BookmarkIcon
          size={14}
          className={`transition-transform duration-200 ${animating ? "scale-125" : ""} ${isSaved ? "fill-white text-white" : "text-[#5C554E]"}`}
        />
        <span>{label || (isSaved ? "Saved to Archive" : "Save Dispatch")}</span>
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        aria-label={isSaved ? "Remove from saved" : "Save"}
        className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all duration-200 active:scale-95 ${
          isSaved
            ? "bg-[#C2542D]/10 text-[#C2542D] border border-[#C2542D]/30 font-semibold"
            : "bg-[#F8F5F0] text-[#5C554E] border border-[#E7DFD5] hover:text-[#181614] hover:bg-white"
        } ${className}`}
      >
        <HeartIcon
          size={12}
          filled={isSaved}
          className={`transition-transform duration-200 ${animating ? "scale-125" : ""} ${isSaved ? "text-[#C2542D]" : "text-[#8C827A]"}`}
        />
        <span>{isSaved ? "Saved" : "Save"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isSaved ? "Remove from saved" : "Save"}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 bg-[#181614]/60 hover:bg-[#181614]/90 text-white backdrop-blur-md border border-white/15 hover:border-white/40 shadow-xs active:scale-90 ${
        animating ? "scale-125" : "scale-100"
      } ${className}`}
    >
      <HeartIcon
        size={14}
        filled={isSaved}
        className={`transition-transform duration-200 ${isSaved ? "text-[#C2542D]" : "text-white"}`}
      />
    </button>
  );
}
