"use client";

import React from "react";
import { ItineraryStop } from "@/lib/types";
import { 
  ClockIcon as Clock, 
  LocationPinIcon as MapPin, 
  NavigationIcon as Navigation, 
  ExternalLinkIcon as ExternalLink, 
  CheckSquareIcon,
  UtensilsIcon as Utensils,
  ArrowUpIcon as ArrowUp, 
  ArrowDownIcon as ArrowDown, 
  SparklesIcon as Sparkles, 
  ShieldCheckIcon as ShieldCheck 
} from "@/components/shared/icons";

interface ItineraryStopCardProps {
  stop: ItineraryStop;
  isVisited?: boolean;
  onToggleVisited?: () => void;
  canReorder?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  destinationContext?: string;
}

export function ItineraryStopCard({
  stop,
  isVisited = false,
  onToggleVisited,
  canReorder = false,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
  destinationContext = "",
}: ItineraryStopCardProps) {
  const isCreatorOriginal = stop.sourceType !== "external_recommendation";

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        isVisited
          ? "bg-[#F2EDE4]/60 border-[#E7DFD5] opacity-75"
          : "bg-[#FAF7F2] border-[#E7DFD5] hover:border-[#C2542D] shadow-xs"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          {/* Visited Checkbox */}
          {onToggleVisited && (
            <button
              onClick={onToggleVisited}
              className="mt-1 text-[#78716C] hover:text-[#C2542D] transition-colors shrink-0"
              title={isVisited ? "Mark as unvisited" : "Mark as visited"}
              aria-label={isVisited ? "Mark stop unvisited" : "Mark stop visited"}
            >
              <CheckSquareIcon checked={isVisited} size={18} className={isVisited ? "text-[#C2542D]" : "text-[#78716C]"} />
            </button>
          )}

          <div className="space-y-3 flex-1">
            {/* Header: Sequence numeral, Title, Distinction Badge */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] font-bold text-[#C2542D] bg-[#F2EDE4] px-2 py-0.5 rounded border border-[#E7DFD5]">
                  STOP {String(stop.order).padStart(2, "0")}
                </span>

                {isCreatorOriginal ? (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-wider uppercase text-[#1B4332] bg-[#EAF2ED] px-2 py-0.5 rounded border border-[#C5DED0]">
                    <ShieldCheck className="w-3 h-3 text-[#1B4332]" />
                    Creator Walked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-wider uppercase text-[#923819] bg-[#FDF0EB] px-2 py-0.5 rounded border border-[#F5D0C3]">
                    <Sparkles className="w-3 h-3" />
                    Editor Suggestion
                  </span>
                )}

                {stop.recommendedTimeOfDay && (
                  <span className="text-[9px] font-mono uppercase text-[#78716C]">
                    • {stop.recommendedTimeOfDay}
                  </span>
                )}
              </div>

              <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#181614] leading-snug">
                {stop.title}
              </h4>
            </div>

            {/* Stop Description */}
            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed font-sans">
              {stop.description}
            </p>

            {/* Food Recommendation / Local Tip in Warm Italicized Callout */}
            {stop.foodTips && (
              <div className="p-3.5 bg-[#F2EDE4] rounded-xl border border-[#E7DFD5] text-xs text-[#181614] flex items-start gap-2.5">
                <Utensils className="w-4 h-4 text-[#C2542D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#C2542D] font-bold block mb-0.5">
                    Field Culinary Note
                  </span>
                  <p className="font-serif italic leading-relaxed text-[#292524]">
                    &ldquo;{stop.foodTips}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {/* Transit, Estimated Spend & Maps Footer */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#E7DFD5] font-mono text-[#78716C]">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1 text-[#181614] font-medium">
                  <Clock className="w-3 h-3 text-[#78716C]" />
                  {stop.durationMins} MINS
                </span>
                <span>•</span>
                <span className="font-semibold text-[#181614]">
                  {stop.estimatedCostInr === 0 ? "FREE ENTRY" : `₹${stop.estimatedCostInr.toLocaleString("en-IN")}`}
                </span>
                {stop.travelTimeFromPrevMins && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#78716C]">
                      <Navigation className="w-3 h-3 text-[#C2542D]" />
                      ~{stop.travelTimeFromPrevMins} mins travel
                    </span>
                  </>
                )}
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  stop.mapQuery || `${stop.title} ${destinationContext}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#C2542D] hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Maps Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Keyboard Reordering Controls */}
        {canReorder && (
          <div className="flex flex-col gap-1 shrink-0 ml-2">
            <button
              onClick={onMoveUp}
              disabled={isFirst}
              className={`p-1.5 rounded-lg border border-[#E7DFD5] text-[#181614] hover:bg-[#F2EDE4] transition-colors ${
                isFirst ? "opacity-30 cursor-not-allowed" : ""
              }`}
              title="Move stop earlier"
              aria-label="Move stop earlier"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onMoveDown}
              disabled={isLast}
              className={`p-1.5 rounded-lg border border-[#E7DFD5] text-[#181614] hover:bg-[#F2EDE4] transition-colors ${
                isLast ? "opacity-30 cursor-not-allowed" : ""
              }`}
              title="Move stop later"
              aria-label="Move stop later"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
