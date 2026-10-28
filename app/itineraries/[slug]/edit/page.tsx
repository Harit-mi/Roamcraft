"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useApp } from "@/lib/context/app-context";
import { ItineraryEditor } from "@/components/editor/ItineraryEditor";
import Link from "next/link";
import { AlertCircleIcon as AlertCircle, ArrowLeftIcon as ArrowLeft } from "@/components/shared/icons";

export default function EditItineraryPage() {
  const params = useParams();
  const idOrSlug = (params?.slug || params?.id) as string;
  const { itineraries } = useApp();

  const itinerary = itineraries.find((i) => i.id === idOrSlug || i.slug === idOrSlug);

  if (!itinerary) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-cream-200 text-charcoal-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6 text-terracotta" />
        </div>
        <h2 className="text-xl font-bold text-charcoal-900">Itinerary Not Found</h2>
        <p className="text-xs text-charcoal-600">
          The requested itinerary could not be found for editing.
        </p>
        <Link
          href="/itineraries"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-terracotta text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Itineraries</span>
        </Link>
      </div>
    );
  }

  return <ItineraryEditor initialItinerary={itinerary} mode="edit" />;
}
