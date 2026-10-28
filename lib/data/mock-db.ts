import { 
  CreatorProfile, 
  Destination, 
  Itinerary, 
  HotelRecommendation, 
  VideoClip, 
  CreatorApplication, 
  ContentReport, 
  AffiliateClickEvent 
} from "../types";

export const MOCK_CREATORS: CreatorProfile[] = [
  {
    id: "creator-1",
    userId: "user-c1",
    name: "Aarav Mehta",
    handle: "@aaravhimalayas",
    bio: "Motorcycle nomad & mountain photographer. Explored 40+ high Himalayan passes across Ladakh, Spiti & Kashmir over 8 years.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    verified: true,
    location: "Manali & Leh, India",
    followersCount: 184000,
    totalTripsPublished: 14,
    socials: {
      instagram: "https://instagram.com/aaravhimalayas",
      youtube: "https://youtube.com/@aaravhimalayas",
    },
    specialties: ["High-Altitude Roadtrips", "Stargazing", "Boutique Homestays"],
  },
  {
    id: "creator-2",
    userId: "user-c2",
    name: "Ananya Sharma",
    handle: "@ananya_wanders",
    bio: "Slow travel writer and heritage architecture enthusiast. Finding undiscovered artisan villages, historic havelis, and coastal gems.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&auto=format&fit=crop&q=80",
    verified: true,
    location: "Jaipur & Mumbai, India",
    followersCount: 242000,
    totalTripsPublished: 19,
    socials: {
      instagram: "https://instagram.com/ananya_wanders",
      youtube: "https://youtube.com/@ananyawanders",
    },
    specialties: ["Heritage Havelis", "Local Food Trails", "Handicrafts & Textiles"],
  },
  {
    id: "creator-3",
    userId: "user-c3",
    name: "Rohan & Priya",
    handle: "@twotravelertales",
    bio: "Couple traveling across India and Southeast Asia. We test every café, cliffside villa, and scenic sunrise spot so you don't have to.",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    verified: true,
    location: "Bangalore, India",
    followersCount: 310000,
    totalTripsPublished: 26,
    socials: {
      instagram: "https://instagram.com/twotravelertales",
      youtube: "https://youtube.com/@twotravelers",
    },
    specialties: ["Romantic Getaways", "Coastal Cafés", "Mid-Luxury Stays"],
  },
  {
    id: "creator-4",
    userId: "user-c4",
    name: "Devika Nambiar",
    handle: "@devika.southtrails",
    bio: "Born in Kochi. Documenting ancient spice routes, silent backwaters, Kathakali troupes, and rainforest retreats across Southern India.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80",
    verified: false,
    location: "Kochi, Kerala",
    followersCount: 76000,
    totalTripsPublished: 8,
    socials: {
      instagram: "https://instagram.com/devika.southtrails",
    },
    specialties: ["Kerala Backwaters", "Ayurvedic Living", "Traditional Cuisine"],
  }
];

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "dest-goa-south",
    slug: "south-goa",
    name: "South Goa",
    stateOrCountry: "Goa, India",
    isInternational: false,
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=800&auto=format&fit=crop&q=80",
    ],
    overview: "Forget crowded party beaches. South Goa reveals quiet turquoise bays, Portuguese Latin quarters in Fontainhas, pristine turtle nesting shores in Galgibaga, and old-school spice estates.",
    bestSeasons: ["November to February (Pleasant breeze)", "July to September (Lush monsoon greenery)"],
    idealDurationDays: "4-6 Days",
    avgDailyBudgetInr: 3500,
    currencyCode: "INR",
    topAttractions: ["Palolem & Butterfly Beach", "Cabo de Rama Fort", "Fontainhas Latin Quarter", "Cola Lagoon", "Netravali Bubbling Lake"],
    travelTips: [
      "Rent a scooter from Madgaon station for ₹350-500/day.",
      "Carry cash for beach shacks as network connectivity can drop near Cabo de Rama.",
      "Visit Butterfly Beach via a morning boat ride from Palolem."
    ]
  },
  {
    id: "dest-ladakh",
    slug: "ladakh",
    name: "Leh Ladakh",
    stateOrCountry: "Ladakh UT, India",
    isInternational: false,
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=800&auto=format&fit=crop&q=80",
    ],
    overview: "The moonland of India. Stark granite peaks, 1000-year-old cliffside Buddhist gompas, high mountain passes over 17,000 feet, and the celestial blue waters of Pangong Tso.",
    bestSeasons: ["May to September (Road passes open, pleasant days)", "October (Golden poplars, crisp cold)"],
    idealDurationDays: "7-9 Days",
    avgDailyBudgetInr: 5200,
    currencyCode: "INR",
    topAttractions: ["Thiksey & Diskit Monasteries", "Pangong Tso Lake", "Nubra Valley Sand Dunes", "Khardung La Pass", "Tso Moriri"],
    travelTips: [
      "Mandatory: Rest completely for the first 36 hours in Leh (3,500m) to acclimatize to high altitude.",
      "Get the Inner Line Permit (ILP) online at least 48 hours prior for Pangong and Nubra.",
      "Carry Diamox, hydration salts, and layers for temperatures dropping to -4°C at night."
    ]
  },
  {
    id: "dest-kerala",
    slug: "kerala",
    name: "Munnar & Alleppey",
    stateOrCountry: "Kerala, India",
    isInternational: false,
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&auto=format&fit=crop&q=80",
    ],
    overview: "Rolling emerald tea plantations shrouded in morning mist giving way to slow-moving wooden kettuvallams (houseboats) meandering through palm-fringed backwaters.",
    bestSeasons: ["September to March (Crisp hill weather)", "June to August (Ayurvedic monsoon season)"],
    idealDurationDays: "5-7 Days",
    avgDailyBudgetInr: 4000,
    currencyCode: "INR",
    topAttractions: ["Eravikulam National Park", "Kolukkumalai Sunrise Peak", "Vembanad Lake Kayaking", "Marari Beach"],
    travelTips: [
      "Take an offroad 4x4 jeep to Kolukkumalai by 4:30 AM for the world's highest tea garden sunrise.",
      "Opt for private eco-shikaras in Alleppey instead of large houseboats to navigate narrow canal villages."
    ]
  },
  {
    id: "dest-rajasthan",
    slug: "rajasthan-heritage",
    name: "Udaipur & Jodhpur",
    stateOrCountry: "Rajasthan, India",
    isInternational: false,
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80",
    ],
    overview: "Gleaming marble palaces floating on Lake Pichola, towering blue-walled fortifications of Mehrangarh, and candlelit rooftop dining serving authentic Laal Maas.",
    bestSeasons: ["October to March (Warm winter sunshine, comfortable sightseeing)"],
    idealDurationDays: "5-6 Days",
    avgDailyBudgetInr: 4800,
    currencyCode: "INR",
    topAttractions: ["Udaipur City Palace", "Lake Pichola Sunset Boat Ride", "Mehrangarh Fort Zipline", "Bishnoi Village Safari"],
    travelTips: [
      "Book the sunset boat tour from Rameshwar Ghat in Udaipur at least 1 day in advance.",
      "Explore the old Blue City alleys of Navchokiya on foot with a local storyteller."
    ]
  },
  {
    id: "dest-bali",
    slug: "bali-island",
    name: "Bali (Ubud & Uluwatu)",
    stateOrCountry: "Indonesia",
    isInternational: true,
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop&q=80",
    ],
    overview: "A spiritual tropical sanctuary where sacred rainforest temples, cascading rice terraces, surf breaks, and plant-based cliffside cafés merge seamlessly.",
    bestSeasons: ["April to October (Dry season with sunny skies & great surf)"],
    idealDurationDays: "6-8 Days",
    avgDailyBudgetInr: 6500,
    currencyCode: "IDR (Displayed in INR)",
    topAttractions: ["Tegallalang Rice Terraces", "Tirta Empul Holy Water Temple", "Uluwatu Sunset Kecak Dance", "Nusa Penida Kelingking Beach"],
    travelTips: [
      "Indian citizens obtain Visa on Arrival (e-VOA) online easily before boarding.",
      "Download Grab and Gojek apps for easy local transport and food deliveries in Ubud and Canggu."
    ]
  }
];

