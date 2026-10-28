export type UserRole = "traveler" | "creator" | "admin";

export type TravelStyle = 
  | "adventure" 
  | "relaxation" 
  | "food" 
  | "culture" 
  | "luxury" 
  | "family" 
  | "romantic" 
  | "solo" 
  | "nightlife" 
  | "nature";

export type TravelerType = "Solo Traveler" | "Couples" | "Honeymooners" | "Families" | "Group of Friends" | "Budget Explorers" | "Luxury Seekers";

export interface CreatorProfile {
  id: string;
  userId: string;
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  verified: boolean;
  location: string;
  followersCount: number;
  totalTripsPublished: number;
  socials: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  specialties: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  stateOrCountry: string;
  isInternational: boolean;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  bestSeasons: string[];
  idealDurationDays: string;
  avgDailyBudgetInr: number;
  currencyCode: string;
  topAttractions: string[];
  travelTips: string[];
}

export interface ItineraryStop {
  id: string;
  order: number;
  title: string;
  category: "attraction" | "food" | "activity" | "viewpoint" | "transport" | "relaxation";
  durationMins: number;
  estimatedCostInr: number;
  travelTimeFromPrevMins?: number;
  description: string;
  foodTips?: string;
  imageUrl?: string;
  mapQuery?: string;
  recommendedTimeOfDay?: "Morning" | "Afternoon" | "Sunset" | "Night";
  sourceType?: "creator" | "external_recommendation"; // creator authored vs curated partner
  transportMode?: "Scooter / Bike" | "Walking" | "Ferry / Boat" | "Taxi / Auto" | "4x4 Jeep";
}

export interface TravelerProfile {
  name: string;
  email: string;
  avatarUrl: string;
  homeCity: string;
  favoriteStyles: TravelStyle[];
  notifications: {
    tripUpdates: boolean;
    creatorAlerts: boolean;
    dealDiscounts: boolean;
    emailDigest: boolean;
  };
  privacy: {
    publicTrips: boolean;
    showSavedCollections: boolean;
  };
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  stops: ItineraryStop[];
  daySummary: string;
  dailyEstimatedCostInr: number;
}

export interface HotelRecommendation {
  id: string;
  name: string;
  destinationId: string;
  nearAttraction: string;
  category: "Boutique Heritage" | "Eco-Resort" | "Luxury Villa" | "Cozy Homestay" | "Hostel / Backpacker";
  rating: number; // e.g. 4.8
  reviewCount: number;
  pricePerNightInr: number;
  images: string[];
  amenities: string[];
  placementType: "organic" | "sponsored" | "affiliate";
  partnerName: "Booking.com Partner" | "Agoda Affiliate" | "MakeMyTrip Network";
  partnerAttributionId: string;
  outboundUrl: string;
  disclosureLabel: string;
  itineraryTag?: string;
}

export interface Itinerary {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  creatorId: string;
  creator: CreatorProfile;
  destinationId: string;
  destinationName: string;
  isInternational: boolean;
  coverImage: string;
  durationDays: number;
  budgetPerPersonInr: number;
  travelStyle: TravelStyle[];
  travelerType: TravelerType;
  recommendedSeason: string;
  publishedDate: string;
  status: "published" | "draft" | "under_review";
  isFeatured?: boolean;
  savesCount: number;
  viewsCount: number;
  introNotes: string;
  packingAndPracticalTips: string[];
  days: ItineraryDay[];
  hotels: HotelRecommendation[];
}

export interface VideoClip {
  id: string;
  creatorId: string;
  creator: CreatorProfile;
  destinationId: string;
  destinationName: string;
  itinerarySlug: string;
  title: string;
  caption: string;
  videoUrl: string; // playable mp4 or loop preview
  posterUrl: string;
  likesCount: number;
  savesCount: number;
  durationSeconds: number;
  tags: string[];
}

export interface PersonalTripStop extends ItineraryStop {
  notes?: string;
  visited?: boolean;
}

export interface PersonalTripDay {
  dayNumber: number;
  title: string;
  stops: PersonalTripStop[];
}

export interface PersonalTrip {
  id: string;
  title: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  partySize: number;
  budgetPerPersonInr: number;
  travelStyle: TravelStyle;
  days: PersonalTripDay[];
  notes: string;
  sourceItineraryId?: string;
  createdAt: string;
  status: "planning" | "booked" | "completed";
}

export interface CreatorApplication {
  id: string;
  userId: string;
  applicantName: string;
  email: string;
  socialLink: string;
  contentNiche: string;
  sampleWorkUrl: string;
  pitch: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

export interface ContentReport {
  id: string;
  itemType: "itinerary" | "video" | "hotel";
  itemId: string;
  itemTitle: string;
  reporterEmail: string;
  reason: "Outdated pricing/timings" | "Misleading travel info" | "Copyright infringement" | "Spam";
  details: string;
  status: "open" | "resolved" | "dismissed";
  timestamp: string;
}

export interface AffiliateClickEvent {
  id: string;
  hotelId: string;
  hotelName: string;
  partnerName: string;
  itineraryId?: string;
  userId?: string;
  timestamp: string;
  pricePerNightInr: number;
  estimatedCommissionInr: number;
}
