"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/app-context";
import { MOCK_DESTINATIONS, MOCK_CREATORS } from "@/lib/data/mock-db";
import { Itinerary, TravelStyle } from "@/lib/types";
import { 
  SparklesIcon as Sparkles, 
  BookOpenIcon as FileText, 
  PlusIcon as Plus, 
  EyeIcon as Eye, 
  BookmarkIcon as Bookmark, 
  ExternalLinkIcon as ExternalLink, 
  RupeeIcon as IndianRupee, 
  CheckIcon as CheckCircle2, 
  ClockIcon as Clock, 
  AlertCircleIcon as AlertCircle, 
  CalendarIcon as Calendar,
  SparklesIcon as TrendingUp 
} from "@/components/shared/icons";

export default function CreatorStudioPage() {
  const { itineraries, publishItinerary, affiliateClicks, role } = useApp();

  const [activeTab, setActiveTab] = useState<"dashboard" | "itineraries" | "publish" | "analytics">("dashboard");

  // Publishing Form State
  const [newTitle, setNewTitle] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newDestination, setNewDestination] = useState("South Goa");
  const [newDurationDays, setNewDurationDays] = useState("4");
  const [newBudgetInr, setNewBudgetInr] = useState("18000");
  const [newTravelerType, setNewTravelerType] = useState<any>("Couples");
  const [newCoverImage, setNewCoverImage] = useState("https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80");
  const [newIntroNotes, setNewIntroNotes] = useState("");
  const [isSponsored, setIsSponsored] = useState(false);
  const [publishStatus, setPublishStatus] = useState<"published" | "draft">("published");
  const [successMessage, setSuccessMessage] = useState("");

  // Aggregate metrics
  const totalViews = itineraries.reduce((acc, i) => acc + i.viewsCount, 0);
  const totalSaves = itineraries.reduce((acc, i) => acc + i.savesCount, 0);
  const totalClicks = affiliateClicks.length;
  const totalEstimatedEarningsInr = affiliateClicks.reduce((acc, c) => acc + c.estimatedCommissionInr, 0);

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItin: Itinerary = {
      id: `itin-custom-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title: newTitle.trim(),
      tagline: newTagline.trim() || "Handcrafted local creator guide.",
      creatorId: "creator-3",
      creator: MOCK_CREATORS[2], // Currently active demo creator
      destinationId: "dest-goa-south",
      destinationName: newDestination,
      isInternational: false,
      coverImage: newCoverImage,
      durationDays: parseInt(newDurationDays) || 4,
      budgetPerPersonInr: parseInt(newBudgetInr) || 18000,
      travelStyle: ["relaxation", "romantic"],
      travelerType: newTravelerType,
      recommendedSeason: "October to March",
      publishedDate: new Date().toISOString().split("T")[0],
      status: publishStatus,
      savesCount: 0,
      viewsCount: 1,
      introNotes: newIntroNotes || "Welcome to my verified travel itinerary! Tested and refined on foot.",
      packingAndPracticalTips: [
        "Carry light breathable cottons.",
        "Cash is helpful for smaller beach shacks.",
        "Pre-book scooter rentals near railway stations."
      ],
      days: [
        {
          dayNumber: 1,
          title: "Arrival & Coastal Heritage",
          theme: "Orientation & Sunset",
          daySummary: "Settle into your boutique stay and explore surrounding village paths.",
          dailyEstimatedCostInr: 3200,
          stops: [
            {
              id: `stop-new-1`,
              order: 1,
              category: "attraction",
              title: "Old Quarter Heritage Walk",
              durationMins: 90,
              estimatedCostInr: 0,
              recommendedTimeOfDay: "Afternoon",
              description: "Explore the colorful local architecture and artisan shops.",
              foodTips: "Traditional coconut poi and local filter coffee."
            }
          ]
        }
      ],
      hotels: []
    };

    publishItinerary(newItin);
    setSuccessMessage(`Itinerary "${newTitle}" has been successfully ${publishStatus === "published" ? "published live" : "saved as draft"}!`);
    setActiveTab("itineraries");
    setNewTitle("");
    setNewTagline("");
    setNewIntroNotes("");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Studio Banner */}
      <div className="bg-charcoal-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ochre-500/20 text-ochre-300 text-xs font-semibold border border-ochre-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Creator Studio & Publisher
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, Rohan & Priya
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Publish rich day-by-day itineraries, track your readership, and view affiliate hotel referral performance in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("publish")}
            className="px-4 py-2.5 rounded-2xl bg-ochre-500 hover:bg-ochre-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Itinerary</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "dashboard"
              ? "bg-forest-700 text-white shadow-xs"
              : "text-charcoal-700 hover:bg-stone-100"
          }`}
        >
          Overview & Metrics
        </button>
        <button
          onClick={() => setActiveTab("itineraries")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "itineraries"
              ? "bg-forest-700 text-white shadow-xs"
              : "text-charcoal-700 hover:bg-stone-100"
          }`}
        >
          My Itineraries ({itineraries.length})
        </button>
        <button
          onClick={() => setActiveTab("publish")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "publish"
              ? "bg-forest-700 text-white shadow-xs"
              : "text-charcoal-700 hover:bg-stone-100"
          }`}
        >
          + Publish Itinerary
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "analytics"
              ? "bg-forest-700 text-white shadow-xs"
              : "text-charcoal-700 hover:bg-stone-100"
          }`}
        >
          Hotel Referrals Log ({affiliateClicks.length})
        </button>
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-in fade-in">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                  Total Views
                </span>
                <Eye className="w-4 h-4 text-forest-700" />
              </div>
              <span className="text-2xl font-extrabold text-charcoal-900 block">
                {totalViews.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +14.2% this month
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                  Trip Saves
                </span>
                <Bookmark className="w-4 h-4 text-ochre-500" />
              </div>
              <span className="text-2xl font-extrabold text-charcoal-900 block">
                {totalSaves.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-500">High intent travelers</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                  Hotel Outbound Clicks
                </span>
                <ExternalLink className="w-4 h-4 text-forest-700" />
              </div>
              <span className="text-2xl font-extrabold text-charcoal-900 block">
                {totalClicks}
              </span>
              <span className="text-[10px] text-stone-500">Partner referrals</span>
            </div>

            <div className="bg-forest-50 p-5 rounded-3xl border border-forest-100 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-forest-700">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800">
                  Est. Referral Earnings
                </span>
                <IndianRupee className="w-4 h-4" />
              </div>
              <span className="text-2xl font-extrabold text-forest-900 block">
                ₹{totalEstimatedEarningsInr.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-forest-700/80">Pending partner audit</span>
            </div>
          </div>

          {/* Quick Publishing Guidance */}
          <div className="bg-canvas-subtle p-6 rounded-3xl border border-stone-200 space-y-3">
            <h3 className="font-bold text-sm text-charcoal-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-forest-700" />
              Creator Editorial Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-600">
              <div className="p-3 bg-white rounded-2xl border border-stone-200/80">
                <strong className="text-charcoal-900 block mb-1">1. Realistic Pacing</strong>
                Do not pack more than 3 major stops in a single day. Travelers need time to absorb culture and dine.
              </div>
              <div className="p-3 bg-white rounded-2xl border border-stone-200/80">
                <strong className="text-charcoal-900 block mb-1">2. Honest Budgets</strong>
                Include realistic fuel, ferry tickets, and dining expenses in INR rather than just entrance tickets.
              </div>
              <div className="p-3 bg-white rounded-2xl border border-stone-200/80">
                <strong className="text-charcoal-900 block mb-1">3. Clear Disclosures</strong>
                Check the sponsored content disclosure if any resort or property provided hosted stays.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY ITINERARIES */}
      {activeTab === "itineraries" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-charcoal-900">Published & Drafted Itineraries</h3>
              <button
                onClick={() => setActiveTab("publish")}
                className="px-3 py-1.5 rounded-xl bg-forest-700 text-white text-xs font-semibold hover:bg-forest-800 transition-colors"
              >
                + New Itinerary
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {itineraries.map((itin) => (
                <div key={itin.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <img
                      src={itin.coverImage}
                      alt={itin.title}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          itin.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {itin.status}
                        </span>
                        <span className="text-xs text-stone-500">{itin.destinationName} • {itin.durationDays} Days</span>
                      </div>
                      <h4 className="font-bold text-sm text-charcoal-900 mt-1 line-clamp-1">{itin.title}</h4>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-500">
                        <span>{itin.viewsCount.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{itin.savesCount} saves</span>
                        <span>•</span>
                        <span>Est. ₹{itin.budgetPerPersonInr.toLocaleString("en-IN")}/person</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Link
                      href={`/itinerary/${itin.slug}`}
                      className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-charcoal-800 hover:bg-stone-100 transition-colors"
                    >
                      View Live
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PUBLISH NEW ITINERARY */}
      {activeTab === "publish" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 animate-in fade-in">
          <div>
            <h3 className="font-bold text-xl text-charcoal-900">Publish New Creator Itinerary</h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Create a structured trip guide that travelers can clone, customize, and follow.
            </p>
          </div>

          <form onSubmit={handlePublishSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">
                Itinerary Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Hidden South Goa: Secret Coves & River Kayaks"
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-forest-700"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">
                Short Tagline / Hook
              </label>
              <input
                type="text"
                value={newTagline}
                onChange={(e) => setNewTagline(e.target.value)}
                placeholder="e.g. Skip crowded beaches for unhurried fishing hamlets and Latin mansions..."
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-charcoal-900 focus:outline-none focus:border-forest-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Destination Name
                </label>
                <input
                  type="text"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Trip Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={newDurationDays}
                  onChange={(e) => setNewDurationDays(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Estimated Budget / Person (INR)
                </label>
                <input
                  type="number"
                  step="500"
                  value={newBudgetInr}
                  onChange={(e) => setNewBudgetInr(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Ideal Traveler Type
                </label>
                <select
                  value={newTravelerType}
                  onChange={(e) => setNewTravelerType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900"
                >
                  <option value="Couples">Couples</option>
                  <option value="Honeymooners">Honeymooners</option>
                  <option value="Solo Traveler">Solo Traveler</option>
                  <option value="Families">Families</option>
                  <option value="Group of Friends">Group of Friends</option>
                  <option value="Budget Explorers">Budget Explorers</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Cover Photo URL (High-res landscape)
                </label>
                <input
                  type="url"
                  value={newCoverImage}
                  onChange={(e) => setNewCoverImage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-charcoal-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">
                Creator Introduction & Ground Logistics
              </label>
              <textarea
                rows={3}
                value={newIntroNotes}
                onChange={(e) => setNewIntroNotes(e.target.value)}
                placeholder="Share your insider tips, best transit options, and things to avoid..."
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-charcoal-900 focus:outline-none"
              />
            </div>

            {/* Content Rights & Sponsored Disclosure */}
            <div className="p-4 bg-canvas-subtle rounded-2xl border border-stone-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSponsored}
                  onChange={(e) => setIsSponsored(e.target.checked)}
                  className="accent-ochre-600"
                />
                <span className="text-xs text-charcoal-800 font-medium">
                  This itinerary includes sponsored hotel stays or brand collaborations (ASCI Advertising Disclosure compliant).
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setPublishStatus("draft");
                  handlePublishSubmit({ preventDefault: () => {} } as any);
                }}
                className="flex-1 py-3 rounded-xl border border-stone-300 text-charcoal-700 text-xs font-bold hover:bg-stone-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => {
                  setPublishStatus("published");
                  handlePublishSubmit({ preventDefault: () => {} } as any);
                }}
                className="flex-1 py-3 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-bold transition-colors shadow-md"
              >
                Publish Live to RoamCraft
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: HOTEL REFERRALS LOG */}
      {activeTab === "analytics" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4 animate-in fade-in">
          <div>
            <h3 className="font-bold text-lg text-charcoal-900">Hotel Affiliate Outbound Tracking</h3>
            <p className="text-xs text-charcoal-500">
              Transparent log of external partner clicks generated through your itineraries.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-charcoal-500 font-bold uppercase text-[10px]">
                  <th className="py-2.5">Hotel Name</th>
                  <th className="py-2.5">Partner Portal</th>
                  <th className="py-2.5">Timestamp</th>
                  <th className="py-2.5">Rate / Night</th>
                  <th className="py-2.5">Est. Referral Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {affiliateClicks.map((click) => (
                  <tr key={click.id} className="hover:bg-stone-50">
                    <td className="py-3 font-semibold text-charcoal-900">{click.hotelName}</td>
                    <td className="py-3 text-stone-600">{click.partnerName}</td>
                    <td className="py-3 text-stone-400 font-mono text-[11px]">{click.timestamp}</td>
                    <td className="py-3 font-semibold text-charcoal-800">₹{click.pricePerNightInr.toLocaleString("en-IN")}</td>
                    <td className="py-3 font-bold text-forest-700">₹{click.estimatedCommissionInr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