export const MOCK_HOTELS: HotelRecommendation[] = [
  {
    id: "hotel-goa-1",
    name: "Elsewhere Beach Cottages & Portuguese Mandrem",
    destinationId: "dest-goa-south",
    nearAttraction: "Mandrem Spit / Ashwem Coast",
    category: "Boutique Heritage",
    rating: 4.9,
    reviewCount: 312,
    pricePerNightInr: 6800,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Private Sand Spit Access", "Fresh Coastal Breakfast", "Solar Powered", "No TV / Digital Detox"],
    placementType: "organic",
    partnerName: "Booking.com Partner",
    partnerAttributionId: "cr_southgoa_elsewhere_01",
    outboundUrl: "https://www.booking.com/hotel/in/sample-elsewhere.html?aid=DEMO_PARTNER_ATTR_8921",
    disclosureLabel: "Creator's Personal Pick • Booking Partner Link (Prices Indicative)",
    itineraryTag: "Day 1-3 Base"
  },
  {
    id: "hotel-goa-2",
    name: "Sobit Sarovar Portico Palolem",
    destinationId: "dest-goa-south",
    nearAttraction: "Palolem Beach (500m)",
    category: "Eco-Resort",
    rating: 4.7,
    reviewCount: 520,
    pricePerNightInr: 5200,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Swimming Pool", "Spa & Wellness", "Free High-speed Wi-Fi", "Multicuisine Restaurant"],
    placementType: "sponsored",
    partnerName: "Agoda Affiliate",
    partnerAttributionId: "sp_palolem_sobit_11",
    outboundUrl: "https://www.agoda.com/partners/partnersearch.aspx?hid=DEMO_HOTEL_44321",
    disclosureLabel: "Sponsored Partner Stay • Official Affiliate Referral",
    itineraryTag: "Day 3-5 Base"
  },
  {
    id: "hotel-ladakh-1",
    name: "The Grand Dragon Ladakh (Eco Luxury)",
    destinationId: "dest-ladakh",
    nearAttraction: "Leh Old Market (10 mins)",
    category: "Luxury Villa",
    rating: 4.8,
    reviewCount: 740,
    pricePerNightInr: 11500,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Central Heating", "In-room Oxygen Enrichment", "Solar Heated Water", "Organic Mountain Cafe"],
    placementType: "organic",
    partnerName: "Booking.com Partner",
    partnerAttributionId: "cr_ladakh_granddragon_04",
    outboundUrl: "https://www.booking.com/hotel/in/sample-grand-dragon-leh.html?aid=DEMO_AFF_77",
    disclosureLabel: "Creator's Acclimatization Choice • Booking Affiliate",
    itineraryTag: "Acclimatization Hub (Day 1-3)"
  },
  {
    id: "hotel-ladakh-2",
    name: "Nubra Organic Retreat Hunder",
    destinationId: "dest-ladakh",
    nearAttraction: "Hunder Sand Dunes & Bactrian Camels",
    category: "Cozy Homestay",
    rating: 4.6,
    reviewCount: 280,
    pricePerNightInr: 4800,
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Apple Orchard Setting", "Deluxe Swiss Tents", "Farm-to-Table Dinners", "Campfire Stargazing"],
    placementType: "affiliate",
    partnerName: "MakeMyTrip Network",
    partnerAttributionId: "mmt_nubra_retreat_02",
    outboundUrl: "https://www.makemytrip.com/hotels/sample-nubra-retreat?cmp=DEMO_MMT_PARTNER",
    disclosureLabel: "Affiliate Referral Link • Standard Commission Terms",
    itineraryTag: "Nubra Valley Stay"
  },
  {
    id: "hotel-kerala-1",
    name: "Fragrant Nature Munnar (Tea Valley Haven)",
    destinationId: "dest-kerala",
    nearAttraction: "Pothamedu Viewpoint",
    category: "Eco-Resort",
    rating: 4.8,
    reviewCount: 490,
    pricePerNightInr: 8200,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Fireplace in Room", "Tea Valley Panoramas", "Ayurvedic Spa", "Nature Trails"],
    placementType: "organic",
    partnerName: "Booking.com Partner",
    partnerAttributionId: "cr_kerala_fragrant_01",
    outboundUrl: "https://www.booking.com/hotel/in/sample-fragrant-nature-munnar.html?aid=DEMO_AFF_77",
    disclosureLabel: "Creator Recommended • Partner Affiliate Link"
  },
  {
    id: "hotel-bali-1",
    name: "Komaneka at Bisma Ubud (Rainforest Reserve)",
    destinationId: "dest-bali",
    nearAttraction: "Campuhan Ridge & Monkey Forest",
    category: "Luxury Villa",
    rating: 4.9,
    reviewCount: 920,
    pricePerNightInr: 14200,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80"
    ],
    amenities: ["Infinity Pool over Jungle", "Daily Afternoon High Tea", "Free Shuttle to Ubud Center", "Yoga Pavilion"],
    placementType: "affiliate",
    partnerName: "Agoda Affiliate",
    partnerAttributionId: "agoda_bali_komaneka_99",
    outboundUrl: "https://www.agoda.com/partners/partnersearch.aspx?hid=DEMO_KOMANEKA_11",
    disclosureLabel: "Affiliate Link • Rates shown in INR (Approx)"
  }
];

