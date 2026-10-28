"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  MOCK_DESTINATIONS, 
  MOCK_ITINERARIES, 
  MOCK_VIDEOS, 
  MOCK_CREATORS, 
  MOCK_HOTELS 
} from "@/lib/data/mock-db";
import { ItineraryCard } from "@/components/shared/ItineraryCard";
import { HotelCard } from "@/components/shared/HotelCard";
import { 
  SearchIcon, 
  BookOpenIcon, 
  PlayCircleIcon, 
  ArrowRightIcon 
} from "@/components/shared/icons";

export default function HomePage() {
  const router = useRouter();

  // Search Hero State
  const [searchDestination, setSearchDestination] = useState("");
  const [searchDates, setSearchDates] = useState("");
  const [searchTravelers, setSearchTravelers] = useState("2");
  const [searchBudget, setSearchBudget] = useState("25000");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDestination) params.set("q", searchDestination);
    if (searchTravelers) params.set("travelers", searchTravelers);
    if (searchBudget) params.set("budget", searchBudget);
    router.push(`/discover?${params.toString()}`);
  };

  const travelPhilosophies = [
    { title: "Slow Coastal Drift", desc: "Secluded coves, heritage Portuguese quarters, and cliffside shacks", dest: "South Goa", duration: "4-6 Days", slug: "south-goa" },
    { title: "High-Altitude Passes", desc: "17,000ft Himalayan monasteries, stark granite ridges, and Pangong blue", dest: "Leh Ladakh", duration: "7-9 Days", slug: "ladakh" },
    { title: "Backwater Sanctuary", desc: "Silent canal shikaras, organic spice farms, and mist-laden tea peaks", dest: "Munnar & Alleppey", duration: "5-7 Days", slug: "kerala" },
    { title: "Desert Fortresses", desc: "Candlelit havelis,Mehrangarh ramparts, and Mewari culinary trails", dest: "Rajasthan", duration: "5-6 Days", slug: "rajasthan-heritage" },
  ];

  const leadItinerary = MOCK_ITINERARIES[0]; // South Goa slow coastal drift

  return (
    <div className="space-y-24 pb-20">
      {/* 1. EDITORIAL COVER HERO SPREAD */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border-b border-[#E7DFD5] pb-12 sm:pb-16 space-y-10">
          
          {/* Header Metadata Stamp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] sm:text-xs text-[#78716C] tracking-[0.2em] uppercase border-b border-[#E7DFD5] pb-4">
            <div className="flex items-center gap-3">
              <span className="text-[#C2542D] font-bold">DISPATCH NO. 04</span>
              <span>•</span>
              <span>INDEPENDENT TRAVEL GAZETTE</span>
            </div>
            <div>AUTUMN / WINTER EXPEDITIONS • INDIA & BEYOND</div>
          </div>

          {/* Hero Typography & Split Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left 7 Columns: Editorial Headline & Search Strip */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C2542D] font-semibold block">
                The Ground-Level Travel Revolution
              </span>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#181614] leading-[1.08]">
                Don&apos;t Just Visit. <br />
                <span className="italic font-normal text-[#C2542D]">Experience It Like a Local.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-xl font-sans">
                Every route in this journal is researched and walked on the ground by independent travel creators. No tour bus traps or generic sponsored lists. Only day-by-day blueprints, authentic culinary stops, and vetted architectural stays.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/itineraries"
                  className="btn-primary"
                >
                  <BookOpenIcon size={14} className="text-[#D9822B]" />
                  <span>Browse Expedition Catalogue</span>
                </Link>
                <Link
                  href="/videos/vid-1"
                  className="btn-secondary"
                >
                  <PlayCircleIcon size={14} className="text-[#C2542D]" />
                  <span>Watch Field Footage</span>
                </Link>
              </div>

              {/* Editorial Index Search Bar */}
              <div className="pt-2">
                <form
                  onSubmit={handleHeroSearch}
                  className="bg-[#FAF7F2] p-3 sm:p-4 rounded-2xl border border-[#E7DFD5] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs"
                >
                  {/* Destination Input */}
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[#78716C] font-semibold block">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={searchDestination}
                      onChange={(e) => setSearchDestination(e.target.value)}
                      placeholder="e.g. South Goa, Ladakh..."
                      className="w-full bg-transparent font-medium text-xs text-[#181614] placeholder:text-[#A8A29E] focus:outline-none"
                    />
                  </div>

                  {/* Season / Month */}
                  <div className="space-y-1 sm:border-l sm:border-[#E7DFD5] sm:pl-3">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[#78716C] font-semibold block">
                      Travel Window
                    </label>
                    <select
                      value={searchDates}
                      onChange={(e) => setSearchDates(e.target.value)}
                      className="w-full bg-transparent font-medium text-xs text-[#181614] focus:outline-none cursor-pointer"
                    >
                      <option value="">Any Travel Window</option>
                      <option value="winter">Nov - Feb (Pleasant)</option>
                      <option value="monsoon">Jul - Sep (Lush)</option>
                      <option value="summer">Mar - Jun (Passes Open)</option>
                    </select>
                  </div>

                  {/* Travelers */}
                  <div className="space-y-1 sm:border-l sm:border-[#E7DFD5] sm:pl-3">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[#78716C] font-semibold block">
                      Party Size
                    </label>
                    <select
                      value={searchTravelers}
                      onChange={(e) => setSearchTravelers(e.target.value)}
                      className="w-full bg-transparent font-medium text-xs text-[#181614] focus:outline-none cursor-pointer"
                    >
                      <option value="1">Solo Explorer (1)</option>
                      <option value="2">Couple / Duo (2)</option>
                      <option value="4">Small Group (4)</option>
                      <option value="6">Friends Group (6+)</option>
                    </select>
                  </div>

                  {/* Action Button */}
                  <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                    <button
                      type="submit"
                      className="w-full btn-primary h-10 text-xs"
                    >
                      <SearchIcon size={14} className="text-[#D9822B]" />
                      <span>Search Index</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Quick Jump Links */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#78716C] font-mono">
                <span className="uppercase text-[9px]">Popular Trails:</span>
                <Link href="/destinations/south-goa" className="hover:text-[#C2542D] underline underline-offset-4">South Goa</Link>
                <Link href="/destinations/ladakh" className="hover:text-[#C2542D] underline underline-offset-4">Leh Ladakh</Link>
                <Link href="/destinations/kerala" className="hover:text-[#C2542D] underline underline-offset-4">Kerala Backwaters</Link>
                <Link href="/destinations/bali" className="hover:text-[#C2542D] underline underline-offset-4">Bali</Link>
              </div>
            </div>

            {/* Right 5 Columns: Asymmetric Layered Photographic Spread */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Photo (Polaroid / Magazine Crop) */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-200 border-2 border-white shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85"
                    alt="High mountain passes of Ladakh"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#D9822B] block">
                      FIELD DISPATCH • LEH PASS 17,580FT
                    </span>
                    <h3 className="font-serif text-lg font-bold">
                      The High-Altitude Odyssey
                    </h3>
                    <p className="font-serif italic text-xs text-stone-300">
                      Documented by Aarav Mehta
                    </p>
                  </div>
                </div>

                {/* Overlapping Secondary Stamp Card */}
                <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-[#FAF7F2] p-4 rounded-xl border border-[#E7DFD5] shadow-lg max-w-[240px] hidden sm:block -rotate-2 hover:rotate-0 transition-transform">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#C2542D] block mb-1">
                    Authentic Travel Principle
                  </span>
                  <p className="font-serif italic text-xs text-[#181614] leading-relaxed">
                    &ldquo;If a spot is on a commercial tour flyer, you won&apos;t find it here.&rdquo;
                  </p>
                  <span className="font-mono text-[9px] text-[#78716C] mt-2 block">
                    — Editorial Manifesto
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CURATOR'S LEAD EXPEDITION STORY (Asymmetric Feature Spread) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E7DFD5] shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
                FEATURED EXPEDITION DISPATCH
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#181614]">
                The Slow Coastal Drift of South Goa
              </h2>
            </div>
            <Link
              href={`/itineraries/${leadItinerary.slug}`}
              className="text-xs font-semibold text-[#C2542D] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
            >
              <span>Examine Full Field Plan ({leadItinerary.durationDays} Days)</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Columns: Story Excerpt & Stops Timeline */}
            <div className="lg:col-span-7 space-y-6">
              <p className="font-serif italic text-lg sm:text-xl text-[#181614] leading-relaxed">
                &ldquo;Forget the crowded beach bars of the north. Down south, Portuguese Latin quarters meet turquoise coves and turtle-nesting sanctuaries.&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Curated by travelers Rohan & Priya, this 4-day itinerary connects hidden coastal sanctuaries, cliffside Cabo de Rama viewpoints, and heritage spice plantations. Each stop includes realistic travel times and estimated ground costs.
              </p>

              {/* Day Timeline Snapshot */}
              <div className="pt-2 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#78716C] block">
                  Route Highlights Snapshot
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#F2EDE4] rounded-xl border border-[#E7DFD5]">
                    <span className="font-mono text-[9px] text-[#C2542D] font-bold block">DAY 01</span>
                    <h4 className="font-serif font-bold text-sm text-[#181614]">Palolem & Coves</h4>
                    <span className="text-[10px] text-[#78716C]">Kayaks & Sunset Chai</span>
                  </div>
                  <div className="p-3 bg-[#F2EDE4] rounded-xl border border-[#E7DFD5]">
                    <span className="font-mono text-[9px] text-[#C2542D] font-bold block">DAY 02</span>
                    <h4 className="font-serif font-bold text-sm text-[#181614]">Cabo de Rama Fort</h4>
                    <span className="text-[10px] text-[#78716C]">Sea-Cliff Views & Shacks</span>
                  </div>
                  <div className="p-3 bg-[#F2EDE4] rounded-xl border border-[#E7DFD5]">
                    <span className="font-mono text-[9px] text-[#C2542D] font-bold block">DAY 03</span>
                    <h4 className="font-serif font-bold text-sm text-[#181614]">Fontainhas Quarters</h4>
                    <span className="text-[10px] text-[#78716C]">Heritage Bakeries & Tile Art</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-6 text-xs text-[#78716C] font-mono">
                <span>EST. BUDGET: ₹20,000 / PERSON</span>
                <span>•</span>
                <span>SEASON: OCT TO MAR</span>
              </div>
            </div>

            {/* Right 5 Columns: Large Cinematic Photograph */}
            <div className="lg:col-span-5 aspect-[16/11] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-[#E7DFD5] shadow-md">
              <img
                src={leadItinerary.coverImage}
                alt={leadItinerary.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE GEOGRAPHIC GAZETTE (Curated Destinations Mosaic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
              REGIONAL ARCHIVE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#181614]">
              The Geographic Gazette
            </h2>
          </div>
          <Link
            href="/destinations"
            className="text-xs font-semibold text-[#C2542D] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
          >
            <span>All Destinations Index</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        {/* Asymmetrical Destination Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Wide Destination (7 cols) */}
          <div className="lg:col-span-7">
            <Link
              href={`/destinations/${MOCK_DESTINATIONS[0].slug}`}
              className="group relative block aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#E7DFD5] shadow-xs"
            >
              <img
                src={MOCK_DESTINATIONS[0].heroImage}
                alt={MOCK_DESTINATIONS[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-[#181614]/35 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#181614]/85 backdrop-blur-sm text-[#F8F5F0] text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded">
                DESTINATION SPOTLIGHT
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-[#D9822B] tracking-wider block">
                  {MOCK_DESTINATIONS[0].stateOrCountry}
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white group-hover:text-[#D9822B] transition-colors">
                  {MOCK_DESTINATIONS[0].name}
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-stone-200 line-clamp-2 max-w-xl">
                  {MOCK_DESTINATIONS[0].overview}
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-stone-300">
                  <span>{MOCK_DESTINATIONS[0].idealDurationDays}</span>
                  <span>•</span>
                  <span>Avg ₹{MOCK_DESTINATIONS[0].avgDailyBudgetInr.toLocaleString("en-IN")}/day</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Stacked Destinations (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {MOCK_DESTINATIONS.slice(1, 3).map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative block aspect-[16/10] sm:aspect-auto sm:h-[185px] rounded-2xl overflow-hidden border border-[#E7DFD5] shadow-xs"
              >
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-[#181614]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="font-mono text-[9px] uppercase text-[#D9822B] tracking-wider block">
                    {dest.stateOrCountry}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#D9822B] transition-colors">
                    {dest.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-3 text-[10px] font-mono text-stone-300">
                    <span>{dest.idealDurationDays}</span>
                    <span>•</span>
                    <span>Avg ₹{dest.avgDailyBudgetInr.toLocaleString("en-IN")}/day</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FIELD DISPATCHES: CREATOR TRAVEL REELS (Film Strip Aesthetic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
              SHORT-FORM FIELD VISUALS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#181614]">
              Dispatches From the Ground
            </h2>
          </div>
          <p className="text-xs font-mono text-[#78716C] max-w-sm">
            Quick video observations captured by creators on route. Every clip links to its full itinerary.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {MOCK_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#181614] border border-[#E7DFD5] shadow-xs hover:border-[#C2542D] transition-all flex flex-col justify-between p-3.5"
            >
              <img
                src={video.posterUrl}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-black/40" />

              {/* Top Tag */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="bg-[#181614]/80 backdrop-blur-sm px-2 py-0.5 rounded text-[#F8F5F0] text-[9px] font-mono tracking-wider uppercase">
                  {video.destinationName}
                </span>
              </div>

              {/* Center Play Indicator */}
              <Link
                href={`/videos/${video.id}`}
                className="relative z-10 self-center w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-transform group-hover:scale-110"
                aria-label={`Play dispatch: ${video.title}`}
              >
                <PlayCircleIcon size={20} className="fill-white/80" />
              </Link>

              {/* Bottom Attribution */}
              <div className="relative z-10 space-y-1 text-white">
                <span className="text-[10px] text-[#D9822B] font-mono block">
                  {video.creator.name}
                </span>
                <h4 className="font-serif text-xs font-bold line-clamp-2 leading-snug">
                  {video.title}
                </h4>
                <Link
                  href={`/itineraries/${video.itinerarySlug}`}
                  className="inline-flex items-center gap-1 text-[10px] text-stone-300 font-mono hover:text-[#C2542D] pt-1"
                >
                  <span>Open Route Blueprint</span>
                  <ArrowRightIcon size={10} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THE MASTER ITINERARY CATALOGUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
              FIELD TESTED ROUTES
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#181614]">
              The Itinerary Library
            </h2>
          </div>
          <Link
            href="/itineraries"
            className="text-xs font-semibold text-[#C2542D] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
          >
            <span>All Published Routes ({MOCK_ITINERARIES.length})</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ITINERARIES.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      </section>

      {/* 6. HANDPICKED ARCHITECTURAL STAYS (Clear Affiliate Disclosures) */}
      <section className="bg-[#FAF7F2] py-16 border-y border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
                LODGING RECOMMENDATIONS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#181614]">
                Handpicked Stays Near Routes
              </h2>
            </div>
            <div className="text-right text-[11px] font-mono text-[#78716C] max-w-xs">
              Direct partner links. RoamCraft may earn partner affiliate commissions without affecting your rate.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_HOTELS.slice(0, 3).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. THE INDEPENDENT EXPLORERS GUILD (Creators) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2542D] font-bold block mb-1">
              FIELD CORRESPONDENTS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#181614]">
              The Explorers Guild
            </h2>
          </div>
          <Link
            href="/creators"
            className="text-xs font-semibold text-[#C2542D] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider"
          >
            <span>All Field Creators</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CREATORS.map((creator) => (
            <Link
              key={creator.id}
              href={`/creators/${creator.handle.replace("@", "")}`}
              className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7DFD5] hover:border-[#C2542D] transition-all group block text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={creator.avatarUrl}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#C2542D]/20 group-hover:ring-[#C2542D] transition-all"
                />
                <div>
                  <h3 className="font-serif font-bold text-base text-[#181614] group-hover:text-[#C2542D] transition-colors leading-tight">
                    {creator.name}
                  </h3>
                  <span className="font-mono text-[10px] text-[#78716C]">{creator.handle}</span>
                </div>
              </div>
              <p className="text-xs text-[#57534E] font-serif italic line-clamp-2 leading-relaxed">
                &ldquo;{creator.bio}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-[#E7DFD5] flex items-center justify-between text-[10px] font-mono text-[#78716C]">
                <span>{creator.totalTripsPublished} Routes Dispatched</span>
                <span className="text-[#C2542D] font-semibold">View Passport →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. EDITORIAL MANIFESTO & CREATOR CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#263D33] text-[#F8F5F0] rounded-3xl p-8 sm:p-14 border border-[#1B2D26] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-[10px] text-[#D9822B] uppercase tracking-[0.2em] font-semibold block">
              PUBLISH YOUR FIELD RESEARCH
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Have you mapped an unforgettable trail?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              RoamCraft is an independent journal supporting authentic travel writers, photographers, and local guides. Publish your day-by-day itineraries, upload short video reels, and earn transparent partner hotel booking commissions.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <Link
              href="/creator/apply"
              className="py-3 px-6 rounded-xl bg-[#C2542D] hover:bg-[#A94320] text-white text-xs font-semibold uppercase tracking-wider text-center transition-colors shadow-md"
            >
              Apply as a Creator
            </Link>
            <Link
              href="/studio"
              className="py-3 px-6 rounded-xl bg-[#1B2D26] hover:bg-[#14231E] text-stone-200 text-xs font-semibold uppercase tracking-wider text-center border border-white/10 transition-colors"
            >
              Open Creator Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
