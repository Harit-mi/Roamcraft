"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/context/app-context";
import { MOCK_DESTINATIONS, MOCK_ITINERARIES } from "@/lib/data/mock-db";
import { PersonalTrip, PersonalTripStop, TravelStyle } from "@/lib/types";
import { 
  CalendarIcon as CalendarDays, 
  PlusIcon as Plus, 
  TrashIcon as Trash2, 
  ArrowUpIcon as ArrowUp, 
  ArrowDownIcon as ArrowDown, 
  ArrowRightIcon as MoveRight, 
  SparklesIcon as Sparkles, 
  ShareIcon as Share2, 
  CheckIcon as CheckCircle2, 
  ClockIcon as Clock, 
  RupeeIcon as IndianRupee, 
  LocationPinIcon as MapPin, 
  UsersIcon as Users, 
  CheckSquareIcon,
  BookOpenIcon as StickyNote,
  AlertCircleIcon as AlertCircle,
  InfoIcon as HelpCircle,
  ExternalLinkIcon as Download
} from "@/components/shared/icons";

function TripPlannerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tripIdParam = searchParams.get("tripId");

  const { 
    personalTrips, 
    updateTrip, 
    deleteTrip, 
    addStopToTrip, 
    removeStopFromTrip, 
    toggleStopVisited, 
    createEmptyTrip,
    createTripFromItinerary 
  } = useApp();

  const [activeTripId, setActiveTripId] = useState<string>(
    tripIdParam || (personalTrips[0]?.id ?? "")
  );

  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [showAddStopModal, setShowAddStopModal] = useState(false);
  const [showAiAssistantModal, setShowAiAssistantModal] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // New Stop Form State
  const [newStopTitle, setNewStopTitle] = useState("");
  const [newStopCategory, setNewStopCategory] = useState<"attraction" | "food" | "activity" | "viewpoint">("attraction");
  const [newStopDuration, setNewStopDuration] = useState("90");
  const [newStopCost, setNewStopCost] = useState("0");
  const [newStopNotes, setNewStopNotes] = useState("");
  const [newStopTimeOfDay, setNewStopTimeOfDay] = useState<"Morning" | "Afternoon" | "Sunset" | "Night">("Morning");

  // Keep activeTripId in sync with query or list
  useEffect(() => {
    if (tripIdParam && tripIdParam !== activeTripId) {
      setActiveTripId(tripIdParam);
    } else if (!activeTripId && personalTrips.length > 0) {
      setActiveTripId(personalTrips[0].id);
    }
  }, [tripIdParam, personalTrips, activeTripId]);

  const activeTrip = personalTrips.find((t) => t.id === activeTripId) || personalTrips[0];

  const handleCreateNewTrip = () => {
    const newId = createEmptyTrip("South Goa", 4);
    setActiveTripId(newId);
    router.push(`/planner?tripId=${newId}`);
  };

  const handleCloneBlueprint = (itineraryId: string) => {
    const itin = MOCK_ITINERARIES.find(i => i.id === itineraryId);
    if (!itin) return;
    const newId = createTripFromItinerary(itin);
    setActiveTripId(newId);
    router.push(`/planner?tripId=${newId}`);
  };

  const handleAddStopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip || !newStopTitle.trim()) return;

    addStopToTrip(activeTrip.id, activeDayNumber, {
      title: newStopTitle.trim(),
      category: newStopCategory,
      durationMins: parseInt(newStopDuration) || 60,
      estimatedCostInr: parseInt(newStopCost) || 0,
      description: newStopNotes.trim() || "Custom traveler stop.",
      recommendedTimeOfDay: newStopTimeOfDay,
    });

    // Reset Form
    setNewStopTitle("");
    setNewStopCost("0");
    setNewStopNotes("");
    setShowAddStopModal(false);
  };

  const handleMoveStop = (dayNumber: number, stopIndex: number, direction: "up" | "down") => {
    if (!activeTrip) return;
    const targetDay = activeTrip.days.find(d => d.dayNumber === dayNumber);
    if (!targetDay) return;

    const newStops = [...targetDay.stops];
    const targetIndex = direction === "up" ? stopIndex - 1 : stopIndex + 1;
    if (targetIndex < 0 || targetIndex >= newStops.length) return;

    const temp = newStops[stopIndex];
    newStops[stopIndex] = newStops[targetIndex];
    newStops[targetIndex] = temp;

    // Reassign order
    const orderedStops = newStops.map((s, idx) => ({ ...s, order: idx + 1 }));

    const updatedDays = activeTrip.days.map(d => 
      d.dayNumber === dayNumber ? { ...d, stops: orderedStops } : d
    );

    updateTrip(activeTrip.id, { days: updatedDays });
  };

  const handleTransferDay = (stopId: string, fromDayNumber: number, toDayNumber: number) => {
    if (!activeTrip || fromDayNumber === toDayNumber) return;

    const sourceDay = activeTrip.days.find(d => d.dayNumber === fromDayNumber);
    const targetDay = activeTrip.days.find(d => d.dayNumber === toDayNumber);
    if (!sourceDay || !targetDay) return;

    const stopToMove = sourceDay.stops.find(s => s.id === stopId);
    if (!stopToMove) return;

    const updatedSourceStops = sourceDay.stops
      .filter(s => s.id !== stopId)
      .map((s, idx) => ({ ...s, order: idx + 1 }));

    const updatedTargetStops = [
      ...targetDay.stops,
      { ...stopToMove, order: targetDay.stops.length + 1 }
    ];

    const updatedDays = activeTrip.days.map(d => {
      if (d.dayNumber === fromDayNumber) return { ...d, stops: updatedSourceStops };
      if (d.dayNumber === toDayNumber) return { ...d, stops: updatedTargetStops };
      return d;
    });

    updateTrip(activeTrip.id, { days: updatedDays });
  };

  const handleApplyAiSuggestion = (suggestionTitle: string, category: any, cost: number, tip: string) => {
    if (!activeTrip) return;
    addStopToTrip(activeTrip.id, activeDayNumber, {
      title: suggestionTitle,
      category,
      durationMins: 90,
      estimatedCostInr: cost,
      description: tip,
      recommendedTimeOfDay: "Afternoon",
    });
    setShowAiAssistantModal(false);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // If no trip exists yet
  if (!activeTrip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-forest-50 text-forest-700 flex items-center justify-center mx-auto">
          <CalendarDays className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal-900">No Trips Created Yet</h2>
        <p className="text-xs text-charcoal-600 max-w-md mx-auto">
          Start planning your next getaway by customizing a creator-tested blueprint or starting from a clean slate.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={handleCreateNewTrip}
            className="px-5 py-2.5 rounded-2xl bg-forest-700 text-white text-xs font-bold hover:bg-forest-800 transition-colors"
          >
            Create Blank Trip
          </button>
          <Link
            href="/explore"
            className="px-5 py-2.5 rounded-2xl border border-stone-300 text-charcoal-800 text-xs font-bold hover:bg-stone-50"
          >
            Explore Blueprints
          </Link>
        </div>
      </div>
    );
  }

  const currentDay = activeTrip.days.find(d => d.dayNumber === activeDayNumber) || activeTrip.days[0];
  const totalStopsCount = activeTrip.days.reduce((acc, d) => acc + d.stops.length, 0);
  const totalTripBudget = activeTrip.budgetPerPersonInr * activeTrip.partySize;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: My Trips Selector & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-forest-700 uppercase tracking-wider block mb-1">
            Personal Workspace
          </span>
          <div className="flex items-center gap-3">
            <select
              value={activeTrip.id}
              onChange={(e) => {
                setActiveTripId(e.target.value);
                router.push(`/planner?tripId=${e.target.value}`);
              }}
              className="text-xl sm:text-2xl font-extrabold text-charcoal-900 bg-transparent border-b-2 border-stone-300 focus:border-forest-700 focus:outline-none cursor-pointer pr-4"
            >
              {personalTrips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.title} ({trip.destinationName})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAiAssistantModal(true)}
            className="px-3.5 py-2 rounded-xl bg-ochre-50 text-ochre-800 border border-ochre-200 hover:bg-ochre-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-ochre-600" />
            <span>AI Assistant Suggestions</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-stone-300 text-charcoal-700 hover:bg-stone-50 text-xs font-semibold transition-colors relative"
            title="Share Trip Plan"
          >
            <Share2 className="w-4 h-4" />
            {copiedShare && (
              <span className="absolute -top-7 right-0 bg-charcoal-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                Copied!
              </span>
            )}
          </button>

          <button
            onClick={handleCreateNewTrip}
            className="px-4 py-2 rounded-xl bg-forest-700 text-white text-xs font-bold hover:bg-forest-800 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Trip</span>
          </button>
        </div>
      </div>

      {/* Trip Meta Configuration Card (Party Size, Dates, Total Budget in INR) */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Destination & Title */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
            Destination
          </label>
          <div className="flex items-center gap-1.5 text-sm font-bold text-charcoal-900">
            <MapPin className="w-4 h-4 text-forest-700" />
            <span>{activeTrip.destinationName}</span>
          </div>
          <span className="text-[11px] text-stone-500 block">
            {activeTrip.days.length} Days Planned • {totalStopsCount} Stops
          </span>
        </div>

        {/* Travel Dates */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
            Trip Dates
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={activeTrip.startDate}
              onChange={(e) => updateTrip(activeTrip.id, { startDate: e.target.value })}
              className="p-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-charcoal-900"
            />
            <span className="text-xs text-stone-400">to</span>
            <input
              type="date"
              value={activeTrip.endDate}
              onChange={(e) => updateTrip(activeTrip.id, { endDate: e.target.value })}
              className="p-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-charcoal-900"
            />
          </div>
        </div>

        {/* Party Size Stepper */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
            Party Size (Travelers)
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50">
              <button
                onClick={() => updateTrip(activeTrip.id, { partySize: Math.max(1, activeTrip.partySize - 1) })}
                className="px-3 py-1 text-sm font-bold text-charcoal-700 hover:bg-stone-200"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-charcoal-900">
                {activeTrip.partySize} {activeTrip.partySize === 1 ? "Person" : "People"}
              </span>
              <button
                onClick={() => updateTrip(activeTrip.id, { partySize: activeTrip.partySize + 1 })}
                className="px-3 py-1 text-sm font-bold text-charcoal-700 hover:bg-stone-200"
              >
                +
              </button>
            </div>
            <Users className="w-4 h-4 text-forest-700" />
          </div>
        </div>

        {/* Estimated Budget in INR */}
        <div className="space-y-1 bg-forest-50 p-3 rounded-2xl border border-forest-100">
          <label className="text-[10px] font-bold uppercase tracking-wider text-forest-800 block">
            Total Estimated Budget
          </label>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-forest-900">
              ₹{totalTripBudget.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-forest-700">
              (₹{activeTrip.budgetPerPersonInr.toLocaleString("en-IN")}/pax)
            </span>
          </div>
          <span className="text-[10px] text-forest-700/80 block">
            Based on average local activities & stays
          </span>
        </div>
      </div>

      {/* Day Timeline & Activities Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Day Navigator + Activity List (Col 1-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
            {activeTrip.days.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayNumber(day.dayNumber)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                  activeDayNumber === day.dayNumber
                    ? "bg-forest-700 text-white shadow-sm"
                    : "bg-white text-charcoal-700 border border-stone-200 hover:bg-stone-50"
                }`}
              >
                Day {day.dayNumber} ({day.stops.length} Stops)
              </button>
            ))}
            <button
              onClick={() => {
                const newDayNum = activeTrip.days.length + 1;
                updateTrip(activeTrip.id, {
                  days: [
                    ...activeTrip.days,
                    { dayNumber: newDayNum, title: `Day ${newDayNum} Exploration`, stops: [] }
                  ]
                });
                setActiveDayNumber(newDayNum);
              }}
              className="px-3 py-2 rounded-2xl text-xs font-semibold text-forest-700 border border-dashed border-forest-300 hover:bg-forest-50 shrink-0 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Day</span>
            </button>
          </div>

          {/* Current Day Activity Stack */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-forest-700 uppercase tracking-wider block">
                  Editing Schedule
                </span>
                <h3 className="font-bold text-lg text-charcoal-900">
                  Day {currentDay.dayNumber}: {currentDay.title}
                </h3>
              </div>
              <button
                onClick={() => setShowAddStopModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Place / Activity</span>
              </button>
            </div>

            {currentDay.stops.length > 0 ? (
              <div className="space-y-3 pt-2">
                {currentDay.stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      stop.visited
                        ? "bg-stone-50/80 border-stone-200 opacity-75"
                        : "bg-white border-stone-200/90 shadow-xs hover:border-forest-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* Checkbox & Details */}
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleStopVisited(activeTrip.id, currentDay.dayNumber, stop.id)}
                          className="mt-0.5 text-stone-400 hover:text-forest-700 transition-colors"
                          title={stop.visited ? "Mark as unvisited" : "Mark as visited"}
                        >
                          <CheckSquareIcon checked={stop.visited} size={16} className={stop.visited ? "text-forest-700" : "text-stone-400"} />
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-charcoal-900">{stop.title}</span>
                            <span className="text-[10px] uppercase font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                              {stop.category}
                            </span>
                          </div>
                          <p className="text-xs text-charcoal-600 mt-1">{stop.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-[11px] text-stone-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {stop.durationMins} mins
                            </span>
                            <span>•</span>
                            <span className="font-medium text-charcoal-800">
                              {stop.estimatedCostInr === 0 ? "Free" : `₹${stop.estimatedCostInr}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Control Tools: Reorder, Move Day, Delete */}
                      <div className="flex items-center gap-1 self-start shrink-0">
                        <button
                          onClick={() => handleMoveStop(currentDay.dayNumber, index, "up")}
                          disabled={index === 0}
                          className={`p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 ${
                            index === 0 ? "opacity-30 cursor-not-allowed" : ""
                          }`}
                          title="Move Earlier"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveStop(currentDay.dayNumber, index, "down")}
                          disabled={index === currentDay.stops.length - 1}
                          className={`p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 ${
                            index === currentDay.stops.length - 1 ? "opacity-30 cursor-not-allowed" : ""
                          }`}
                          title="Move Later"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Transfer Day Dropdown */}
                        {activeTrip.days.length > 1 && (
                          <select
                            onChange={(e) => handleTransferDay(stop.id, currentDay.dayNumber, parseInt(e.target.value))}
                            defaultValue={currentDay.dayNumber}
                            className="text-[10px] font-semibold p-1 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 focus:outline-none"
                            title="Move to another day"
                          >
                            <option value={currentDay.dayNumber} disabled>
                              Day {currentDay.dayNumber}
                            </option>
                            {activeTrip.days
                              .filter(d => d.dayNumber !== currentDay.dayNumber)
                              .map(d => (
                                <option key={d.dayNumber} value={d.dayNumber}>
                                  → Day {d.dayNumber}
                                </option>
                              ))}
                          </select>
                        )}

                        <button
                          onClick={() => removeStopFromTrip(activeTrip.id, currentDay.dayNumber, stop.id)}
                          className="p-1.5 rounded-lg border border-stone-200 text-rose-600 hover:bg-rose-50"
                          title="Delete Stop"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-stone-200 rounded-2xl space-y-2">
                <span className="text-xs text-charcoal-500 block">No stops added for this day yet.</span>
                <button
                  onClick={() => setShowAddStopModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-forest-50 text-forest-700 hover:bg-forest-100 text-xs font-bold inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add First Stop
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Personal Notes & Blueprints to Clone (Col 9-12) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Notes Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-charcoal-900">
              <StickyNote className="w-4 h-4 text-forest-700" />
              <span>Personal Notes & Packing Reminders</span>
            </div>
            <textarea
              rows={4}
              value={activeTrip.notes}
              onChange={(e) => updateTrip(activeTrip.id, { notes: e.target.value })}
              placeholder="e.g. Flight 6E 521 lands at 11am; remember to pre-book scooter rental..."
              className="w-full p-3 rounded-2xl bg-canvas-subtle border border-stone-200 text-xs text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-700"
            />
            <span className="text-[10px] text-stone-400 block">
              Auto-saved to your personal workspace.
            </span>
          </div>

          {/* Blueprint Templates to inject */}
          <div className="bg-canvas-subtle p-6 rounded-3xl border border-stone-200 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              Inspiration Blueprints
            </span>
            <h4 className="font-bold text-sm text-charcoal-900">
              Start from a Creator Template
            </h4>
            <div className="space-y-2 pt-1">
              {MOCK_ITINERARIES.slice(0, 3).map((itin) => (
                <button
                  key={itin.id}
                  onClick={() => handleCloneBlueprint(itin.id)}
                  className="w-full p-2.5 rounded-xl bg-white border border-stone-200/80 hover:border-forest-700 text-left transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-charcoal-800 truncate mr-2">
                    {itin.title.split(":")[0]}
                  </span>
                  <span className="text-[10px] text-forest-700 font-bold shrink-0">
                    {itin.durationDays}D Clone →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Stop Modal */}
      {showAddStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <h3 className="text-lg font-bold text-charcoal-900 mb-1">
              Add Place to Day {currentDay.dayNumber}
            </h3>
            <p className="text-xs text-charcoal-500 mb-4">
              Enter stop details, approximate time needed, and expected cost.
            </p>

            <form onSubmit={handleAddStopSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-charcoal-700 block mb-1">
                  Place or Activity Name
                </label>
                <input
                  type="text"
                  value={newStopTitle}
                  onChange={(e) => setNewStopTitle(e.target.value)}
                  placeholder="e.g. Cola Beach Kayaking, French Bakery..."
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-forest-700"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-charcoal-700 block mb-1">Category</label>
                  <select
                    value={newStopCategory}
                    onChange={(e) => setNewStopCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900"
                  >
                    <option value="attraction">Attraction</option>
                    <option value="food">Dining / Café</option>
                    <option value="activity">Activity / Adventure</option>
                    <option value="viewpoint">Viewpoint / Sunset</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-charcoal-700 block mb-1">Time of Day</label>
                  <select
                    value={newStopTimeOfDay}
                    onChange={(e) => setNewStopTimeOfDay(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Sunset">Sunset</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-charcoal-700 block mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={newStopDuration}
                    onChange={(e) => setNewStopDuration(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-charcoal-700 block mb-1">
                    Est. Cost in INR
                  </label>
                  <input
                    type="number"
                    value={newStopCost}
                    onChange={(e) => setNewStopCost(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-charcoal-700 block mb-1">
                  Food Tips or Description
                </label>
                <textarea
                  rows={2}
                  value={newStopNotes}
                  onChange={(e) => setNewStopNotes(e.target.value)}
                  placeholder="e.g. Try the butter garlic calamari or coconut feni cocktail..."
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-charcoal-900 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStopModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-charcoal-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-forest-700 text-white text-xs font-bold hover:bg-forest-800"
                >
                  Add Stop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Assistant Modal (Transparent Rule & Destination Guidance) */}
      {showAiAssistantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ochre-600" />
                <h3 className="text-base font-bold text-charcoal-900">
                  RoamCraft Itinerary Assistant
                </h3>
              </div>
              <button
                onClick={() => setShowAiAssistantModal(false)}
                className="text-stone-400 hover:text-stone-700 text-xs"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-charcoal-600 leading-relaxed">
              Based on verified destination insights for <strong>{activeTrip.destinationName}</strong>, here are recommended additions to balance your schedule for Day {currentDay.dayNumber}:
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-charcoal-900 block">Sunset River Kayak & Mangrove Trail</strong>
                  <span className="text-stone-500 text-[11px]">Duration: 90 mins • Est. ₹600 • Scenic & Low Crowds</span>
                </div>
                <button
                  onClick={() => handleApplyAiSuggestion("Sunset River Kayak", "activity", 600, "Relaxing mangrove paddle as the sun sets.")}
                  className="px-2.5 py-1.5 rounded-xl bg-forest-700 text-white text-[11px] font-bold hover:bg-forest-800"
                >
                  + Add to Day
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-ochre-50 border border-ochre-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-charcoal-900 block">Heritage Latin Quarter Bakery Tea Stop</strong>
                  <span className="text-stone-500 text-[11px]">Duration: 45 mins • Est. ₹300 • Historic Poi & Chai</span>
                </div>
                <button
                  onClick={() => handleApplyAiSuggestion("Historic Bakery Tea Break", "food", 300, "Fresh Goan Poi and warm ginger tea.")}
                  className="px-2.5 py-1.5 rounded-xl bg-ochre-600 text-white text-[11px] font-bold hover:bg-ochre-700"
                >
                  + Add to Day
                </button>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>
                <strong>Integration Transparency:</strong> Assistant suggestions are generated from curated regional POI databases. Live ticket and hotel bookings are completed on partner sites.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TripPlannerPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-stone-500">Loading trip planner...</div>}>
      <TripPlannerContent />
    </Suspense>
  );
}
