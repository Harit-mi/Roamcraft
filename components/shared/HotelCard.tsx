"use client";

import React, { useState } from "react";
import { HotelRecommendation } from "@/lib/types";
import { useApp } from "@/lib/context/app-context";
import { 
  ExternalLinkIcon, 
  StarIcon, 
  ShieldCheckIcon, 
  LocationPinIcon, 
  SparklesIcon 
} from "@/components/shared/icons";
import { handleImageError } from "@/lib/utils/image-fallback";

interface HotelCardProps {
  hotel: HotelRecommendation;
  itineraryId?: string;
}

export function HotelCard({ hotel, itineraryId }: HotelCardProps) {
  const { trackAffiliateClick } = useApp();
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  const handleBookingClick = () => {
    trackAffiliateClick(hotel, itineraryId);
    setShowRedirectModal(true);
  };

  const getPlacementBadge = () => {
    switch (hotel.placementType) {
      case "sponsored":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-[#FDF0EB] text-[#C2542D] border border-[#F5D0C3]">
            <SparklesIcon size={10} className="text-[#C2542D]" />
            Sponsored Stay
          </span>
        );
      case "organic":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-[#EAF2ED] text-[#1B4332] border border-[#C5DED0]">
            <ShieldCheckIcon size={10} className="text-[#1B4332]" />
            Creator&apos;s Pick
          </span>
        );
      case "affiliate":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-[#F2EDE4] text-[#57534E] border border-[#E7DFD5]">
            Partner Stay
          </span>
        );
    }
  };

  return (
    <>
      <div className="bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#E7DFD5] hover:border-[#C2542D] shadow-xs transition-all flex flex-col group">
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
          <img
            src={hotel.images[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={handleImageError}
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {getPlacementBadge()}
            {hotel.itineraryTag && (
              <span className="bg-[#181614]/80 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded">
                {hotel.itineraryTag}
              </span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 bg-[#FAF7F2]/95 backdrop-blur-sm px-2 py-0.5 rounded shadow-xs flex items-center gap-1 font-mono text-[10px] font-bold text-[#181614]">
            <StarIcon size={12} filled className="text-amber-400" />
            {hotel.rating} <span className="text-[#78716C] font-normal">({hotel.reviewCount})</span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-[#78716C] tracking-wider uppercase mb-1">
              <LocationPinIcon size={12} className="text-[#C2542D] shrink-0" />
              <span className="truncate">{hotel.nearAttraction}</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[#181614] leading-snug line-clamp-1 group-hover:text-[#C2542D] transition-colors">
              {hotel.name}
            </h3>
            <p className="text-xs text-[#57534E] font-serif italic mt-0.5">{hotel.category}</p>

            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="bg-[#F2EDE4] text-[#57534E] text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-[#E7DFD5]"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E7DFD5] space-y-2.5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-mono text-[9px] text-[#78716C] uppercase block">Starting From</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-bold text-[#181614] font-mono">
                    ₹{hotel.pricePerNightInr.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-[#78716C] font-mono">/ night</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#78716C] uppercase bg-[#F2EDE4] px-2 py-0.5 rounded border border-[#E7DFD5]">
                {hotel.partnerName}
              </span>
            </div>

            <p className="text-[9px] text-[#78716C] font-mono leading-tight">
              {hotel.disclosureLabel}
            </p>

            <button
              onClick={handleBookingClick}
              className="btn-primary w-full text-xs font-mono tracking-wider"
            >
              <span>Examine Rates on {hotel.partnerName.split(" ")[0]}</span>
              <ExternalLinkIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Outbound Partner Booking Redirect Disclosure Modal */}
      {showRedirectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF7F2] max-w-sm w-full rounded-2xl p-6 border border-[#E7DFD5] shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#EAF2ED] text-[#1B4332] flex items-center justify-center mx-auto">
              <ExternalLinkIcon size={20} />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#C2542D] uppercase tracking-widest font-bold block mb-1">
                PARTNER REDIRECT DISCLOSURE
              </span>
              <h4 className="font-serif font-bold text-lg text-[#181614]">
                Proceeding to {hotel.partnerName}
              </h4>
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed font-sans">
              You are being directed to our verified accommodation partner. RoamCraft earns an affiliate commission on completed stays, which helps keep our creator travel journal independent.
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setShowRedirectModal(false)}
                className="flex-1 btn-secondary text-xs"
              >
                Return
              </button>
              <a
                href={hotel.outboundUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowRedirectModal(false)}
                className="flex-1 btn-cta text-xs"
              >
                <span>Continue</span>
                <ExternalLinkIcon size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
