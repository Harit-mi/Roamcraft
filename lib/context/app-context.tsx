"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  UserRole, 
  Itinerary, 
  PersonalTrip, 
  PersonalTripDay, 
  PersonalTripStop, 
  VideoClip, 
  CreatorApplication, 
  ContentReport, 
  AffiliateClickEvent, 
  HotelRecommendation,
  TravelerProfile 
} from "../types";
import { 
  MOCK_ITINERARIES, 
  MOCK_VIDEOS, 
  MOCK_HOTELS, 
  MOCK_APPLICATIONS, 
  MOCK_REPORTS, 
  MOCK_AFFILIATE_CLICKS,
  MOCK_CREATORS
} from "../data/mock-db";

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  itineraries: Itinerary[];
  updateItinerary: (id: string, updated: Partial<Itinerary>) => void;
  deleteItinerary: (id: string) => void;
  duplicateItinerary: (id: string) => string;
  savedItineraryIds: string[];
  savedVideoIds: string[];
  toggleSaveItinerary: (id: string) => void;
  toggleSaveVideo: (id: string) => void;
  isItinerarySaved: (id: string) => boolean;
  isVideoSaved: (id: string) => boolean;
  
  // Videos
  videos: VideoClip[];
  addVideo: (video: VideoClip) => void;
  
  // Personal Trips
  personalTrips: PersonalTrip[];
  createTripFromItinerary: (itinerary: Itinerary) => string;
  createEmptyTrip: (destinationName: string, daysCount: number) => string;
  updateTrip: (tripId: string, updated: Partial<PersonalTrip>) => void;
  deleteTrip: (tripId: string) => void;
  addStopToTrip: (tripId: string, dayNumber: number, stop: Omit<PersonalTripStop, "id" | "order">) => void;
  removeStopFromTrip: (tripId: string, dayNumber: number, stopId: string) => void;
  toggleStopVisited: (tripId: string, dayNumber: number, stopId: string) => void;
  
  // Traveler Profile & Settings
  profile: TravelerProfile;
  updateProfile: (updated: Partial<TravelerProfile>) => void;
  
  // Creator actions
  publishItinerary: (newItinerary: Itinerary) => void;
  submitCreatorApplication: (app: Omit<CreatorApplication, "id" | "status" | "submittedAt">) => void;
  
  // Admin & Moderation actions
  creatorApplications: CreatorApplication[];
  updateApplicationStatus: (id: string, status: "approved" | "rejected") => void;
  contentReports: ContentReport[];
  submitContentReport: (report: Omit<ContentReport, "id" | "status" | "timestamp">) => void;
  resolveContentReport: (id: string, status: "resolved" | "dismissed") => void;
  
  // Monetization & Affiliate tracking
  affiliateClicks: AffiliateClickEvent[];
  trackAffiliateClick: (hotel: HotelRecommendation, itineraryId?: string) => void;
  hotels: HotelRecommendation[];
  updateHotelPlacement: (hotelId: string, placementType: "organic" | "sponsored" | "affiliate") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("traveler");
  const [itineraries, setItineraries] = useState<Itinerary[]>(MOCK_ITINERARIES);
  const [videos, setVideos] = useState<VideoClip[]>(MOCK_VIDEOS);
  const [savedItineraryIds, setSavedItineraryIds] = useState<string[]>(["itin-south-goa-5d"]);
  const [savedVideoIds, setSavedVideoIds] = useState<string[]>(["video-1"]);
  const [hotels, setHotels] = useState<HotelRecommendation[]>(MOCK_HOTELS);
  const [creatorApplications, setCreatorApplications] = useState<CreatorApplication[]>(MOCK_APPLICATIONS);
  const [contentReports, setContentReports] = useState<ContentReport[]>(MOCK_REPORTS);
  const [affiliateClicks, setAffiliateClicks] = useState<AffiliateClickEvent[]>(MOCK_AFFILIATE_CLICKS);

  const [profile, setProfile] = useState<TravelerProfile>({
    name: "Arjun Verma",
    email: "arjun.verma@roamcraft.demo",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    homeCity: "Mumbai, India",
    favoriteStyles: ["romantic", "relaxation", "food", "adventure"],
    notifications: {
      tripUpdates: true,
      creatorAlerts: true,
      dealDiscounts: false,
      emailDigest: true,
    },
    privacy: {
      publicTrips: false,
      showSavedCollections: true,
    }
  });

  const updateProfile = (updated: Partial<TravelerProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const updateItinerary = (id: string, updated: Partial<Itinerary>) => {
    setItineraries(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteItinerary = (id: string) => {
    setItineraries(prev => prev.filter(item => item.id !== id));
  };

  const duplicateItinerary = (id: string): string => {
    const existing = itineraries.find(i => i.id === id);
    if (!existing) return "";
    const newId = `itin-copy-${Date.now()}`;
    const duplicated: Itinerary = {
      ...existing,
      id: newId,
      slug: `${existing.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${existing.title} (Copy)`,
      status: "draft",
      publishedDate: new Date().toISOString().split("T")[0],
      savesCount: 0,
      viewsCount: 0,
    };
    setItineraries(prev => [duplicated, ...prev]);
    return newId;
  };

  const addVideo = (newVideo: VideoClip) => {
    setVideos(prev => [newVideo, ...prev]);
  };

  // Initialize a demo personal trip cloned from South Goa
  const [personalTrips, setPersonalTrips] = useState<PersonalTrip[]>([
    {
      id: "trip-demo-1",
      title: "My Goa Honeymoon Escape",
      destinationName: "South Goa",
      startDate: "2026-11-15",
      endDate: "2026-11-20",
      partySize: 2,
      budgetPerPersonInr: 18500,
      travelStyle: "romantic",
      sourceItineraryId: "itin-south-goa-5d",
      createdAt: "2026-10-24",
      status: "planning",
      notes: "Remember to book the butterfly beach boat ride before 8am for calmer waters.",
      days: MOCK_ITINERARIES[0].days.map(d => ({
        dayNumber: d.dayNumber,
        title: d.title,
        stops: d.stops.map(s => ({ ...s, visited: s.order === 1 }))
      }))
    }
  ]);

  const toggleSaveItinerary = (id: string) => {
    setSavedItineraryIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSaveVideo = (id: string) => {
    setSavedVideoIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isItinerarySaved = (id: string) => savedItineraryIds.includes(id);
  const isVideoSaved = (id: string) => savedVideoIds.includes(id);

  const createTripFromItinerary = (itinerary: Itinerary): string => {
    const newTripId = `trip-${Date.now()}`;
    const newTrip: PersonalTrip = {
      id: newTripId,
      title: `My ${itinerary.destinationName} Trip (from ${itinerary.creator.name})`,
      destinationName: itinerary.destinationName,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + itinerary.durationDays * 86400000).toISOString().split("T")[0],
      partySize: 2,
      budgetPerPersonInr: itinerary.budgetPerPersonInr,
      travelStyle: itinerary.travelStyle[0] || "relaxation",
      sourceItineraryId: itinerary.id,
      createdAt: new Date().toISOString().split("T")[0],
      status: "planning",
      notes: `Customized based on ${itinerary.title}.`,
      days: itinerary.days.map(d => ({
        dayNumber: d.dayNumber,
        title: d.title,
        stops: d.stops.map(s => ({ ...s, visited: false }))
      }))
    };

    setPersonalTrips(prev => [newTrip, ...prev]);
    return newTripId;
  };

  const createEmptyTrip = (destinationName: string, daysCount: number): string => {
    const newTripId = `trip-${Date.now()}`;
    const days: PersonalTripDay[] = Array.from({ length: daysCount }, (_, i) => ({
      dayNumber: i + 1,
      title: `Day ${i + 1} Exploration`,
      stops: []
    }));

    const newTrip: PersonalTrip = {
      id: newTripId,
      title: `Custom ${destinationName} Adventure`,
      destinationName,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + daysCount * 86400000).toISOString().split("T")[0],
      partySize: 1,
      budgetPerPersonInr: 15000,
      travelStyle: "adventure",
      createdAt: new Date().toISOString().split("T")[0],
      status: "planning",
      notes: "Custom itinerary crafted from scratch.",
      days
    };

    setPersonalTrips(prev => [newTrip, ...prev]);
    return newTripId;
  };

  const updateTrip = (tripId: string, updated: Partial<PersonalTrip>) => {
    setPersonalTrips(prev => 
      prev.map(t => (t.id === tripId ? { ...t, ...updated } : t))
    );
  };

  const deleteTrip = (tripId: string) => {
    setPersonalTrips(prev => prev.filter(t => t.id !== tripId));
  };

  const addStopToTrip = (tripId: string, dayNumber: number, stopData: Omit<PersonalTripStop, "id" | "order">) => {
    setPersonalTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        days: trip.days.map(day => {
          if (day.dayNumber !== dayNumber) return day;
          const nextOrder = day.stops.length + 1;
          const newStop: PersonalTripStop = {
            ...stopData,
            id: `stop-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            order: nextOrder,
            visited: false
          };
          return {
            ...day,
            stops: [...day.stops, newStop]
          };
        })
      };
    }));
  };

  const removeStopFromTrip = (tripId: string, dayNumber: number, stopId: string) => {
    setPersonalTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        days: trip.days.map(day => {
          if (day.dayNumber !== dayNumber) return day;
          return {
            ...day,
            stops: day.stops.filter(s => s.id !== stopId).map((s, idx) => ({ ...s, order: idx + 1 }))
          };
        })
      };
    }));
  };

  const toggleStopVisited = (tripId: string, dayNumber: number, stopId: string) => {
    setPersonalTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        days: trip.days.map(day => {
          if (day.dayNumber !== dayNumber) return day;
          return {
            ...day,
            stops: day.stops.map(s => s.id === stopId ? { ...s, visited: !s.visited } : s)
          };
        })
      };
    }));
  };

  const publishItinerary = (newItinerary: Itinerary) => {
    setItineraries(prev => [newItinerary, ...prev]);
  };

  const submitCreatorApplication = (appData: Omit<CreatorApplication, "id" | "status" | "submittedAt">) => {
    const newApp: CreatorApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      status: "pending",
      submittedAt: new Date().toISOString().split("T")[0]
    };
    setCreatorApplications(prev => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: "approved" | "rejected") => {
    setCreatorApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const submitContentReport = (reportData: Omit<ContentReport, "id" | "status" | "timestamp">) => {
    const newReport: ContentReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      status: "open",
      timestamp: new Date().toISOString().split("T")[0]
    };
    setContentReports(prev => [newReport, ...prev]);
  };

  const resolveContentReport = (id: string, status: "resolved" | "dismissed") => {
    setContentReports(prev => prev.map(rep => 
      rep.id === id ? { ...rep, status } : rep
    ));
  };

  const trackAffiliateClick = (hotel: HotelRecommendation, itineraryId?: string) => {
    const estCommission = Math.round(hotel.pricePerNightInr * 0.06); // 6% illustrative commission model
    const clickEvent: AffiliateClickEvent = {
      id: `clk-${Date.now()}`,
      hotelId: hotel.id,
      hotelName: hotel.name,
      partnerName: hotel.partnerName,
      itineraryId: itineraryId,
      timestamp: new Date().toLocaleString(),
      pricePerNightInr: hotel.pricePerNightInr,
      estimatedCommissionInr: estCommission
    };
    setAffiliateClicks(prev => [clickEvent, ...prev]);
  };

  const updateHotelPlacement = (hotelId: string, placementType: "organic" | "sponsored" | "affiliate") => {
    setHotels(prev => prev.map(h => h.id === hotelId ? { ...h, placementType } : h));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        itineraries,
        updateItinerary,
        deleteItinerary,
        duplicateItinerary,
        savedItineraryIds,
        savedVideoIds,
        toggleSaveItinerary,
        toggleSaveVideo,
        isItinerarySaved,
        isVideoSaved,
        videos,
        addVideo,
        profile,
        updateProfile,
        personalTrips,
        createTripFromItinerary,
        createEmptyTrip,
        updateTrip,
        deleteTrip,
        addStopToTrip,
        removeStopFromTrip,
        toggleStopVisited,
        publishItinerary,
        submitCreatorApplication,
        creatorApplications,
        updateApplicationStatus,
        contentReports,
        submitContentReport,
        resolveContentReport,
        affiliateClicks,
        trackAffiliateClick,
        hotels,
        updateHotelPlacement
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
