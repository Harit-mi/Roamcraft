"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/app-context";
import { VideoClip } from "@/lib/types";
import { handleImageError } from "@/lib/utils/image-fallback";
import { 
  PlusIcon as Plus, 
  CameraIcon as Upload, 
  PlayCircleIcon as Video, 
  BookOpenIcon as BookOpen, 
  EyeIcon as Eye, 
  BookmarkIcon as Bookmark, 
  ExternalLinkIcon as ExternalLink, 
  RupeeIcon as IndianRupee, 
  CopyIcon as Edit, 
  CopyIcon as Copy, 
  TrashIcon as Trash2, 
  LocationPinIcon as MapPin, 
  CheckIcon as CheckCircle2,
  SparklesIcon as TrendingUp,
  BookOpenIcon as FileText,
  CompassIcon as Compass,
  ArrowRightIcon as ArrowRight
} from "@/components/shared/icons";

export default function StudioPage() {
  const { 
    itineraries, 
    videos, 
    addVideo, 
    deleteItinerary, 
    duplicateItinerary, 
    updateItinerary, 
    affiliateClicks 
  } = useApp();

  const [activeTab, setActiveTab] = useState<"itineraries" | "videos" | "upload" | "analytics">("itineraries");

  // Video Upload Form State
  const [videoTitle, setVideoTitle] = useState("");
  const [videoCaption, setVideoCaption] = useState("");
  const [videoDestination, setVideoDestination] = useState("South Goa");
  const [videoItinerarySlug, setVideoItinerarySlug] = useState(itineraries[0]?.slug || "");
  const [videoPosterUrl, setVideoPosterUrl] = useState("https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80");
  const [videoDurationSeconds, setVideoDurationSeconds] = useState("25");
  const [videoTags, setVideoTags] = useState("#Travel #India #HiddenGems");
  const [videoUploadedSuccess, setVideoUploadedSuccess] = useState(false);

  const totalViews = itineraries.reduce((acc, i) => acc + i.viewsCount, 0);
  const totalSaves = itineraries.reduce((acc, i) => acc + i.savesCount, 0);
  const totalAffiliateClicks = affiliateClicks.length;
  const totalEstimatedCommissions = affiliateClicks.reduce((acc, c) => acc + c.estimatedCommissionInr, 0);

  const handleUploadVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    const newVideoClip: VideoClip = {
      id: `video-${Date.now()}`,
      creatorId: "creator-3",
      creator: itineraries[0]?.creator || {
        id: "creator-3",
        userId: "user-c3",
        name: "Rohan & Priya",
        handle: "@twotravelertales",
        bio: "Travelers testing cliffside villas and scenic coastal spots.",
        avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
        coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
        verified: true,
        location: "Bangalore, India",
        followersCount: 310000,
        totalTripsPublished: 26,
        specialties: ["Romantic Getaways", "Coastal Cafes"],
        socials: {}
      },
      destinationId: "dest-goa-south",
      destinationName: videoDestination,
      itinerarySlug: videoItinerarySlug,
      title: videoTitle.trim(),
      caption: videoCaption.trim(),
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      posterUrl: videoPosterUrl,
      likesCount: 1,
      savesCount: 0,
      durationSeconds: parseInt(videoDurationSeconds) || 25,
      tags: videoTags.split(" ").filter(t => t.startsWith("#")),
    };

    addVideo(newVideoClip);
    setVideoUploadedSuccess(true);
    setTimeout(() => {
      setVideoUploadedSuccess(false);
      setActiveTab("videos");
      setVideoTitle("");
      setVideoCaption("");
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Studio Header Banner */}
      <div className="bg-[#181614] text-[#FAF7F2] rounded-2xl p-7 sm:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-[#231F1C]">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 text-[11px] font-mono uppercase tracking-widest text-[#E7DFD5]">
            <Compass className="w-3.5 h-3.5 text-[#C2542D]" />
            <span>CREATOR EXPEDITION BUREAU & EDITORIAL DESK</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
            Publishing Workspace
          </h1>
          <p className="text-xs sm:text-sm text-[#E7DFD5]/80 max-w-xl leading-relaxed">
            Transmit field recordings, bind visual reels directly to day-by-day itineraries, manage drafts, and inspect certified booking referral commissions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
          <Link
            href="/itineraries/create"
            className="btn-editorial-terracotta"
          >
            <Plus className="w-4 h-4" />
            <span>New Expedition Blueprint</span>
          </Link>
          <button
            onClick={() => setActiveTab("upload")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 font-medium text-xs transition-all active:scale-[0.98]"
          >
            <Upload className="w-4 h-4" />
            <span>Transmit Reel</span>
          </button>
        </div>
      </div>

      {/* Circulation Ledger Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7DFD5] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#8C827A] text-[10px] font-mono uppercase tracking-wider">
            <span>ITINERARY CIRCULATION</span>
            <Eye className="w-3.5 h-3.5 text-[#C2542D]" />
          </div>
          <span className="font-serif text-3xl font-normal text-[#181614] block">
            {totalViews.toLocaleString()}
          </span>
          <span className="text-[10px] text-[#263D33] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#263D33]" /> Verified reader views
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7DFD5] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#8C827A] text-[10px] font-mono uppercase tracking-wider">
            <span>SAVED ARCHIVES</span>
            <Bookmark className="w-3.5 h-3.5 text-[#C2542D]" />
          </div>
          <span className="font-serif text-3xl font-normal text-[#181614] block">
            {totalSaves.toLocaleString()}
          </span>
          <span className="text-[10px] text-[#8C827A]">High-intent travelers</span>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7DFD5] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#8C827A] text-[10px] font-mono uppercase tracking-wider">
            <span>PARTNER CLICKS</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C2542D]" />
          </div>
          <span className="font-serif text-3xl font-normal text-[#181614] block">
            {totalAffiliateClicks}
          </span>
          <span className="text-[10px] text-[#8C827A]">Outbound hotel inquiries</span>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#C2542D]/40 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#C2542D] text-[10px] font-mono uppercase tracking-wider">
            <span>EST. COMMISSIONS</span>
            <IndianRupee className="w-3.5 h-3.5 text-[#C2542D]" />
          </div>
          <span className="font-serif text-3xl font-normal text-[#181614] block">
            ₹{totalEstimatedCommissions.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-[#C2542D]">6% Partner referral tier</span>
        </div>
      </div>

      {/* Studio Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E7DFD5] pb-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        <button
          onClick={() => setActiveTab("itineraries")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "itineraries"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>Active Blueprints ({itineraries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("videos")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "videos"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <Video className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>Field Reels ({videos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "upload"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <Upload className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>+ Upload Video</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
            activeTab === "analytics"
              ? "bg-[#181614] text-[#FAF7F2] shadow-xs"
              : "text-[#5C554E] hover:text-[#181614] hover:bg-[#FAF7F2]"
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#C2542D]" />
          <span>Partner Referral Ledger</span>
        </button>
      </div>

      {/* TAB 1: ITINERARIES MANAGEMENT */}
      {activeTab === "itineraries" && (
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] overflow-hidden shadow-xs space-y-4">
          <div className="p-5 border-b border-[#E7DFD5] flex items-center justify-between">
            <h3 className="font-serif text-lg font-normal text-[#181614]">
              Published & Draft Expedition Routes
            </h3>
            <Link
              href="/itineraries/create"
              className="px-4 py-2 rounded-full bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-medium transition-colors"
            >
              + Create Blueprint
            </Link>
          </div>

          <div className="divide-y divide-[#E7DFD5]">
            {itineraries.map((itin) => (
              <div
                key={itin.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F5F0] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={itin.coverImage}
                    alt={itin.title}
                    onError={handleImageError}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E7DFD5]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                        itin.status === "published"
                          ? "bg-[#263D33]/10 text-[#263D33] border border-[#263D33]/20"
                          : "bg-amber-100 text-amber-900 border border-amber-200"
                      }`}>
                        {itin.status}
                      </span>
                      <span className="text-xs text-[#5C554E] font-mono">
                        {itin.destinationName} • {itin.durationDays} Days • ₹{itin.budgetPerPersonInr.toLocaleString("en-IN")}/pax
                      </span>
                    </div>

                    <h4 className="font-serif text-base text-[#181614] mt-1 line-clamp-1 font-medium">
                      {itin.title}
                    </h4>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[#8C827A] font-sans">
                      <span>{itin.viewsCount} views</span>
                      <span>•</span>
                      <span>{itin.savesCount} saves</span>
                      <span>•</span>
                      <span>{itin.days.length} Days Planned</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Link
                    href={`/itineraries/${itin.slug}`}
                    className="btn-editorial-secondary text-[11px] py-1 px-3"
                  >
                    View
                  </Link>

                  <Link
                    href={`/itineraries/${itin.id}/edit`}
                    className="btn-editorial-icon w-8 h-8 text-[#5C554E]"
                    title="Edit Itinerary"
                    aria-label="Edit Itinerary"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => duplicateItinerary(itin.id)}
                    className="btn-editorial-icon w-8 h-8 text-[#5C554E]"
                    title="Duplicate Itinerary"
                    aria-label="Duplicate Itinerary"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      const newStatus = itin.status === "published" ? "draft" : "published";
                      updateItinerary(itin.id, { status: newStatus });
                    }}
                    className="btn-editorial-secondary text-[10px] py-1 px-2.5 font-mono uppercase"
                  >
                    {itin.status === "published" ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => deleteItinerary(itin.id)}
                    className="btn-editorial-icon w-8 h-8 hover:border-rose-400 hover:text-rose-600 text-[#8C827A]"
                    title="Delete Itinerary"
                    aria-label="Delete Itinerary"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VIDEOS LIST */}
      {activeTab === "videos" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7DFD5]">
            <h3 className="font-serif text-lg font-normal text-[#181614]">
              Field Visual Reels Archive
            </h3>
            <button
              onClick={() => setActiveTab("upload")}
              className="px-4 py-1.5 rounded-full bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] text-xs font-medium"
            >
              + Transmit New Reel
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {videos.map((vid) => (
              <div key={vid.id} className="relative rounded-xl overflow-hidden bg-[#181614] aspect-[9/16] group shadow-sm flex flex-col justify-between p-3.5 text-white border border-[#231F1C]">
                <img
                  src={vid.posterUrl}
                  alt={vid.title}
                  onError={handleImageError}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-transparent" />

                <div className="relative z-10 flex justify-between items-center text-[10px] font-mono">
                  <span className="bg-black/60 px-2 py-0.5 rounded">{vid.durationSeconds}s</span>
                  <span className="bg-[#C2542D] px-2 py-0.5 rounded font-semibold">{vid.destinationName}</span>
                </div>

                <div className="relative z-10 space-y-1.5">
                  <h4 className="font-serif text-sm font-medium line-clamp-2 leading-snug">{vid.title}</h4>
                  <Link
                    href={`/videos/${vid.id}`}
                    className="text-[11px] font-mono text-[#E7DFD5] hover:text-[#C2542D] block pt-0.5"
                  >
                    Open Player →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TRANSMIT MEDIA (UPLOAD) */}
      {activeTab === "upload" && (
        <div className="bg-[#FAF7F2] rounded-2xl p-7 sm:p-9 border border-[#E7DFD5] shadow-xs space-y-6 max-w-2xl mx-auto">
          <div className="border-b border-[#E7DFD5] pb-4 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C827A] block">
              MEDIA TRANSMISSION DESK
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#181614]">
              Transmit Visual Reel & Bind Itinerary
            </h3>
            <p className="text-xs text-[#5C554E] leading-relaxed">
              Upload field footage with location coordinates, creator notes, and a linked day-by-day expedition schedule.
            </p>
          </div>

          {videoUploadedSuccess && (
            <div className="p-4 bg-[#263D33]/10 border border-[#263D33]/20 text-[#263D33] rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#263D33]" />
              <span>Travel reel published and indexed to your itinerary!</span>
            </div>
          )}

          <form onSubmit={handleUploadVideoSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#181614] block mb-1">
                Video Title *
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g. Secret Hidden Lagoon in South Goa..."
                className="w-full p-3 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs font-sans text-[#181614] focus:outline-none focus:border-[#C2542D]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#181614] block mb-1">
                Field Caption & Traveler Recommendations
              </label>
              <textarea
                rows={3}
                value={videoCaption}
                onChange={(e) => setVideoCaption(e.target.value)}
                placeholder="Describe what travelers are seeing, best morning hour to visit, and directions..."
                className="w-full p-3 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614] focus:outline-none focus:border-[#C2542D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#181614] block mb-1">
                  Tag Location / Destination *
                </label>
                <input
                  type="text"
                  value={videoDestination}
                  onChange={(e) => setVideoDestination(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181614] block mb-1">
                  Connect to Itinerary *
                </label>
                <select
                  value={videoItinerarySlug}
                  onChange={(e) => setVideoItinerarySlug(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614]"
                >
                  {itineraries.map((itin) => (
                    <option key={itin.id} value={itin.slug}>
                      {itin.title} ({itin.destinationName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#181614] block mb-1">
                  Poster Thumbnail URL
                </label>
                <input
                  type="url"
                  value={videoPosterUrl}
                  onChange={(e) => setVideoPosterUrl(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181614] block mb-1">
                  Hashtags
                </label>
                <input
                  type="text"
                  value={videoTags}
                  onChange={(e) => setVideoTags(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#F8F5F0] border border-[#E7DFD5] text-xs text-[#181614]"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#181614] hover:bg-[#263D33] text-[#FAF7F2] font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4 text-[#C2542D]" />
                <span>Publish Field Reel Transmission</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: HOTEL REFERRALS */}
      {activeTab === "analytics" && (
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] p-7 shadow-xs space-y-4">
          <div className="border-b border-[#E7DFD5] pb-4 space-y-1">
            <h3 className="font-serif text-xl font-normal text-[#181614]">
              Hotel Affiliate Referral Ledger
            </h3>
            <p className="text-xs text-[#5C554E] leading-relaxed">
              Verified partner bookings and clickthroughs recorded from your published routes and accommodation cards.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E7DFD5] text-[#8C827A] font-mono uppercase text-[10px] tracking-wider">
                  <th className="py-2.5">Hotel / Stay</th>
                  <th className="py-2.5">Booking Partner</th>
                  <th className="py-2.5">Recorded At</th>
                  <th className="py-2.5">Rate / Night</th>
                  <th className="py-2.5">Est. Referral Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DFD5]">
                {affiliateClicks.map((click) => (
                  <tr key={click.id} className="hover:bg-[#F8F5F0]">
                    <td className="py-3 font-serif font-medium text-[#181614]">{click.hotelName}</td>
                    <td className="py-3 text-[#5C554E]">{click.partnerName}</td>
                    <td className="py-3 text-[#8C827A] font-mono text-[11px]">{click.timestamp}</td>
                    <td className="py-3 font-medium text-[#181614]">₹{click.pricePerNightInr.toLocaleString("en-IN")}</td>
                    <td className="py-3 font-semibold text-[#C2542D]">₹{click.estimatedCommissionInr}</td>
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
