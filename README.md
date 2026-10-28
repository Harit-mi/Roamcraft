# RoamCraft — The Independent Travel Journal & Field Gazette

> **Curated creator itineraries, ground-verified field footage, and handpicked boutique accommodations across India and beyond.**

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## Overview

RoamCraft connects travelers directly to ground-level creator expertise. Rather than generic agency tours or sponsored algorithm feeds, RoamCraft delivers structured, day-by-day expedition blueprints complete with:
- **Verified Creator Routes**: Day-by-day timelines with sequence numerals, recommended duration, transit advice, and realistic daily ground costs in INR (₹).
- **Cinematic Vertical Video Reels**: Direct reel-to-itinerary discovery linking short-form creator dispatches with complete actionable trip blueprints.
- **Boutique Accommodations & Affiliate Stays**: Transparent partner links, price-per-night breakdowns, and clear legal disclosures.
- **Interactive Trip Planner & Studio**: Drag-and-drop / keyboard-accessible stop builder, party size budget recalculation, and personal dossier saving.
- **Editorial Design System**: Typography powered by **Fraunces** (display serif), **DM Sans** (humanist interface), and **DM Mono** (archival stamps), paired with 34 custom Flaticon-curated line icons.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: Fraunces (Variable Display Serif), DM Sans (Humanist Sans), DM Mono (Tabular Monospace)
- **Iconography**: Custom SVG Icon System inspired by Flaticon / Freepik Lineal Travel Collection
- **Testing**: Automated end-to-end interactive suite with Puppeteer

---

## Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Editorial Cover Spread, Hero Search Index, Trending Regions & Lead Routes |
| `/discover` | Expedition Search, Filter Drawer, Video Reels & Curated Collections |
| `/destinations` | Regional Archives & Geographic Sphere index |
| `/destinations/[slug]` | Deep Regional Field Guides (e.g. South Goa, Ladakh, Kerala, Bali) |
| `/itineraries` | Master Itinerary Library with multi-attribute filtering & sorting |
| `/itineraries/[slug]` | Comprehensive Day-by-Day Timeline, Stops, Budget Ledger & Map |
| `/itineraries/create` | Interactive Itinerary Builder (Days, Stops, Notes, Photos) |
| `/itineraries/[id]/edit` | Itinerary Editor for published and draft blueprints |
| `/videos` & `/videos/[id]` | Dedicated Vertical Video Player with attached Itinerary links |
| `/creators` & `/creators/[username]` | Explorers Guild Registry & Creator Dossiers |
| `/my-trips` | Personal Travel Journal & Custom Blueprints |
| `/saved` | Saved Dispatches & Inspiration Archive |
| `/studio` | Creator Publishing Desk & Circulation Analytics |
| `/profile` | Traveler Preferences & Settings |

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Harit-mi/Roamcraft.git

# Navigate into the project
cd Roamcraft

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## License

This project is licensed under the MIT License.
Icons designed by Freepik from [Flaticon](https://www.flaticon.com/).
