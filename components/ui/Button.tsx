import React, { forwardRef } from "react";
import { ArrowRightIcon } from "@/components/shared/icons";

export type ButtonVariant =
  | "primary"       // Deep ink (#181614) with subtle cedar hover (#263D33)
  | "cta"           // Sunbaked Terracotta (#C2542D) with dark clay hover (#A94320)
  | "secondary"     // Warm parchment (#FAF7F2) with fine sandstone border (#E7DFD5)
  | "tertiary"      // Subtle text/borderless action with hover background tint
  | "ghost"         // Transparent container, muted text, fine border
  | "destructive"   // Crimson warning action for removals/deletions
  | "icon";         // Square/round utility action (bookmarks, share, controls)

export type ButtonSize =
  | "sm"  // 32px height, 12px text, compact
  | "md"  // 40px/44px height, 14px text, standard touch-accessible
  | "lg"; // 48px/52px height, 16px text, hero CTA

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  withArrow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      withArrow = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // ── Variant style definitions ─────────────────────────────────────────
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-[#181614] text-[#FAF7F2] border border-[#181614] hover:bg-[#263D33] hover:border-[#263D33] shadow-[0_1px_2px_rgba(24,22,20,0.12)] active:scale-[0.98]",
      cta:
        "bg-[#C2542D] text-white border border-[#C2542D] hover:bg-[#A94320] hover:border-[#A94320] shadow-[0_1px_3px_rgba(194,84,45,0.22)] active:scale-[0.98]",
      secondary:
        "bg-[#FAF7F2] text-[#181614] border border-[#E7DFD5] hover:bg-white hover:border-[#181614]/30 shadow-[0_1px_2px_rgba(24,22,20,0.03)] active:scale-[0.98]",
      tertiary:
        "bg-transparent text-[#181614] border border-transparent hover:bg-[#F2EDE4] active:scale-[0.98]",
      ghost:
        "bg-transparent text-[#57534E] border border-[#E7DFD5] hover:bg-[#F2EDE4] hover:text-[#181614] active:scale-[0.98]",
      destructive:
        "bg-white text-red-700 border border-red-200 hover:bg-red-50 hover:border-red-300 active:scale-[0.98]",
      icon:
        "bg-[#FAF7F2] text-[#44403C] border border-[#E7DFD5] hover:bg-white hover:border-[#181614]/30 shadow-[0_1px_2px_rgba(24,22,20,0.03)] active:scale-95 rounded-full",
    };

    // ── Size style definitions ────────────────────────────────────────────
    const sizeStyles: Record<ButtonSize, string> = {
      sm: variant === "icon" ? "w-8 h-8 p-0" : "h-8 px-3.5 text-xs rounded-md",
      md: variant === "icon" ? "w-10 h-10 p-0" : "h-10 px-5 text-sm rounded-lg",
      lg: variant === "icon" ? "w-12 h-12 p-0" : "h-12 px-7 text-base rounded-xl",
    };

    // ── Base classes ──────────────────────────────────────────────────────
    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C2542D] disabled:opacity-40 disabled:pointer-events-none";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {withArrow && <ArrowRightIcon size={size === "sm" ? 14 : 16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
