"use client";

import React from "react";
import { LocationPinIcon as MapPin, ExternalLinkIcon as ExternalLink, NavigationIcon as Navigation, InfoIcon as Info } from "@/components/shared/icons";
import { ItineraryStop } from "@/lib/types";

interface MapPreviewProps {
  destinationName: string;
  stops: ItineraryStop[];
}

export function MapPreview({ destinationName, stops }: MapPreviewProps) {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${destinationName} scenic route`
  )}`;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-terracotta-100 text-terracotta flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-charcoal-900">Route & Geographic Overview</h4>
            <span className="text-[11px] text-stone-500">{stops.length} Stops in {destinationName}</span>
          </div>
        </div>

        <a
          href={mapSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-terracotta hover:underline flex items-center gap-1"
        >
          <span>Open Full Map</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Styled Route Map Wireframe preview */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/8] bg-cream-100 border border-cream-300 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] text-charcoal-600 font-medium">
          <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-xs">
            Region: {destinationName}
          </span>
          <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-xs">
            Static Curated Points
          </span>
        </div>

        {/* Visual Stop Nodes */}
        <div className="flex items-center justify-between px-4 py-2">
          {stops.slice(0, 4).map((stop, idx) => (
            <div key={stop.id} className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-terracotta text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                {idx + 1}
              </div>
              <span className="text-[10px] font-medium text-charcoal-800 mt-1 max-w-[70px] truncate text-center">
                {stop.title}
              </span>
            </div>
          ))}
        </div>

        <div className="text-[10px] text-stone-500 bg-white/80 backdrop-blur-xs p-1.5 rounded-lg flex items-center gap-1">
          <Info className="w-3 h-3 text-stone-400 shrink-0" />
          <span>Navigational links open directly in native Maps applications for live GPS guidance.</span>
        </div>
      </div>
    </div>
  );
}
