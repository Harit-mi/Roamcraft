"use client";

import React, { useState } from "react";
import { 
  ShareIcon as Share2, 
  CheckIcon as Check, 
  CopyIcon as Copy, 
  XIcon as X, 
  ArrowRightIcon as Send,
  MessageCircleIcon as MessageCircle
} from "@/components/shared/icons";

interface ShareModalProps {
  title: string;
  url?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ title, url, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title,
        text: `Check out this creator itinerary on RoamCraft: ${title}`,
        url: shareUrl,
      }).catch(() => {});
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Check out this travel itinerary: ${title} - ${shareUrl}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-cream-50 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-cream-300 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-cream-200 transition-colors"
          aria-label="Close share dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-11 h-11 rounded-2xl bg-terracotta-100 text-terracotta flex items-center justify-center mb-3">
          <Share2 className="w-5 h-5" />
        </div>

        <h3 className="font-bold text-lg text-charcoal-900">Share Itinerary</h3>
        <p className="text-xs text-charcoal-600 mt-1 mb-4">
          Send this creator-tested travel plan to friends, family, or travel partners.
        </p>

        {/* Copy Link field */}
        <div className="space-y-1.5 mb-4">
          <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
            Trip Link
          </label>
          <div className="flex items-center gap-2 p-1.5 bg-white border border-cream-300 rounded-xl">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-xs text-charcoal-800 px-2 font-mono truncate focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick share channels */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          {typeof navigator !== "undefined" && typeof navigator.share === "function" ? (
            <button
              onClick={handleNativeShare}
              className="p-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-charcoal-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-terracotta" />
              <span>More Apps</span>
            </button>
          ) : (
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-charcoal-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-charcoal-600" />
              <span>Copy Link</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
