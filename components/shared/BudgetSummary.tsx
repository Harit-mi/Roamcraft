"use client";

import React, { useState } from "react";
import { UsersIcon, RupeeIcon, InfoIcon, ShieldCheckIcon } from "@/components/shared/icons";

interface BudgetSummaryProps {
  budgetPerPersonInr: number;
  partySize?: number;
  durationDays: number;
  currencyCode?: string;
}

export function BudgetSummary({
  budgetPerPersonInr,
  partySize: initialPartySize = 2,
  durationDays,
  currencyCode = "INR",
}: BudgetSummaryProps) {
  const [partySize, setPartySize] = useState(initialPartySize);
  const totalTripCost = budgetPerPersonInr * partySize;

  // Breakdown percentages based on typical Indian & International leisure travel data
  const stayEst = Math.round(budgetPerPersonInr * 0.45);
  const foodEst = Math.round(budgetPerPersonInr * 0.25);
  const transitEst = Math.round(budgetPerPersonInr * 0.15);
  const activityEst = Math.round(budgetPerPersonInr * 0.15);

  return (
    <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E7DFD5] shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD5]">
        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#C2542D] block">
            FINANCIAL ESTIMATION
          </span>
          <h4 className="font-serif font-bold text-lg text-[#181614]">Expedition Ledger</h4>
        </div>
        <div className="text-right">
          <span className="font-mono text-[9px] text-[#78716C] uppercase block">Total ({partySize} Pax)</span>
          <span className="font-mono font-bold text-xl text-[#C2542D] budget-total-cost">
            ₹{totalTripCost.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Interactive Party Size Stepper */}
      <div className="flex items-center justify-between py-2 px-3 bg-[#F2EDE4] rounded-xl border border-[#E7DFD5]">
        <span className="font-mono text-xs font-semibold text-[#181614] flex items-center gap-1.5 uppercase tracking-wider">
          <UsersIcon size={14} className="text-[#C2542D]" />
          <span>Party Count:</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPartySize(prev => Math.max(1, prev - 1))}
            disabled={partySize <= 1}
            className="btn-editorial-stepper"
            aria-label="Decrease travelers"
          >
            -
          </button>
          <span className="font-mono text-xs font-bold w-6 text-center text-[#181614]">
            {partySize}
          </span>
          <button
            type="button"
            onClick={() => setPartySize(prev => Math.min(12, prev + 1))}
            disabled={partySize >= 12}
            className="btn-editorial-stepper"
            aria-label="Increase travelers"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-2.5 text-xs font-mono">
        <div className="flex items-center justify-between text-[#57534E]">
          <span>Lodging (Boutique / Homestays):</span>
          <span className="font-semibold text-[#181614]">
            ₹{(stayEst * partySize).toLocaleString("en-IN")}{" "}
            <span className="text-[#78716C] font-normal">(₹{stayEst.toLocaleString("en-IN")}/pax)</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-[#57534E]">
          <span>Food, Local Cafés & Markets:</span>
          <span className="font-semibold text-[#181614]">
            ₹{(foodEst * partySize).toLocaleString("en-IN")}{" "}
            <span className="text-[#78716C] font-normal">(₹{foodEst.toLocaleString("en-IN")}/pax)</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-[#57534E]">
          <span>Local Transit (Scooter/Taxi):</span>
          <span className="font-semibold text-[#181614]">
            ₹{(transitEst * partySize).toLocaleString("en-IN")}{" "}
            <span className="text-[#78716C] font-normal">(₹{transitEst.toLocaleString("en-IN")}/pax)</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-[#57534E]">
          <span>Sight Entry, Permits & Ferries:</span>
          <span className="font-semibold text-[#181614]">
            ₹{(activityEst * partySize).toLocaleString("en-IN")}{" "}
            <span className="text-[#78716C] font-normal">(₹{activityEst.toLocaleString("en-IN")}/pax)</span>
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-[#E7DFD5] text-[10px] font-mono text-[#78716C] leading-relaxed">
        Calculated for an estimated {durationDays}-day ground route. Figures are realistic field approximations, excluding long-distance flights.
      </div>
    </div>
  );
}
