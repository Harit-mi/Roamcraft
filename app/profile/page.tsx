"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/app-context";
import { ShareModal } from "@/components/shared/ShareModal";
import { handleImageError } from "@/lib/utils/image-fallback";
import { 
  UserIcon as User, 
  BookmarkIcon as Bookmark, 
  SuitcaseIcon as Luggage, 
  ShareIcon as Share2, 
  CheckIcon as Check, 
  ArrowRightIcon as ArrowRight,
  CompassIcon as Compass,
  LocationPinIcon as MapPin,
  CalendarIcon as Calendar,
  SparklesIcon as Settings,
  InfoIcon as Bell
} from "@/components/shared/icons";

export default function ProfilePage() {
  const { profile, updateProfile, savedItineraryIds, savedVideoIds, personalTrips, role } = useApp();
  const [activeTab, setActiveTab] = useState<"overview" | "settings" | "notifications">("overview");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  // Form states
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [homeCity, setHomeCity] = useState(profile.homeCity);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      homeCity,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const upcomingTrips = personalTrips.filter((t) => t.status === "planning" || t.status === "booked");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Traveler Passport Header */}
      <div className="bg-[#FAF7F2] rounded-2xl p-7 sm:p-9 border border-[#E7DFD5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            onError={handleImageError}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-[#E7DFD5] shadow-sm bg-[#181614]"
          />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono uppercase text-[10px] tracking-widest text-[#8C827A]">
                TRAVELER PASSPORT
              </span>
              <span className="text-[#8C827A]">•</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F8F5F0] text-[#263D33] border border-[#E7DFD5] font-semibold">
                {role} Account
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#181614] tracking-tight">
              {profile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C554E] font-mono">
              <span>{profile.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#181614]">
                <MapPin className="w-3 h-3 text-[#C2542D]" />
                {profile.homeCity}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setShareOpen(true)}
            className="btn-editorial-icon"
            title="Share Public Profile"
            aria-label="Share Public Profile"
          >
            <Share2 className="w-4 h-4 text-[#5C554E]" />
          </button>

          <Link
            href="/my-trips"
            className="btn-editorial-primary text-xs"
          >
            <Luggage className="w-3.5 h-3.5 text-[#D9822B]" />
            <span>My Trips ({personalTrips.length})</span>
          </Link>
        </div>
      </div>

      {/* Editorial Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E7DFD5] pb-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <User className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>Dossier & Active Schedules</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "settings"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <Settings className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>Traveler Credentials</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "notifications"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <Bell className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>Dispatches & Alerts</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/my-trips"
              className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] shadow-xs hover:border-[#C2542D]/40 transition-all block space-y-1.5"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C827A] block">
                UPCOMING EXPEDITIONS
              </span>
              <span className="font-serif text-3xl font-normal text-[#181614] block">
                {upcomingTrips.length}
              </span>
              <span className="text-xs text-[#C2542D] font-medium flex items-center gap-1">
                <span>View trip timelines</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              href="/saved"
              className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] shadow-xs hover:border-[#C2542D]/40 transition-all block space-y-1.5"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C827A] block">
                SAVED ITINERARIES
              </span>
              <span className="font-serif text-3xl font-normal text-[#181614] block">
                {savedItineraryIds.length}
              </span>
              <span className="text-xs text-[#C2542D] font-medium flex items-center gap-1">
                <span>Open saved collection</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              href="/saved"
              className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] shadow-xs hover:border-[#C2542D]/40 transition-all block space-y-1.5"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C827A] block">
                SAVED TRAVEL REELS
              </span>
              <span className="font-serif text-3xl font-normal text-[#181614] block">
                {savedVideoIds.length}
              </span>
              <span className="text-xs text-[#C2542D] font-medium flex items-center gap-1">
                <span>Watch saved reels</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>

          {/* Active Trips Card */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-7 border border-[#E7DFD5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7DFD5] pb-4">
              <div>
                <h3 className="font-serif text-xl font-normal text-[#181614]">
                  Upcoming Planned Itineraries
                </h3>
                <span className="text-xs text-[#5C554E]">Your personalized active expedition schedules</span>
              </div>
              <Link
                href="/my-trips"
                className="text-xs font-semibold text-[#C2542D] hover:underline"
              >
                All Trips →
              </Link>
            </div>

            <div className="divide-y divide-[#E7DFD5]">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#F8F5F0] text-[#263D33] border border-[#E7DFD5] font-semibold">
                        {trip.status}
                      </span>
                      <span className="text-xs font-semibold text-[#C2542D] font-mono">{trip.destinationName}</span>
                    </div>
                    <h4 className="font-serif text-base text-[#181614] font-medium">{trip.title}</h4>
                    <span className="text-xs text-[#8C827A] font-sans">
                      {trip.days.length} Days • {trip.partySize} Travelers • Total Est. ₹{(trip.budgetPerPersonInr * trip.partySize).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link
                    href={`/itineraries`}
                    className="px-4 py-2 rounded-lg bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-medium self-start sm:self-auto transition-colors"
                  >
                    Open Schedule
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROFILE SETTINGS */}
      {activeTab === "settings" && (
        <div className="bg-[#FAF7F2] rounded-2xl p-7 sm:p-9 border border-[#E7DFD5] shadow-xs space-y-6 max-w-xl">
          <div className="border-b border-[#E7DFD5] pb-4 space-y-1">
            <h3 className="font-serif text-xl font-normal text-[#181614]">
              Traveler Credentials & Profile
            </h3>
            <p className="text-xs text-[#5C554E]">Update your traveler profile details and origin departure city.</p>
          </div>

          {savedSuccess && (
            <div className="p-3.5 bg-[#263D33]/10 border border-[#263D33]/20 text-[#263D33] rounded-xl text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-[#263D33]" />
              <span>Profile settings successfully updated!</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#181614] block mb-1">Full Legal / Passport Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614] focus:outline-none focus:border-[#C2542D]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#181614] block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614] focus:outline-none focus:border-[#C2542D]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#181614] block mb-1">Home / Origin Departure City</label>
              <input
                type="text"
                value={homeCity}
                onChange={(e) => setHomeCity(e.target.value)}
                placeholder="e.g. Mumbai, Bangalore, Delhi"
                className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614] focus:outline-none focus:border-[#C2542D]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-editorial-primary"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: NOTIFICATION PREFERENCES */}
      {activeTab === "notifications" && (
        <div className="bg-[#FAF7F2] rounded-2xl p-7 sm:p-9 border border-[#E7DFD5] shadow-xs space-y-6 max-w-xl">
          <div className="border-b border-[#E7DFD5] pb-4 space-y-1">
            <h3 className="font-serif text-xl font-normal text-[#181614]">
              Field Notifications & Dispatches
            </h3>
            <p className="text-xs text-[#5C554E]">Configure what updates you receive regarding road conditions, seasonal weather, and creators.</p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#F8F5F0] border border-[#E7DFD5] cursor-pointer hover:border-[#C2542D]/40 transition-colors">
              <div>
                <strong className="text-xs font-semibold text-[#181614] block">Trip Timing & Weather Updates</strong>
                <span className="text-[11px] text-[#5C554E]">Alerts when ground timings or seasonal recommendations change.</span>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.tripUpdates}
                onChange={(e) => updateProfile({
                  notifications: { ...profile.notifications, tripUpdates: e.target.checked }
                })}
                className="mt-1 accent-[#C2542D]"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#F8F5F0] border border-[#E7DFD5] cursor-pointer hover:border-[#C2542D]/40 transition-colors">
              <div>
                <strong className="text-xs font-semibold text-[#181614] block">Creator New Itinerary Alerts</strong>
                <span className="text-[11px] text-[#5C554E]">Notify when creators you follow publish new routes.</span>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.creatorAlerts}
                onChange={(e) => updateProfile({
                  notifications: { ...profile.notifications, creatorAlerts: e.target.checked }
                })}
                className="mt-1 accent-[#C2542D]"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#F8F5F0] border border-[#E7DFD5] cursor-pointer hover:border-[#C2542D]/40 transition-colors">
              <div>
                <strong className="text-xs font-semibold text-[#181614] block">Weekly Digest Email</strong>
                <span className="text-[11px] text-[#5C554E]">Curated weekend roadtrip and seasonal expedition ideas.</span>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.emailDigest}
                onChange={(e) => updateProfile({
                  notifications: { ...profile.notifications, emailDigest: e.target.checked }
                })}
                className="mt-1 accent-[#C2542D]"
              />
            </label>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={`${profile.name}'s RoamCraft Travel Profile`}
      />
    </div>
  );
}
