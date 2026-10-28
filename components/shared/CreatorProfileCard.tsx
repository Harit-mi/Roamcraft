"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreatorProfile } from "@/lib/types";
import { 
  CheckIcon, 
  LocationPinIcon, 
  BookOpenIcon, 
  ArrowRightIcon 
} from "@/components/shared/icons";

interface CreatorProfileCardProps {
  creator: CreatorProfile;
  showBio?: boolean;
}

export function CreatorProfileCard({ creator, showBio = true }: CreatorProfileCardProps) {
  const [following, setFollowing] = useState(false);
  const username = creator.handle.replace("@", "");

  return (
    <div className="bg-[#FAF7F2] rounded-xl p-6 border border-[#E7DFD5] hover:border-[#C2542D] transition-all flex flex-col justify-between group">
      <div>
        {/* Cover Preview / Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <Link href={`/creators/${username}`} className="flex items-center gap-3.5">
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#C2542D]/30 group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-serif font-bold text-lg text-[#181614] group-hover:text-[#C2542D] transition-colors leading-tight">
                  {creator.name}
                </h4>
                {creator.verified && (
                  <span className="w-3.5 h-3.5 rounded-full bg-[#C2542D] flex items-center justify-center text-white shrink-0">
                    <CheckIcon size={9} strokeWidth={2.5} />
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] text-[#78716C] block">{creator.handle}</span>
              <span className="font-mono text-[10px] text-[#78716C] flex items-center gap-1 mt-0.5">
                <LocationPinIcon size={10} className="text-[#C2542D]" />
                {creator.location}
              </span>
            </div>
          </Link>

          <button
            onClick={() => setFollowing(!following)}
            className={`btn-filter shrink-0 ${
              following
                ? "bg-[#E7DFD5] text-[#181614] border border-[#E7DFD5]"
                : "bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] font-semibold shadow-2xs"
            }`}
          >
            {following ? "Following" : "+ Follow"}
          </button>
        </div>

        {/* Bio */}
        {showBio && (
          <p className="text-xs text-[#57534E] font-serif italic line-clamp-3 leading-relaxed mb-4">
            &ldquo;{creator.bio}&rdquo;
          </p>
        )}

        {/* Specialties Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {creator.specialties.slice(0, 3).map((spec, idx) => (
            <span
              key={idx}
              className="bg-[#F2EDE4] text-[#44403C] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-[#E7DFD5]"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Stats & Passport Link */}
      <div className="pt-3 border-t border-[#E7DFD5] flex items-center justify-between font-mono text-[10px] text-[#78716C]">
        <div className="flex items-center gap-1">
          <BookOpenIcon size={12} className="text-[#C2542D]" />
          <span>{creator.totalTripsPublished} Routes</span>
        </div>
        <Link
          href={`/creators/${username}`}
          className="text-[#C2542D] font-semibold hover:underline flex items-center gap-1 uppercase tracking-wider"
        >
          <span>Passport</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>
    </div>
  );
}
