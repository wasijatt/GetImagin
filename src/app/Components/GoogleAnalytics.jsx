"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  CONSENT_STORAGE_KEY,
  isAnalyticsEnabled,
  pageview,
} from "../lib/analytics";

/**
 * RouteTracker listens for route changes in the Next.js App Router
 * and dispatches a page_view event to GA4.
 */
function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const queryString = searchParams?.toString();
    const fullUrl = queryString ? `${pathname}?${queryString}` : pathname;
    pageview(fullUrl, document.title);
  }, [pathname, searchParams]);

  return null;
}

/**
 * GoogleAnalytics Component
 * - Implements Google Consent Mode v2 with default denied state.
 * - Restores prior consent from localStorage if granted.
 * - Loads official gtag.js asynchronously without blocking rendering.
 * - Only loads remote gtag in production (or when NEXT_PUBLIC_ENABLE_ANALYTICS is true).
 * - Tracks SPA client-side route transitions.
 */
export default function GoogleAnalytics() {
  const enabled = isAnalyticsEnabled();

  return (
    <>
      {/* Route tracking wrapped in Suspense to preserve Next.js static generation */}
      <Suspense fallback={null}>
        <AnalyticsRouteTracker />
      </Suspense>

      {/* Only load GA4 scripts in production (or if explicitly enabled) */}
      {enabled && (
        <>
          {/* Initialize DataLayer and Google Consent Mode v2 */}
          <Script
            id="google-analytics-consent-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                // Default consent settings (Consent Mode v2)
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'wait_for_update': 500
                });

                // Restore previously granted consent if existing
                try {
                  var saved = localStorage.getItem('${CONSENT_STORAGE_KEY}');
                  if (saved === 'granted') {
                    gtag('consent', 'update', {
                      'analytics_storage': 'granted',
                      'ad_storage': 'granted',
                      'ad_user_data': 'granted',
                      'ad_personalization': 'granted'
                    });
                  }
                } catch(e) {}

                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  send_page_view: false
                });
              `,
            }}
          />

          {/* Asynchronously load official Google gtag.js */}
          <Script
            id="google-analytics-gtag"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
        </>
      )}
    </>
  );
}
