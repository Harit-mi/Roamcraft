"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/app-context";
import { 
  SparklesIcon as Sparkles, 
  CheckIcon as CheckCircle2, 
  ArrowRightIcon as ArrowRight, 
  ShieldCheckIcon as ShieldCheck, 
  HeartIcon as HeartHandshake 
} from "@/components/shared/icons";

export default function CreatorApplyPage() {
  const { submitCreatorApplication, role, setRole } = useApp();

  const [applicantName, setApplicantName] = useState("");
  const [email, setEmail] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [contentNiche, setContentNiche] = useState("High-Altitude Treks & Roadtrips");
  const [sampleWorkUrl, setSampleWorkUrl] = useState("");
  const [pitch, setPitch] = useState("");
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !email || !agreedToGuidelines) return;

    submitCreatorApplication({
      userId: "user-new-application",
      applicantName,
      email,
      socialLink: socialLink || "https://instagram.com/my_travels",
      contentNiche,
      sampleWorkUrl: sampleWorkUrl || "https://youtube.com/my_travel_vlog",
      pitch: pitch || "Experienced explorer wanting to share verified day-by-day routes.",
    });

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ochre-50 text-ochre-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-ochre-600" />
            Creator Network Application
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
            Publish Field-Tested Travel Blueprints
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1 leading-relaxed">
            RoamCraft is curated for creators who document real travel details — timings, local transit, food recommendations, and budget transparency. Verification is reviewed by our editorial team.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 bg-forest-50 border border-forest-100 rounded-2xl text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-forest-700 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-charcoal-900">
              Application Submitted Successfully!
            </h3>
            <p className="text-xs text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{applicantName}</strong>. Your profile has been queued for editorial review. In the meantime, you can explore the Creator Studio in demo mode to preview how itineraries are published.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setRole("creator");
                }}
                className="px-5 py-2.5 rounded-xl bg-forest-700 text-white text-xs font-bold hover:bg-forest-800 transition-colors"
              >
                Switch to Creator Persona & Studio →
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Maya Iyer"
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-forest-700"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. maya.travels@gmail.com"
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-forest-700"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Primary Social Profile (Instagram / YouTube / Blog)
                </label>
                <input
                  type="url"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-forest-700"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Travel Specialization / Niche
                </label>
                <select
                  value={contentNiche}
                  onChange={(e) => setContentNiche(e.target.value)}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-charcoal-900"
                >
                  <option value="High-Altitude Treks & Roadtrips">High-Altitude Treks & Roadtrips</option>
                  <option value="Heritage Havelis & Culture">Heritage Havelis & Royal Culture</option>
                  <option value="Coastal Slow Travel & Cafes">Coastal Slow Living & Cafes</option>
                  <option value="Culinary & Street Food Trails">Culinary & Street Food Trails</option>
                  <option value="Budget Backpacking & Hostels">Budget Backpacking & Hostels</option>
                  <option value="Luxury Villas & Honeymoons">Luxury Boutique Escapes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">
                Link to Sample Work (Photo Series, Travel Reel, or Article)
              </label>
              <input
                type="url"
                value={sampleWorkUrl}
                onChange={(e) => setSampleWorkUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or reel link"
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-charcoal-900 focus:outline-none focus:border-forest-700"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">
                Why do you want to publish on RoamCraft?
              </label>
              <textarea
                rows={3}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="Tell us about the destinations you know intimately and what makes your itineraries valuable..."
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-charcoal-900 focus:outline-none"
                required
              />
            </div>

            {/* Verification and Rights Confirmation */}
            <div className="p-4 bg-canvas-subtle rounded-2xl border border-stone-200 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToGuidelines}
                  onChange={(e) => setAgreedToGuidelines(e.target.checked)}
                  className="mt-1 accent-forest-700"
                  required
                />
                <span className="text-xs text-charcoal-700 leading-relaxed">
                  I confirm that all published photography, video footage, and trip recommendations are my own original content or properly licensed, and that I will disclose any sponsored brand arrangements in accordance with ASCI/FTC rules.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Submit Creator Application for Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
