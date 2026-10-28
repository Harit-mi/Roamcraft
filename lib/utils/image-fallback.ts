/**
 * Standard inline SVG placeholder fallback for travel destinations, itineraries, and accommodations.
 * Renders an elegant warm cream & charcoal placeholder when an external image is unavailable or offline.
 */
export const FALLBACK_IMAGE_URL = 
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" fill="none">
      <rect width="800" height="500" fill="#F4EFEA"/>
      <circle cx="400" cy="220" r="48" fill="#E8DED2"/>
      <path d="M375 220 L400 185 L425 220 Z" fill="#C85A32"/>
      <path d="M400 220 L425 255 L400 240 L375 255 Z" fill="#2D4A3E"/>
      <circle cx="400" cy="220" r="6" fill="#FFFFFF"/>
      <text x="400" y="310" text-anchor="middle" fill="#78716C" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" letter-spacing="1">
        ROAMCRAFT TRAVEL CURATION
      </text>
    </svg>
  `);

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (target.src !== FALLBACK_IMAGE_URL) {
    target.src = FALLBACK_IMAGE_URL;
  }
}
