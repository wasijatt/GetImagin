"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredConsent, updateConsent } from "../lib/analytics";

/**
 * CookieConsent Component
 * - Displays a consent banner if the visitor has not made a choice yet.
 * - Updates Google Consent Mode v2 upon Accept / Decline.
 * - Allows reopening via custom window event: 'getimagin_open_cookie_consent'.
 */
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user already set their consent preference
    const stored = getStoredConsent();
    if (!stored) {
      // Small timeout for smooth entry animation
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Allow triggering the banner again from a footer "Cookie Settings" link
    const handleReopen = () => setShowBanner(true);
    window.addEventListener("getimagin_open_cookie_consent", handleReopen);
    return () =>
      window.removeEventListener("getimagin_open_cookie_consent", handleReopen);
  }, []);

  const handleAccept = () => {
    updateConsent("granted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    updateConsent("denied");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#141414]/95 border border-white/15 backdrop-blur-xl rounded-2xl p-5 shadow-2xl text-white">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0 text-lg">
            🍪
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-white tracking-wide">
              Cookie & Analytics Privacy
            </h4>
            <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
              We use analytics cookies to measure site engagement and improve
              our creative tools. In compliance with privacy standards,
              analytics tracking is disabled until you give consent.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-white/10">
          <Link
            href="/privacy-policy"
            className="text-[11px] text-neutral-400 hover:text-white underline underline-offset-4 transition"
          >
            Privacy Policy
          </Link>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-initial text-xs px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 font-medium transition cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-initial text-xs px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold transition shadow-md cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
