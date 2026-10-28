"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/context/app-context";
import { 
  ShieldCheckIcon as ShieldCheck, 
  UsersIcon as Users, 
  AlertCircleIcon as AlertTriangle, 
  LocationPinIcon as Building2, 
  CheckIcon as Check, 
  XIcon as X, 
  ExternalLinkIcon as ExternalLink, 
  SparklesIcon as Sparkles, 
  RupeeIcon as IndianRupee, 
  SparklesIcon as TrendingUp, 
  ClockIcon as Clock,
  ShieldCheckIcon as ShieldAlert
} from "@/components/shared/icons";

export default function AdminPage() {
  const { 
    role, 
    setRole, 
    creatorApplications, 
    updateApplicationStatus, 
    contentReports, 
    resolveContentReport,
    hotels,
    updateHotelPlacement,
    itineraries,
    affiliateClicks
  } = useApp();

  const [activeTab, setActiveTab] = useState<"applications" | "reports" | "hotels">("applications");

  const pendingApps = creatorApplications.filter(a => a.status === "pending");
  const openReports = contentReports.filter(r => r.status === "open");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Role Notice / Admin Banner */}
      {role !== "admin" && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              You are currently viewing this page as a <strong>{role}</strong>. In production, this route is protected by server-side middleware.
            </span>
          </div>
          <button
            onClick={() => setRole("admin")}
            className="px-3 py-1.5 rounded-xl bg-forest-700 text-white font-bold hover:bg-forest-800 transition-colors"
          >
            Switch to Admin Role
          </button>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Platform Control & Safety
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
            Administrator Moderation Desk
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Review creator applications, manage hotel placement disclosures, and resolve traveler reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-forest-50 text-forest-800 font-semibold px-3 py-1.5 rounded-xl border border-forest-100">
            {pendingApps.length} Pending Creator Approvals
          </span>
          <span className="text-xs bg-rose-50 text-rose-700 font-semibold px-3 py-1.5 rounded-xl border border-rose-100">
            {openReports.length} Open Reports
          </span>
        </div>
      </div>

      {/* Platform Metric Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
            Published Itineraries
          </span>
          <span className="text-2xl font-extrabold text-charcoal-900 block">
            {itineraries.length}
          </span>
          <span className="text-[10px] text-stone-400">Curated routes</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
            Partner Hotel Listings
          </span>
          <span className="text-2xl font-extrabold text-charcoal-900 block">
            {hotels.length}
          </span>
          <span className="text-[10px] text-stone-400">Vetted accommodations</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
            Logged Outbound Clicks
          </span>
          <span className="text-2xl font-extrabold text-charcoal-900 block">
            {affiliateClicks.length}
          </span>
          <span className="text-[10px] text-stone-400">Attributed referrals</span>
        </div>

        <div className="bg-forest-50 p-5 rounded-3xl border border-forest-100 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800 block">
            Total Est. Commission
          </span>
          <span className="text-2xl font-extrabold text-forest-900 block">
            ₹{affiliateClicks.reduce((acc, c) => acc + c.estimatedCommissionInr, 0).toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-forest-700/80">6% partner rate model</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "applications"
              ? "bg-forest-700 text-white shadow-xs"
              : "text-charcoal-700 hover:bg-stone-100"
          }`}
        >
          Creator Applications ({creatorApplications.length})
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "reports"
              ? "bg-forest-700 text-white shadow-xs"
              : "text-charcoal-700 hover:bg-stone-100"
          }`}
        >
          Content Reports ({contentReports.length})
        </button>
        <button
          onClick={() => setActiveTab("hotels")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "hotels"
              ? "bg-forest-700 text-white shadow-xs"
              : "text-charcoal-700 hover:bg-stone-100"
          }`}
        >
          Hotel Placements & Monetization ({hotels.length})
        </button>
      </div>

      {/* TAB 1: CREATOR APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm animate-in fade-in">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-bold text-base text-charcoal-900">
              Creator Verification Requests
            </h3>
            <span className="text-xs text-stone-500">
              Manual moderation review pipeline
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {creatorApplications.map((app) => (
              <div key={app.id} className="p-5 space-y-3 hover:bg-stone-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-charcoal-900">{app.applicantName}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        app.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : app.status === "rejected"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <span className="text-xs text-stone-500">
                      {app.email} • Niche: <strong>{app.contentNiche}</strong> • Submitted {app.submittedAt}
                    </span>
                  </div>

                  {app.status === "pending" && (
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => updateApplicationStatus(app.id, "approved")}
                        className="px-3 py-1.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Verify</span>
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, "rejected")}
                        className="px-3 py-1.5 rounded-xl border border-stone-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-xs text-charcoal-700 bg-canvas-subtle p-3 rounded-2xl border border-stone-100 leading-relaxed">
                  <strong>Pitch:</strong> {app.pitch}
                </p>

                <div className="flex items-center gap-4 text-xs">
                  <a
                    href={app.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Social Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={app.sampleWorkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Sample Reel / Work</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CONTENT REPORTS */}
      {activeTab === "reports" && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm animate-in fade-in">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-bold text-base text-charcoal-900">
              Community Content & Correction Reports
            </h3>
            <span className="text-xs text-stone-500">
              Ensuring pricing and timing accuracy
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {contentReports.map((report) => (
              <div key={report.id} className="p-5 space-y-3 hover:bg-stone-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-charcoal-900">{report.itemTitle}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        report.status === "resolved"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <span className="text-xs text-stone-500">
                      Reason: <strong>{report.reason}</strong> • Reported by {report.reporterEmail} • {report.timestamp}
                    </span>
                  </div>

                  {report.status === "open" && (
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => resolveContentReport(report.id, "resolved")}
                        className="px-3 py-1.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold transition-colors"
                      >
                        Mark Verified & Resolved
                      </button>
                      <button
                        onClick={() => resolveContentReport(report.id, "dismissed")}
                        className="px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs text-charcoal-700">
                  {report.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HOTEL PLACEMENTS & PARTNER DISCLOSURES */}
      {activeTab === "hotels" && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm space-y-4 p-6 animate-in fade-in">
          <div>
            <h3 className="font-bold text-base text-charcoal-900">
              Manage Hotel Recommendations & Commercial Placements
            </h3>
            <p className="text-xs text-charcoal-500">
              Configure disclosure tags (Organic vs Sponsored vs Affiliate) to comply with ASCI/FTC rules.
            </p>
          </div>

          <div className="divide-y divide-stone-100">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-14 h-14 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-charcoal-900">{hotel.name}</h4>
                    <span className="text-xs text-stone-500 block">
                      {hotel.nearAttraction} • ₹{hotel.pricePerNightInr.toLocaleString("en-IN")}/night
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      Partner: {hotel.partnerName} ({hotel.partnerAttributionId})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">Placement:</span>
                  <select
                    value={hotel.placementType}
                    onChange={(e) => updateHotelPlacement(hotel.id, e.target.value as any)}
                    className="p-1.5 rounded-xl border border-stone-300 text-xs font-semibold text-charcoal-900 bg-stone-50"
                  >
                    <option value="organic">Organic Creator Pick</option>
                    <option value="sponsored">Sponsored Placement</option>
                    <option value="affiliate">Affiliate Partner</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
