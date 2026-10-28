"use client";

import React, { useState } from "react";
import { ItineraryDay, ItineraryStop } from "@/lib/types";
import { ItineraryStopCard } from "./ItineraryStopCard";
import { CalendarIcon, ClockIcon, RupeeIcon, NavigationIcon } from "@/components/shared/icons";

interface DayTimelineProps {
  days: ItineraryDay[];
  destinationName: string;
  visitedStopIds?: string[];
  onToggleVisited?: (stopId: string) => void;
  canReorder?: boolean;
  onMoveStop?: (dayNumber: number, stopIndex: number, direction: "up" | "down") => void;
}

export function DayTimeline({
  days,
  destinationName,
  visitedStopIds = [],
  onToggleVisited,
  canReorder = false,
  onMoveStop,
}: DayTimelineProps) {
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const currentDay = days.find((d) => d.dayNumber === selectedDayNumber) || days[0];

  return (
    <div className="space-y-6">
      {/* Day Selector Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#E7DFD5]">
        {days.map((day) => {
          const isActive = day.dayNumber === selectedDayNumber;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayNumber(day.dayNumber)}
              className={`px-5 py-2 rounded-lg text-xs font-mono tracking-wider shrink-0 transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-[#181614] text-[#FAF7F2] font-semibold shadow-xs"
                  : "bg-[#FAF7F2] text-[#57534E] border border-[#E7DFD5] hover:border-[#181614]/40 hover:text-[#181614] hover:bg-white"
              }`}
            >
              Day {day.dayNumber} • {day.title.split(":")[1]?.trim() || day.title}
            </button>
          );
        })}
      </div>

      {/* Day Focus Header */}
      {currentDay && (
        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7DFD5] space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E7DFD5] pb-3">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-0.5">
                EXPEDITION SCHEDULE • DAY {String(currentDay.dayNumber).padStart(2, "0")}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#181614]">Day {currentDay.dayNumber}: {currentDay.title}</h3>
            </div>
            {currentDay.dailyEstimatedCostInr && (
              <span className="font-mono text-xs text-[#181614]">
                EST. DAY SPEND: ₹{currentDay.dailyEstimatedCostInr.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#57534E] font-serif italic pt-1 leading-relaxed">
            &ldquo;{currentDay.daySummary}&rdquo;
          </p>
        </div>
      )}

      {/* Stops Sequential Stack */}
      <div className="space-y-4 pt-1">
        {currentDay?.stops.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E7DFD5] text-xs text-[#78716C] font-mono">
            No specific stops recorded for this day yet.
          </div>
        ) : (
          currentDay?.stops.map((stop, idx) => (
            <ItineraryStopCard
              key={stop.id}
              stop={stop}
              destinationContext={destinationName}
              isVisited={visitedStopIds.includes(stop.id)}
              onToggleVisited={onToggleVisited ? () => onToggleVisited(stop.id) : undefined}
              canReorder={canReorder}
              isFirst={idx === 0}
              isLast={idx === (currentDay?.stops.length || 0) - 1}
              onMoveUp={
                onMoveStop && idx > 0
                  ? () => onMoveStop(currentDay.dayNumber, idx, "up")
                  : undefined
              }
              onMoveDown={
                onMoveStop && idx < (currentDay?.stops.length || 0) - 1
                  ? () => onMoveStop(currentDay.dayNumber, idx, "down")
                  : undefined
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