export const MOCK_ITINERARIES: Itinerary[] = [
  {
    id: "itin-south-goa-5d",
    slug: "south-goa-hidden-coves-and-feni-trails",
    title: "Hidden South Goa: Secret Coves, Portuguese Quarters & River Kayaks",
    tagline: "Skip the Baga crowds. A 5-day slow itinerary through unhurried fishing hamlets, heritage Latin mansions, and secret sea coves.",
    creatorId: "creator-3",
    creator: MOCK_CREATORS[2], // Rohan & Priya
    destinationId: "dest-goa-south",
    destinationName: "South Goa",
    isInternational: false,
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80",
    durationDays: 5,
    budgetPerPersonInr: 18500,
    travelStyle: ["relaxation", "food", "romantic", "culture"],
    travelerType: "Couples",
    recommendedSeason: "October to March",
    publishedDate: "2026-09-14",
    status: "published",
    isFeatured: true,
    savesCount: 1420,
    viewsCount: 38900,
    introNotes: "Most people land in Goa and stay stuck in North Goa's bumper-to-bumper beach roads. We designed this 5-day route through South Goa's emerald backwaters and silent coast so you can experience how Goa felt 30 years ago. Budget includes boutique stays, scooter fuel, fresh sea catch dinners, and heritage entry fees.",
    packingAndPracticalTips: [
      "Rent a standard scooter at Madgaon railway station (₹400/day) — it's the easiest way to navigate narrow village lanes.",
      "Bring mosquito repellent for mangrove kayak trails.",
      "Dress respectfully when entering Churches in Old Goa and Chandor (covered knees and shoulders)."
    ],
    days: [
      {
        dayNumber: 1,
        title: "Latin Quarters & River Heritage",
        theme: "Colonial Architecture & Heritage Baking",
        daySummary: "Arrive in South Goa, stroll through rainbow-colored heritage villas in Fontainhas, and relish Goan poi bread with chorizo.",
        dailyEstimatedCostInr: 3200,
        stops: [
          {
            id: "stop-g1",
            order: 1,
            category: "attraction",
            title: "Fontainhas Latin Quarter Walking Loop",
            durationMins: 120,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Morning",
            description: "Wander past Portuguese villas in yellow, indigo, and terracotta hues with tiled balconies and brass door knockers.",
            foodTips: "Grab warm Bebinca and cashew Macaroons from Confeitaria 31 De Janeiro (est. 1932).",
            mapQuery: "Fontainhas, Panjim, Goa",
            imageUrl: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600&auto=format&fit=crop&q=80"
          },
          {
            id: "stop-g2",
            order: 2,
            category: "food",
            title: "Traditional Lunch at Viva Panjim",
            durationMins: 75,
            estimatedCostInr: 850,
            recommendedTimeOfDay: "Afternoon",
            description: "Heritage family-run home serving Kingfish curry, prawn balchão, and fresh coconut rice.",
            foodTips: "Ask for their house-brewed Sol Kadi — tangy, refreshing, and helps beat the midday heat."
          },
          {
            id: "stop-g3",
            order: 3,
            category: "viewpoint",
            title: "Sunset Ferry to Divar Island",
            durationMins: 90,
            estimatedCostInr: 100,
            recommendedTimeOfDay: "Sunset",
            description: "Drive your scooter onto the free government river ferry across the Mandovi. Empty winding village roads lined with churches.",
            travelTimeFromPrevMins: 20
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Cliffside Forts & Secret Lagoons",
        theme: "Coastal Vistas & Hidden Sweetwater Lagoon",
        daySummary: "Ride south to the dramatic ramparts of Cabo de Rama and swim in the unique freshwater lagoon at Cola Beach.",
        dailyEstimatedCostInr: 3600,
        stops: [
          {
            id: "stop-g4",
            order: 1,
            category: "attraction",
            title: "Cabo de Rama Fort Ruins",
            durationMins: 100,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Morning",
            description: "Ancient cape fortress overlooking crashing Arabian Sea waves. Great spot to spot playful dolphins in the morning.",
            travelTimeFromPrevMins: 55,
            imageUrl: "https://images.unsplash.com/photo-1587922546307-776227941871?w=600&auto=format&fit=crop&q=80"
          },
          {
            id: "stop-g5",
            order: 2,
            category: "activity",
            title: "Cola Beach Sweetwater Lagoon Kayaking",
            durationMins: 150,
            estimatedCostInr: 600,
            recommendedTimeOfDay: "Afternoon",
            description: "A natural freshwater river meets the sea under thick palm canopy. Rent a single kayak for ₹300/hr.",
            foodTips: "Fresh king crab thali at Dwarka Eco Shacks right by the lagoon bank."
          }
        ]
      },
      {
        dayNumber: 3,
        title: "Palolem Crescent & Butterfly Cove",
        theme: "Boat Expedition & Golden Hour Sunsets",
        daySummary: "Boat across to secluded Butterfly Beach where dense forests meet golden sands, followed by sundowners in Palolem.",
        dailyEstimatedCostInr: 4200,
        stops: [
          {
            id: "stop-g6",
            order: 1,
            category: "activity",
            title: "Sunrise Fisherman Boat to Butterfly Beach",
            durationMins: 120,
            estimatedCostInr: 1500,
            recommendedTimeOfDay: "Morning",
            description: "Small local motorboat ride through sea arches to a hidden cove inaccessible by road.",
            travelTimeFromPrevMins: 25
          },
          {
            id: "stop-g7",
            order: 2,
            category: "food",
            title: "Dropadi Sea Breeze Dinner",
            durationMins: 90,
            estimatedCostInr: 1200,
            recommendedTimeOfDay: "Night",
            description: "Candles in the sand, sound of gentle waves, and grilled tiger prawns cooked with Goan spices."
          }
        ]
      },
      {
        dayNumber: 4,
        title: "Spice Plantations & Heritage Mansions",
        theme: "Botanical Trails & 400-Year-Old Palaces",
        daySummary: "Head inland towards Ponda to walk through organic vanilla, pepper, and cinnamon gardens, finished with a sit-down royal lunch.",
        dailyEstimatedCostInr: 3400,
        stops: [
          {
            id: "stop-g8",
            order: 1,
            category: "attraction",
            title: "Savoi Organic Spice Plantation Tour",
            durationMins: 150,
            estimatedCostInr: 700,
            recommendedTimeOfDay: "Morning",
            description: "Guided botanical walk through 200-year-old spice groves with traditional welcome garland and fresh herbal tea."
          },
          {
            id: "stop-g9",
            order: 2,
            category: "attraction",
            title: "Menezes Bragança Heritage House (Chandor)",
            durationMins: 90,
            estimatedCostInr: 300,
            recommendedTimeOfDay: "Afternoon",
            description: "The grandest historic private mansion in Goa, featuring crystal chandeliers, hand-carved teak, and a 4,000-book library."
          }
        ]
      },
      {
        dayNumber: 5,
        title: "Galgibaga Silence & Turtle Conservation",
        theme: "Untouched Shores & Farewell Feni Tasting",
        daySummary: "Spend the final day on the most peaceful beach in Goa where Olive Ridley turtles nest, followed by authentic artisanal feni tasting.",
        dailyEstimatedCostInr: 3900,
        stops: [
          {
            id: "stop-g10",
            order: 1,
            category: "relaxation",
            title: "Galgibaga Beach Walk",
            durationMins: 120,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Morning",
            description: "Casuarina pine trees, zero loud shacks, and pure ocean rhythm.",
            foodTips: "Visit Surya's Beach Shack for butter garlic red snapper."
          },
          {
            id: "stop-g11",
            order: 2,
            category: "food",
            title: "Artisanal Cashew Feni Tasting at Fazenda Cazulo",
            durationMins: 120,
            estimatedCostInr: 1500,
            recommendedTimeOfDay: "Sunset",
            description: "Learn about century-old pot-still distillation from local distillers paired with Goan tapas."
          }
        ]
      }
    ],
    hotels: [MOCK_HOTELS[0], MOCK_HOTELS[1]]
  },
  {
    id: "itin-ladakh-7d",
    slug: "ladakh-high-passes-pangong-nubra-expedition",
    title: "Ladakh High Passes: Cliff Monasteries, Milky Way & Sand Dunes",
    tagline: "The definitive 7-day high-altitude blueprint. Slow acclimatization, ancient Buddhist gompas, double-humped camel rides, and nights under 100,000 stars.",
    creatorId: "creator-1",
    creator: MOCK_CREATORS[0], // Aarav Mehta
    destinationId: "dest-ladakh",
    destinationName: "Leh Ladakh",
    isInternational: false,
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    durationDays: 7,
    budgetPerPersonInr: 36000,
    travelStyle: ["adventure", "culture", "nature", "solo"],
    travelerType: "Group of Friends",
    recommendedSeason: "June to September",
    publishedDate: "2026-08-20",
    status: "published",
    isFeatured: true,
    savesCount: 2310,
    viewsCount: 54200,
    introNotes: "Do not rush Ladakh. The biggest mistake travelers make is flying in and driving over Khardung La the next morning. Altitude sickness can end your trip on day two. This route guarantees smooth acclimatization in Leh before crossing the high passes into the Nubra Valley and Pangong Lake.",
    packingAndPracticalTips: [
      "Strict 36-hour rest rule upon landing at Leh Airport (3,524 meters). Avoid alcohol and smoking.",
      "Carry cash: ATMs outside Leh town frequently run dry or have satellite connection outages.",
      "Bring UV-polarized sunglasses, SPF 50 sunscreen, and a thermal windbreaker."
    ],
    days: [
      {
        dayNumber: 1,
        title: "Gentle Touchdown & Acclimatization",
        theme: "Rest, Hydration & Shanti Stupa Dusk",
        daySummary: "Land at Kushok Bakula Rimpochee Airport. Spend the day resting at your Leh hotel, sipping ginger honey tea.",
        dailyEstimatedCostInr: 2500,
        stops: [
          {
            id: "stop-l1",
            order: 1,
            category: "relaxation",
            title: "Strict Acclimatization Rest Window",
            durationMins: 300,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Morning",
            description: "Stay in your hotel room, drink at least 3 liters of water, and let your body adapt to the thinner oxygen."
          },
          {
            id: "stop-l2",
            order: 2,
            category: "viewpoint",
            title: "Shanti Stupa at Twilight",
            durationMins: 90,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Sunset",
            description: "Drive up (do not climb the 500 stairs on Day 1!) for panoramic views of Leh town bathed in amber evening light."
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Monasteries of the Indus Valley",
        theme: "Thiksey Gompa & Shey Palace",
        daySummary: "Witness morning chanting at Thiksey Monastery, known as Mini-Potala, and explore the ancient royal palace at Shey.",
        dailyEstimatedCostInr: 3200,
        stops: [
          {
            id: "stop-l3",
            order: 1,
            category: "attraction",
            title: "Thiksey Monastery Morning Prayer Assembly",
            durationMins: 150,
            estimatedCostInr: 50,
            recommendedTimeOfDay: "Morning",
            description: "Hear the reverberation of giant Tibetan brass horns (Dungchen) and sit quietly during monk breakfast chanting.",
            foodTips: "Tibetan Tsampa soup and butter tea at Thiksey Monastery Cafe."
          },
          {
            id: "stop-l4",
            order: 2,
            category: "attraction",
            title: "Shey Palace & Copper Buddha",
            durationMins: 75,
            estimatedCostInr: 50,
            recommendedTimeOfDay: "Afternoon",
            description: "The summer capital of ancient Ladakh kings housing a 12-meter-high gilded copper statue of Shakyamuni Buddha."
          }
        ]
      },
      {
        dayNumber: 3,
        title: "Over Khardung La into Nubra",
        theme: "17,582 ft Pass & Hunder Sand Dunes",
        daySummary: "Cross one of the highest motorable mountain passes in the world and descend into the fairytale dunes of Nubra Valley.",
        dailyEstimatedCostInr: 5800,
        stops: [
          {
            id: "stop-l5",
            order: 1,
            category: "viewpoint",
            title: "Khardung La Pass Summit Photo",
            durationMins: 30,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Morning",
            description: "Limit your stay at the top to 20-30 minutes due to low oxygen levels. Enjoy prayer flags fluttering in glacial winds."
          },
          {
            id: "stop-l6",
            order: 2,
            category: "activity",
            title: "Bactrian Double-Humped Camels at Hunder",
            durationMins: 90,
            estimatedCostInr: 600,
            recommendedTimeOfDay: "Sunset",
            description: "Silky white desert dunes flanked by snow-capped peaks. Historic Silk Route camel ride."
          }
        ]
      },
      {
        dayNumber: 4,
        title: "Turtuk — India's Last Border Village",
        theme: "Balti Culture, Apricot Orchards & K2 Vistas",
        daySummary: "Drive just 12 km from the Line of Control to Turtuk, a village incorporated into India in 1971, home to unique Balti people.",
        dailyEstimatedCostInr: 4500,
        stops: [
          {
            id: "stop-l7",
            order: 1,
            category: "attraction",
            title: "Turtuk Village Walking Trail & Royal House",
            durationMins: 180,
            estimatedCostInr: 100,
            recommendedTimeOfDay: "Morning",
            description: "Wooden bridges over glacial streams, stone houses with natural natural refrigeration, and royal family heirlooms.",
            foodTips: "Taste freshly plucked organic apricots and Balti buckwheat pancakes (Kisir)."
          }
        ]
      },
      {
        dayNumber: 5,
        title: "Nubra to Pangong via Shyok River",
        theme: "Offroad River Crossing & Endless Blue",
        daySummary: "Bypass Leh by taking the rugged Shyok river route directly to the iconic turquoise waters of Pangong Tso.",
        dailyEstimatedCostInr: 6200,
        stops: [
          {
            id: "stop-l8",
            order: 1,
            category: "attraction",
            title: "Pangong Tso First Viewpoint",
            durationMins: 120,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Afternoon",
            description: "Watch the lake shift from cobalt to turquoise to emerald green as cloud shadows pass overhead."
          },
          {
            id: "stop-l9",
            order: 2,
            category: "activity",
            title: "Milky Way Astrophotography Night",
            durationMins: 90,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Night",
            description: "With zero light pollution at 14,270 ft, the Galactic Core of the Milky Way is clearly visible to the naked eye."
          }
        ]
      },
      {
        dayNumber: 6,
        title: "Pangong Sunrise & Chang La Return",
        theme: "Glacial Reflections & Hemis Monastery",
        daySummary: "Early morning lakeside reflections followed by crossing Chang La pass back toward the Indus Valley.",
        dailyEstimatedCostInr: 4800,
        stops: [
          {
            id: "stop-l10",
            order: 1,
            category: "viewpoint",
            title: "Pangong Sunrise Reflection",
            durationMins: 60,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Morning",
            description: "Golden light hits the jagged peaks across the Tibetan border, mirrored perfectly in calm morning waters."
          },
          {
            id: "stop-l11",
            order: 2,
            category: "attraction",
            title: "Hemis Monastery Museum & Relics",
            durationMins: 120,
            estimatedCostInr: 100,
            recommendedTimeOfDay: "Afternoon",
            description: "The richest and largest monastery in Ladakh hidden inside a gorge, home to golden statues and centuries-old thangkas."
          }
        ]
      },
      {
        dayNumber: 7,
        title: "Leh Old Town & Souvenir Keepsakes",
        theme: "Pashmina Guilds, Apricot Oil & Goodbyes",
        daySummary: "Last-minute souvenir hunting in Leh bazaar for certified handwoven Pashmina shawls, dried apricots, and yak cheese.",
        dailyEstimatedCostInr: 3000,
        stops: [
          {
            id: "stop-l12",
            order: 1,
            category: "food",
            title: "Breakfast at Lala's Art Cafe",
            durationMins: 75,
            estimatedCostInr: 450,
            recommendedTimeOfDay: "Morning",
            description: "Historic Tibetan kitchen turned cozy art cafe nestled beneath the Leh Palace cliff."
          }
        ]
      }
    ],
    hotels: [MOCK_HOTELS[2], MOCK_HOTELS[3]]
  },
  {
    id: "itin-bali-6d",
    slug: "bali-sacred-waterfalls-and-cliffside-villas",
    title: "Bali Slow Escape: Sacred Springs, Rice Terraces & Uluwatu Cliffs",
    tagline: "An aesthetic 6-day Indonesian journey balancing Ubud's spiritual jungle sanctums with Uluwatu's dramatic oceanfront sundowners.",
    creatorId: "creator-3",
    creator: MOCK_CREATORS[2], // Rohan & Priya
    destinationId: "dest-bali",
    destinationName: "Bali (Ubud & Uluwatu)",
    isInternational: true,
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    durationDays: 6,
    budgetPerPersonInr: 45000,
    travelStyle: ["luxury", "romantic", "nature", "relaxation"],
    travelerType: "Honeymooners",
    recommendedSeason: "April to October",
    publishedDate: "2026-07-10",
    status: "published",
    isFeatured: true,
    savesCount: 1890,
    viewsCount: 41200,
    introNotes: "Bali can be overwhelming if you spend your days stuck in Seminyak traffic. We split this trip cleanly into 3 nights in the lush rainforests of Ubud followed by 3 nights perched above the ocean on Uluwatu's limestone cliffs.",
    packingAndPracticalTips: [
      "Bring water shoes for Tukad Cepung and Kanto Lampo waterfalls.",
      "Wear a sarong (provided or rented at temple gates) for sacred water cleansing at Tirta Empul.",
      "Watch your phone and sunglasses at Uluwatu Temple — monkeys are notoriously mischievous!"
    ],
    days: [
      {
        dayNumber: 1,
        title: "Ubud Jungle Arrival & Ridge Walk",
        theme: "Campuhan Greenery & Organic Dining",
        daySummary: "Check into your Ubud rainforest villa and take the famous Campuhan Ridge Walk as golden hour illuminates the palms.",
        dailyEstimatedCostInr: 4500,
        stops: [
          {
            id: "stop-b1",
            order: 1,
            category: "viewpoint",
            title: "Campuhan Ridge Walk",
            durationMins: 90,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Sunset",
            description: "Paved hilltop trail passing grass fields, river ravines, and charming boutique artist cafes."
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Sacred Cleansing & Sunlit Waterfalls",
        theme: "Tirta Empul Holy Bath & Tukad Cepung Cave",
        daySummary: "Participate in the ancient Balinese Melukat purification ritual and photograph sun rays piercing into a cavern waterfall.",
        dailyEstimatedCostInr: 5800,
        stops: [
          {
            id: "stop-b2",
            order: 1,
            category: "attraction",
            title: "Tirta Empul Water Temple Ritual",
            durationMins: 120,
            estimatedCostInr: 350,
            recommendedTimeOfDay: "Morning",
            description: "Step into holy spring water pools where each stone fountain represents a blessing of peace and purification."
          },
          {
            id: "stop-b3",
            order: 2,
            category: "attraction",
            title: "Tukad Cepung Hidden Cave Waterfall",
            durationMins: 100,
            estimatedCostInr: 250,
            recommendedTimeOfDay: "Afternoon",
            description: "Walk between canyon walls into a cave where the waterfall is illuminated by diagonal beams of sun."
          }
        ]
      },
      {
        dayNumber: 3,
        title: "Emerald Rice Terraces & Mount Batur",
        theme: "Tegallalang Valley & Coffee Roasters",
        daySummary: "Early morning wander through UNESCO-recognized subak irrigation terraces before the tour bus crowds arrive.",
        dailyEstimatedCostInr: 4900,
        stops: [
          {
            id: "stop-b4",
            order: 1,
            category: "attraction",
            title: "Tegallalang Rice Terraces Sunrise Stroll",
            durationMins: 120,
            estimatedCostInr: 200,
            recommendedTimeOfDay: "Morning",
            description: "Walk along narrow earthen ridges surrounded by towering coconut palms."
          }
        ]
      },
      {
        dayNumber: 4,
        title: "Relocate to Uluwatu Cliffs",
        theme: "Turquoise Waves & Clifftop Sunset",
        daySummary: "Drive south to the Bukit Peninsula. Check into your clifftop resort and relax on Thomas Beach.",
        dailyEstimatedCostInr: 6200,
        stops: [
          {
            id: "stop-b5",
            order: 1,
            category: "relaxation",
            title: "Thomas Beach Hidden Stairway",
            durationMins: 180,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Afternoon",
            description: "Quiet white sand beach framed by dramatic limestone cliffs with gentle swim-friendly waves."
          }
        ]
      },
      {
        dayNumber: 5,
        title: "Uluwatu Sunset & Chanted Fire Dance",
        theme: "Kecak Performance over the Ocean",
        daySummary: "Watch seventy chanting men perform the Ramayana epic as the orange sun sinks into the Indian Ocean.",
        dailyEstimatedCostInr: 7500,
        stops: [
          {
            id: "stop-b6",
            order: 1,
            category: "attraction",
            title: "Uluwatu Cliff Temple & Sunset Kecak",
            durationMins: 150,
            estimatedCostInr: 850,
            recommendedTimeOfDay: "Sunset",
            description: "Hypnotic rhythmic chanting without musical instruments set against the dramatic open sky."
          }
        ]
      },
      {
        dayNumber: 6,
        title: "Oceanfront Brunch & Farewell Souvenirs",
        theme: "Single Fin Balcony & Artisan Goods",
        daySummary: "Enjoy acai bowls overlooking world-class surfers before heading to Denpasar Airport.",
        dailyEstimatedCostInr: 3800,
        stops: [
          {
            id: "stop-b7",
            order: 1,
            category: "food",
            title: "Single Fin Surfer Terrace Brunch",
            durationMins: 90,
            estimatedCostInr: 1100,
            recommendedTimeOfDay: "Morning",
            description: "Fresh smoothie bowls, flat whites, and front-row seats to surfers carving through Uluwatu breaks."
          }
        ]
      }
    ],
    hotels: [MOCK_HOTELS[5]]
  },
  {
    id: "itin-kerala-6d",
    slug: "kerala-tea-gardens-misty-hills-and-backwater-canals",
    title: "Kerala Monsoons & Mist: Munnar Tea Valleys to Alleppey Canals",
    tagline: "Wake up to misty cardamom plantations, trek Kolukkumalai for sunrise, and drift through tranquil palm-shaded backwater villages.",
    creatorId: "creator-4",
    creator: MOCK_CREATORS[3], // Devika Nambiar
    destinationId: "dest-kerala",
    destinationName: "Munnar & Alleppey",
    isInternational: false,
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80",
    durationDays: 6,
    budgetPerPersonInr: 22000,
    travelStyle: ["nature", "family", "relaxation", "food"],
    travelerType: "Families",
    recommendedSeason: "September to March",
    publishedDate: "2026-08-01",
    status: "published",
    isFeatured: false,
    savesCount: 980,
    viewsCount: 22400,
    introNotes: "Kerala is best experienced through contrasting landscapes: the crisp, cold heights of the Western Ghats followed by the warm, slow waters of Vembanad Lake.",
    packingAndPracticalTips: [
      "Carry light woolens for Munnar evenings (temperatures drop to 12°C).",
      "Choose a village canoe over loud motorized boats to respect local wildlife and canal residents."
    ],
    days: [
      {
        dayNumber: 1,
        title: "Kochi to Munnar Scenic Drive",
        theme: "Cheeyappara Waterfalls & Tea Foothills",
        daySummary: "Arrive at Cochin Airport, drive through rubber plantations and tumbling roadside waterfalls into Munnar.",
        dailyEstimatedCostInr: 3200,
        stops: [
          {
            id: "stop-k1",
            order: 1,
            category: "attraction",
            title: "Cheeyappara Waterfall Stop",
            durationMins: 45,
            estimatedCostInr: 0,
            recommendedTimeOfDay: "Afternoon",
            description: "Seven-tiered waterfall cascading down rock steps right next to the highway."
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Highest Tea Peak — Kolukkumalai",
        theme: "Jeep Safari & Orthodox Tea Factory",
        daySummary: "4x4 rugged jeep climb to 7,900 feet for sunrise above a sea of clouds, followed by organic wood-fired tea factory tour.",
        dailyEstimatedCostInr: 4800,
        stops: [
          {
            id: "stop-k2",
            order: 1,
            category: "activity",
            title: "Kolukkumalai Sunrise 4x4 Expedition",
            durationMins: 240,
            estimatedCostInr: 2200,
            recommendedTimeOfDay: "Morning",
            description: "Bumpy ride through pristine private tea estates to the world's highest organic tea garden."
          }
        ]
      }
    ],
    hotels: [MOCK_HOTELS[4]]
  }
];

export const MOCK_VIDEOS: VideoClip[] = [
  {
    id: "video-1",
    creatorId: "creator-3",
    creator: MOCK_CREATORS[2], // Rohan & Priya
    destinationId: "dest-goa-south",
    destinationName: "South Goa",
    itinerarySlug: "south-goa-hidden-coves-and-feni-trails",
    title: "Secret Sea Cove in South Goa You Can Only Reach by Boat 🛶",
    caption: "Stop going to crowded Baga! Take a morning boat from Palolem to Butterfly Beach. Pure white sands, zero shacks, and dolphins along the way. Full 5-day route pinned in link! 👇",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
    likesCount: 14200,
    savesCount: 6800,
    durationSeconds: 24,
    tags: ["#SouthGoa", "#HiddenBeaches", "#IndiaTravel", "#CoupleTravel"]
  },
  {
    id: "video-2",
    creatorId: "creator-1",
    creator: MOCK_CREATORS[0], // Aarav Mehta
    destinationId: "dest-ladakh",
    destinationName: "Leh Ladakh",
    itinerarySlug: "ladakh-high-passes-pangong-nubra-expedition",
    title: "Waking Up at 14,000 Ft Next to Frozen Blue Pangong Lake 🌌",
    caption: "Zero light pollution. Pitch black night and the whole Milky Way blazing above you. Remember: acclimatize 36 hours before attempting this route! Full day-by-day stops and hotel in bio.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    likesCount: 28900,
    savesCount: 12400,
    durationSeconds: 32,
    tags: ["#Ladakh", "#PangongLake", "#Stargazing", "#RoadTrip"]
  },
  {
    id: "video-3",
    creatorId: "creator-3",
    creator: MOCK_CREATORS[2], // Rohan & Priya
    destinationId: "dest-bali",
    destinationName: "Bali",
    itinerarySlug: "bali-sacred-waterfalls-and-cliffside-villas",
    title: "The Most Magical Waterfall Cave in Ubud (Tukad Cepung) ✨",
    caption: "Arrive at 9:30 AM sharp when the sunbeams hit the canyon floor. Water is refreshing, no big crowds if you come early. Check our full 6-day Bali itinerary!",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    posterUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    likesCount: 19400,
    savesCount: 8900,
    durationSeconds: 19,
    tags: ["#BaliTravel", "#UbudWaterfalls", "#HiddenGems", "#TravelInspo"]
  },
  {
    id: "video-4",
    creatorId: "creator-4",
    creator: MOCK_CREATORS[3], // Devika Nambiar
    destinationId: "dest-kerala",
    destinationName: "Munnar",
    itinerarySlug: "kerala-tea-gardens-misty-hills-and-backwater-canals",
    title: "Sunrise Above the Clouds at Kolukkumalai (World's Highest Tea Estate) 🍃",
    caption: "Worth the 4:00 AM bumpy jeep ride 100%! Looking down at a blanket of white clouds with warm cardamom chai in your hands. Complete budget & driver details inside.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80",
    likesCount: 16100,
    savesCount: 7400,
    durationSeconds: 28,
    tags: ["#Kerala", "#MunnarHills", "#Kolukkumalai", "#NatureLover"]
  }
];

export const MOCK_APPLICATIONS: CreatorApplication[] = [
  {
    id: "app-1",
    userId: "user-new-1",
    applicantName: "Kabir Sengupta",
    email: "kabir.travels@gmail.com",
    socialLink: "https://instagram.com/kabir_wanderlust",
    contentNiche: "Offbeat Northeast India & Himalayan Treks",
    sampleWorkUrl: "https://youtube.com/watch?v=sample1",
    pitch: "I've led 15 expeditions across Meghalaya and Arunachal Pradesh. I want to publish comprehensive 8-day living root bridges and high pass itineraries with verified local tribal homestays.",
    status: "pending",
    submittedAt: "2026-10-24"
  },
  {
    id: "app-2",
    userId: "user-new-2",
    applicantName: "Meera Krishnan",
    email: "meera.culinary@outlook.com",
    socialLink: "https://instagram.com/meera_foodtrails",
    contentNiche: "Food & Heritage Trails across South India",
    sampleWorkUrl: "https://instagram.com/p/sample2",
    pitch: "Documenting Chettinad culinary secrets and Madurai street food history. Every stop has exact timings, spice levels, and legacy family stories.",
    status: "approved",
    submittedAt: "2026-10-18"
  }
];

export const MOCK_REPORTS: ContentReport[] = [
  {
    id: "rep-1",
    itemType: "itinerary",
    itemId: "itin-south-goa-5d",
    itemTitle: "Hidden South Goa Itinerary",
    reporterEmail: "traveler99@gmail.com",
    reason: "Outdated pricing/timings",
    details: "Savoi spice plantation entry is now ₹800 per person instead of ₹700, and buffet timings changed to 12:30 PM.",
    status: "open",
    timestamp: "2026-10-22"
  }
];

export const MOCK_AFFILIATE_CLICKS: AffiliateClickEvent[] = [
  {
    id: "clk-1",
    hotelId: "hotel-goa-1",
    hotelName: "Elsewhere Beach Cottages & Portuguese Mandrem",
    partnerName: "Booking.com Partner",
    itineraryId: "itin-south-goa-5d",
    timestamp: "2026-10-25 14:22:10",
    pricePerNightInr: 6800,
    estimatedCommissionInr: 408
  },
  {
    id: "clk-2",
    hotelId: "hotel-ladakh-1",
    hotelName: "The Grand Dragon Ladakh (Eco Luxury)",
    partnerName: "Booking.com Partner",
    itineraryId: "itin-ladakh-7d",
    timestamp: "2026-10-25 18:45:00",
    pricePerNightInr: 11500,
    estimatedCommissionInr: 690
  },
  {
    id: "clk-3",
    hotelId: "hotel-bali-1",
    hotelName: "Komaneka at Bisma Ubud",
    partnerName: "Agoda Affiliate",
    itineraryId: "itin-bali-6d",
    timestamp: "2026-10-26 09:12:44",
    pricePerNightInr: 14200,
    estimatedCommissionInr: 852
  }
];
