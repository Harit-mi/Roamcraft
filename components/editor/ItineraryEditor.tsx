"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Itinerary, ItineraryDay, ItineraryStop, TravelStyle, TravelerType } from "@/lib/types";
import { useApp } from "@/lib/context/app-context";
import { MOCK_CREATORS } from "@/lib/data/mock-db";
import { handleImageError } from "@/lib/utils/image-fallback";
import { 
  PlusIcon as Plus, 
  TrashIcon as Trash2, 
  CopyIcon as Copy, 
  ArrowUpIcon as ArrowUp, 
  ArrowDownIcon as ArrowDown, 
  EyeIcon as Eye, 
  SaveIcon as Save, 
  ArrowRightIcon as Send, 
  SparklesIcon as Sparkles, 
  CalendarIcon as Calendar, 
  LocationPinIcon as MapPin, 
  RupeeIcon as IndianRupee, 
  ClockIcon as Clock, 
  ImageIcon,
  CheckIcon as Check,
  AlertCircleIcon as AlertCircle,
  CompassIcon as Compass
} from "@/components/shared/icons";

interface ItineraryEditorProps {
  initialItinerary?: Itinerary;
  mode?: "create" | "edit";
}

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
];

export function ItineraryEditor({ initialItinerary, mode = "create" }: ItineraryEditorProps) {
  const router = useRouter();
  const { publishItinerary, updateItinerary } = useApp();

  const [title, setTitle] = useState(initialItinerary?.title || "");
  const [tagline, setTagline] = useState(initialItinerary?.tagline || "");
  const [destinationName, setDestinationName] = useState(initialItinerary?.destinationName || "South Goa");
  const [durationDays, setDurationDays] = useState(initialItinerary?.durationDays || 4);
  const [budgetPerPersonInr, setBudgetPerPersonInr] = useState(initialItinerary?.budgetPerPersonInr || 20000);
  const [travelerType, setTravelerType] = useState<TravelerType>(initialItinerary?.travelerType || "Couples");
  const [travelStyle, setTravelStyle] = useState<TravelStyle[]>(initialItinerary?.travelStyle || ["relaxation", "romantic"]);
  const [recommendedSeason, setRecommendedSeason] = useState(initialItinerary?.recommendedSeason || "October to March");
  const [coverImage, setCoverImage] = useState(initialItinerary?.coverImage || PRESET_IMAGES[0]);
  const [introNotes, setIntroNotes] = useState(initialItinerary?.introNotes || "");
  const [previewMode, setPreviewMode] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [successSaved, setSuccessSaved] = useState(false);

  // Day list
  const [days, setDays] = useState<ItineraryDay[]>(
    initialItinerary?.days || [
      {
        dayNumber: 1,
        title: "Day 1: Arrival & Coastal Welcome",
        theme: "Slow Exploration & Sunset",
        daySummary: "Check into your boutique stay and wander through unhurried village lanes.",
        dailyEstimatedCostInr: 3000,
        stops: [
          {
            id: `stop-${Date.now()}-1`,
            order: 1,
            title: "Old Latin Quarter Stroll",
            category: "attraction",
            durationMins: 90,
            estimatedCostInr: 0,
            description: "Stroll past colorful heritage villas with Portuguese brass knockers and tiled balconies.",
            foodTips: "Traditional poi bread and warm Bebinca at a local family bakery.",
            recommendedTimeOfDay: "Afternoon",
            sourceType: "creator",
          },
          {
            id: `stop-${Date.now()}-2`,
            order: 2,
            title: "Sunset Cove Sundowner",
            category: "viewpoint",
            durationMins: 120,
            estimatedCostInr: 800,
            description: "Secluded sandy beach cove for peaceful golden hour drinks.",
            recommendedTimeOfDay: "Sunset",
            sourceType: "creator",
          }
        ]
      }
    ]
  );

  const availableStyles: TravelStyle[] = [
    "adventure", "relaxation", "food", "culture", "luxury", "family", "romantic", "solo", "nature"
  ];

  const toggleStyle = (st: TravelStyle) => {
    setTravelStyle(prev => 
      prev.includes(st) ? prev.filter(s => s !== st) : [...prev, st]
    );
  };

  // Day operations
  const handleAddDay = () => {
    const nextDayNum = days.length + 1;
    setDays(prev => [
      ...prev,
      {
        dayNumber: nextDayNum,
        title: `Day ${nextDayNum}: Exploration & Sights`,
        theme: "Sightseeing & Dining",
        daySummary: "Curated morning through evening schedule.",
        dailyEstimatedCostInr: 3500,
        stops: []
      }
    ]);
  };

  const handleRemoveDay = (dayNumber: number) => {
    if (days.length <= 1) return;
    setDays(prev => prev.filter(d => d.dayNumber !== dayNumber).map((d, idx) => ({ ...d, dayNumber: idx + 1 })));
  };

  // Stop operations
  const handleAddStop = (dayNumber: number) => {
    setDays(prev => prev.map(day => {
      if (day.dayNumber !== dayNumber) return day;
      const nextOrder = day.stops.length + 1;
      const newStop: ItineraryStop = {
        id: `stop-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        order: nextOrder,
        title: `New Stop ${nextOrder}`,
        category: "attraction",
        durationMins: 90,
        estimatedCostInr: 500,
        description: "Field-tested activity and local highlights.",
        recommendedTimeOfDay: "Morning",
        sourceType: "creator",
      };
      return { ...day, stops: [...day.stops, newStop] };
    }));
  };

  const handleUpdateStop = (dayNumber: number, stopId: string, updated: Partial<ItineraryStop>) => {
    setDays(prev => prev.map(day => {
      if (day.dayNumber !== dayNumber) return day;
      return {
        ...day,
        stops: day.stops.map(s => s.id === stopId ? { ...s, ...updated } : s)
      };
    }));
  };

  const handleDuplicateStop = (dayNumber: number, stopId: string) => {
    setDays(prev => prev.map(day => {
      if (day.dayNumber !== dayNumber) return day;
      const source = day.stops.find(s => s.id === stopId);
      if (!source) return day;
      const cloned: ItineraryStop = {
        ...source,
        id: `stop-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        title: `${source.title} (Duplicate)`,
        order: day.stops.length + 1,
      };
      return { ...day, stops: [...day.stops, cloned] };
    }));
  };

  const handleRemoveStop = (dayNumber: number, stopId: string) => {
    setDays(prev => prev.map(day => {
      if (day.dayNumber !== dayNumber) return day;
      return {
        ...day,
        stops: day.stops.filter(s => s.id !== stopId).map((s, idx) => ({ ...s, order: idx + 1 }))
      };
    }));
  };

  const handleMoveStop = (dayNumber: number, stopIndex: number, direction: "up" | "down") => {
    setDays(prev => prev.map(day => {
      if (day.dayNumber !== dayNumber) return day;
      const targetIndex = direction === "up" ? stopIndex - 1 : stopIndex + 1;
      if (targetIndex < 0 || targetIndex >= day.stops.length) return day;

      const newStops = [...day.stops];
      const temp = newStops[stopIndex];
      newStops[stopIndex] = newStops[targetIndex];
      newStops[targetIndex] = temp;

      return {
        ...day,
        stops: newStops.map((s, idx) => ({ ...s, order: idx + 1 }))
      };
    }));
  };

  const handleSave = (targetStatus: "published" | "draft") => {
    if (!title.trim()) {
      setValidationError("Please enter an itinerary title.");
      return;
    }
    if (!destinationName.trim()) {
      setValidationError("Please specify a destination.");
      return;
    }

    setValidationError("");
    const slug = initialItinerary?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const itineraryData: Itinerary = {
      id: initialItinerary?.id || `itin-${Date.now()}`,
      slug,
      title: title.trim(),
      tagline: tagline.trim() || `Creator travel blueprint for ${destinationName}`,
      creatorId: initialItinerary?.creatorId || "creator-3",
      creator: initialItinerary?.creator || MOCK_CREATORS[2],
      destinationId: initialItinerary?.destinationId || "dest-goa-south",
      destinationName: destinationName.trim(),
      isInternational: false,
      coverImage,
      durationDays: days.length,
      budgetPerPersonInr: Number(budgetPerPersonInr) || 15000,
      travelStyle: travelStyle.length > 0 ? travelStyle : ["relaxation"],
      travelerType,
      recommendedSeason,
      publishedDate: initialItinerary?.publishedDate || new Date().toISOString().split("T")[0],
      status: targetStatus,
      savesCount: initialItinerary?.savesCount || 0,
      viewsCount: initialItinerary?.viewsCount || 1,
      introNotes: introNotes || "Tested ground route with honest pacing and local food stops.",
      packingAndPracticalTips: initialItinerary?.packingAndPracticalTips || [
        "Carry light breathable clothing and comfortable walking sandals.",
        "Cash is helpful for smaller beach shacks and village ferries.",
        "Rent a scooter or car from trusted local operators."
      ],
      days,
      hotels: initialItinerary?.hotels || [],
    };

    if (mode === "edit" && initialItinerary) {
      updateItinerary(initialItinerary.id, itineraryData);
    } else {
      publishItinerary(itineraryData);
    }

    setSuccessSaved(true);
    setTimeout(() => {
      router.push(`/itineraries/${itineraryData.slug}`);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7DFD5]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E7DFD5] text-[10px] font-mono uppercase tracking-widest text-[#263D33]">
            <Compass className="w-3.5 h-3.5 text-[#C2542D]" />
            <span>{mode === "edit" ? "EXPEDITION BLUEPRINT EDITOR" : "CREATOR ITINERARY ATELIER"}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#181614] tracking-tight">
            {title ? title : "Untitled Expedition Blueprint"}
          </h1>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            className="btn-editorial-secondary"
          >
            <Save className="w-3.5 h-3.5 text-[#8C827A]" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave("published")}
            className="btn-editorial-terracotta"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Dispatch</span>
          </button>
        </div>
      </div>

      {validationError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      {successSaved && (
        <div className="p-4 bg-[#263D33]/10 border border-[#263D33]/20 text-[#263D33] rounded-xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-[#263D33] shrink-0" />
          <span>Itinerary blueprint successfully saved! Redirecting to live dispatch...</span>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Trip Basics (Col 1-7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#FAF7F2] p-6 sm:p-7 rounded-2xl border border-[#E7DFD5] shadow-xs space-y-5">
            <div className="border-b border-[#E7DFD5] pb-3">
              <span className="font-mono uppercase text-[10px] tracking-widest text-[#8C827A] block">
                EXPEDITION METADATA
              </span>
              <h3 className="font-serif text-lg font-normal text-[#181614]">
                Core Route Parameters
              </h3>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#181614] block mb-1">
                Expedition Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Hidden South Goa: Portuguese Quarters & Secret Coves"
                className="w-full p-3 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs sm:text-sm font-sans text-[#181614] focus:outline-none focus:border-[#C2542D]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#181614] block mb-1">
                Editorial Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. 5 days of slow coastal living and hidden backwaters."
                className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614] focus:outline-none focus:border-[#C2542D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#181614] block mb-1">
                  Geographic Destination *
                </label>
                <input
                  type="text"
                  value={destinationName}
                  onChange={(e) => setDestinationName(e.target.value)}
                  placeholder="e.g. South Goa, Ladakh"
                  className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614] focus:outline-none focus:border-[#C2542D]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181614] block mb-1">
                  Budget / Person (INR)
                </label>
                <input
                  type="number"
                  step="500"
                  value={budgetPerPersonInr}
                  onChange={(e) => setBudgetPerPersonInr(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614] focus:outline-none focus:border-[#C2542D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#181614] block mb-1">
                  Traveler Persona
                </label>
                <select
                  value={travelerType}
                  onChange={(e) => setTravelerType(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614]"
                >
                  <option value="Couples">Couples</option>
                  <option value="Honeymooners">Honeymooners</option>
                  <option value="Solo Traveler">Solo Traveler</option>
                  <option value="Families">Families</option>
                  <option value="Group of Friends">Group of Friends</option>
                  <option value="Budget Explorers">Budget Explorers</option>
                  <option value="Luxury Seekers">Luxury Seekers</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181614] block mb-1">
                  Recommended Season
                </label>
                <input
                  type="text"
                  value={recommendedSeason}
                  onChange={(e) => setRecommendedSeason(e.target.value)}
                  placeholder="e.g. October to March"
                  className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614]"
                />
              </div>
            </div>

            {/* Travel Styles Toggle */}
            <div>
              <label className="text-xs font-semibold text-[#181614] block mb-1.5">
                Travel Styles & Themes
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableStyles.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => toggleStyle(st)}
                    className={`px-3 py-1 rounded-md text-xs capitalize transition-all ${
                      travelStyle.includes(st)
                        ? "bg-[#181614] text-[#FAF7F2] font-semibold"
                        : "bg-[#F8F5F0] text-[#5C554E] border border-[#E7DFD5] hover:text-[#181614]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#181614] block mb-1">
                Creator Field Introduction & Ground Guidance
              </label>
              <textarea
                rows={3}
                value={introNotes}
                onChange={(e) => setIntroNotes(e.target.value)}
                placeholder="Share your personal field perspective, what makes this itinerary special, and transit advice..."
                className="w-full p-3 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614] focus:outline-none focus:border-[#C2542D]"
              />
            </div>
          </div>

          {/* DAY-BY-DAY BUILDER SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7DFD5]">
              <div>
                <h3 className="font-serif text-xl font-normal text-[#181614]">
                  Day-by-Day Schedule ({days.length} Days)
                </h3>
                <span className="text-xs text-[#5C554E]">Calibrate timings, sequential stops, and estimated expenses</span>
              </div>
              <button
                type="button"
                onClick={handleAddDay}
                className="btn-editorial-primary text-xs py-1.5 px-4"
              >
                <Plus className="w-3.5 h-3.5 text-[#C2542D]" />
                <span>Add Day</span>
              </button>
            </div>

            <div className="space-y-6">
              {days.map((day) => (
                <div key={day.dayNumber} className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-6 border border-[#E7DFD5] shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7DFD5]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-md bg-[#181614] text-[#FAF7F2] text-xs font-mono font-bold flex items-center justify-center">
                        D{day.dayNumber}
                      </span>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDays(prev => prev.map(d => d.dayNumber === day.dayNumber ? { ...d, title: val } : d));
                        }}
                        className="font-serif text-base text-[#181614] bg-transparent border-b border-dashed border-[#8C827A] focus:outline-none font-medium"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddStop(day.dayNumber)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-white text-[#181614] border border-[#E7DFD5] text-xs font-mono font-medium transition-all active:scale-95 shadow-2xs"
                      >
                        <Plus className="w-3 h-3 text-[#C2542D]" />
                        <span>Add Stop</span>
                      </button>

                      {days.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDay(day.dayNumber)}
                          className="p-1.5 rounded-md text-[#8C827A] hover:bg-[#C2542D]/10 hover:text-[#C2542D]"
                          title="Delete Day"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Stops inside Day */}
                  {day.stops.length > 0 ? (
                    <div className="space-y-3">
                      {day.stops.map((stop, stopIndex) => (
                        <div key={stop.id} className="p-4 rounded-xl bg-[#F8F5F0] border border-[#E7DFD5] space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-xs font-mono font-bold text-[#C2542D]">0{stop.order}.</span>
                              <input
                                type="text"
                                value={stop.title}
                                onChange={(e) => handleUpdateStop(day.dayNumber, stop.id, { title: e.target.value })}
                                placeholder="Stop title..."
                                className="font-serif font-medium text-sm text-[#181614] bg-transparent flex-1 focus:outline-none border-b border-dotted border-[#E7DFD5]"
                              />
                            </div>

                            {/* Keyboard Accessible Reordering & Actions */}
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleMoveStop(day.dayNumber, stopIndex, "up")}
                                disabled={stopIndex === 0}
                                className={`p-1 rounded text-[#5C554E] hover:bg-white ${
                                  stopIndex === 0 ? "opacity-25" : ""
                                }`}
                                title="Move Earlier"
                                aria-label="Move stop earlier"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveStop(day.dayNumber, stopIndex, "down")}
                                disabled={stopIndex === day.stops.length - 1}
                                className={`p-1 rounded text-[#5C554E] hover:bg-white ${
                                  stopIndex === day.stops.length - 1 ? "opacity-25" : ""
                                }`}
                                title="Move Later"
                                aria-label="Move stop later"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDuplicateStop(day.dayNumber, stop.id)}
                                className="p-1 rounded text-[#5C554E] hover:bg-white"
                                title="Duplicate Stop"
                                aria-label="Duplicate stop"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveStop(day.dayNumber, stop.id)}
                                className="p-1 rounded text-[#8C827A] hover:bg-[#C2542D]/10 hover:text-[#C2542D]"
                                title="Delete Stop"
                                aria-label="Delete stop"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                            <input
                              type="number"
                              value={stop.durationMins}
                              onChange={(e) => handleUpdateStop(day.dayNumber, stop.id, { durationMins: Number(e.target.value) })}
                              placeholder="Duration (mins)"
                              className="p-2 rounded bg-white border border-[#E7DFD5] text-[11px] font-mono text-[#181614]"
                            />
                            <input
                              type="number"
                              value={stop.estimatedCostInr}
                              onChange={(e) => handleUpdateStop(day.dayNumber, stop.id, { estimatedCostInr: Number(e.target.value) })}
                              placeholder="Cost in INR"
                              className="p-2 rounded bg-white border border-[#E7DFD5] text-[11px] font-mono text-[#181614]"
                            />
                            <select
                              value={stop.recommendedTimeOfDay || "Morning"}
                              onChange={(e) => handleUpdateStop(day.dayNumber, stop.id, { recommendedTimeOfDay: e.target.value as any })}
                              className="p-2 rounded bg-white border border-[#E7DFD5] text-[11px] font-mono text-[#181614]"
                            >
                              <option value="Morning">Morning</option>
                              <option value="Afternoon">Afternoon</option>
                              <option value="Sunset">Sunset</option>
                              <option value="Night">Night</option>
                            </select>
                          </div>

                          <textarea
                            rows={2}
                            value={stop.description}
                            onChange={(e) => handleUpdateStop(day.dayNumber, stop.id, { description: e.target.value })}
                            placeholder="Description and instructions for this stop..."
                            className="w-full p-2.5 rounded-lg bg-white border border-[#E7DFD5] text-xs text-[#5C554E]"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-[#E7DFD5] rounded-xl text-xs text-[#8C827A]">
                      No stops added for Day {day.dayNumber}. Tap &ldquo;Add Stop&rdquo; above.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visuals & Publishing Details (Col 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cover Image Picker */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7DFD5] shadow-xs space-y-4">
            <h4 className="font-serif text-base text-[#181614] flex items-center gap-2 font-medium">
              <ImageIcon className="w-4 h-4 text-[#C2542D]" />
              <span>Cover Photography</span>
            </h4>

            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#181614] border border-[#E7DFD5]">
              <img
                src={coverImage}
                alt="Itinerary Cover Preview"
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#8C827A] block mb-1">
                CUSTOM IMAGE URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614]"
              />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C827A] block mb-2">PRESET TRAVEL PHOTOGRAPHY:</span>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_IMAGES.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCoverImage(imgUrl)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-transform ${
                      coverImage === imgUrl ? "border-[#C2542D] scale-105" : "border-transparent"
                    }`}
                  >
                    <img src={imgUrl} alt="Preset thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Publishing Checklist Card */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7DFD5] space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C827A] block">
              EDITORIAL PUBLISHING GATE
            </span>
            <ul className="space-y-2.5 text-xs text-[#5C554E]">
              <li className="flex items-center gap-2.5">
                <Check className={`w-3.5 h-3.5 ${title ? "text-[#263D33]" : "text-[#8C827A]"}`} />
                <span>Title & destination configured</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className={`w-3.5 h-3.5 ${days.length > 0 ? "text-[#263D33]" : "text-[#8C827A]"}`} />
                <span>At least one day schedule created</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className={`w-3.5 h-3.5 ${days.some(d => d.stops.length > 0) ? "text-[#263D33]" : "text-[#8C827A]"}`} />
                <span>Stops and field timings detailed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
