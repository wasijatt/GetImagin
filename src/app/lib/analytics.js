/**
 * Google Analytics 4 (GA4) Utility Library
 *
 * Provides GA4 event dispatchers, SPA page view tracking,
 * and Google Consent Mode v2 updates.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-1K8PGHEEN4";

export const CONSENT_STORAGE_KEY = "getimagin_cookie_consent";

/**
 * Checks whether analytics is enabled.
 * Defaults to true only in production, or when NEXT_PUBLIC_ENABLE_ANALYTICS === "true".
 */
export const isAnalyticsEnabled = () => {
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true") {
    return true;
  }
  return process.env.NODE_ENV === "production";
};

/**
 * Sends a page_view event to GA4 on SPA route changes.
 * @param {string} url - Current page path or pathname + query
 * @param {string} [title] - Page document title
 */
export const pageview = (url, title) => {
  if (typeof window === "undefined") return;

  if (!isAnalyticsEnabled()) {
    console.debug(`[GA4 Debug: PageView]`, {
      url,
      title: title || (typeof document !== "undefined" ? document.title : ""),
    });
    return;
  }

  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: title || (typeof document !== "undefined" ? document.title : ""),
      send_to: GA_MEASUREMENT_ID,
    });
  }
};

/**
 * Generic GA4 custom event tracker with production check.
 * @param {string} action - Event name (e.g. 'button_click', 'form_submit')
 * @param {Record<string, any>} [params] - Event parameters
 */
export const trackEvent = (action, params = {}) => {
  if (typeof window === "undefined") return;

  if (!isAnalyticsEnabled()) {
    console.debug(`[GA4 Debug: Event]`, action, params);
    return;
  }

  if (window.gtag) {
    window.gtag("event", action, params);
  }
};

/**
 * Track button click events.
 * @param {string} buttonName
 * @param {Record<string, any>} [params]
 */
export const trackButtonClick = (buttonName, params = {}) => {
  trackEvent("button_click", {
    button_name: buttonName,
    ...params,
  });
};

/**
 * Track form submissions (e.g., contact form, inquiry form, newsletter).
 * @param {string} formName
 * @param {Record<string, any>} [params]
 */
export const trackFormSubmit = (formName, params = {}) => {
  trackEvent("form_submit", {
    form_name: formName,
    ...params,
  });
};

/**
 * Track outbound link clicks (external links).
 * @param {string} url
 * @param {string} [label]
 * @param {Record<string, any>} [params]
 */
export const trackOutboundLink = (url, label = "", params = {}) => {
  trackEvent("click", {
    outbound: true,
    link_url: url,
    link_text: label,
    ...params,
  });
};

/**
 * Track tool or calculator usage (e.g., Image Compressor, Bill Checker, Vectorizer).
 * @param {string} toolName
 * @param {Record<string, any>} [params]
 */
export const trackToolUsed = (toolName, params = {}) => {
  trackEvent("tool_used", {
    tool_name: toolName,
    ...params,
  });
};

/**
 * Track calculator usage specifically.
 * @param {string} calculatorName
 * @param {Record<string, any>} [params]
 */
export const trackCalculatorUsed = (calculatorName, params = {}) => {
  trackEvent("calculator_used", {
    calculator_name: calculatorName,
    ...params,
  });
};

/**
 * Track language or locale switch.
 * @param {string} language
 * @param {Record<string, any>} [params]
 */
export const trackLanguageSwitch = (language, params = {}) => {
  trackEvent("language_switch", {
    language,
    ...params,
  });
};

/**
 * Updates Google Consent Mode v2.
 * @param {'granted' | 'denied'} status
 */
export const updateConsent = (status) => {
  if (typeof window === "undefined") return;

  const isGranted = status === "granted";
  const consentState = isGranted ? "granted" : "denied";

  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: consentState,
      ad_storage: consentState,
      ad_user_data: consentState,
      ad_personalization: consentState,
    });
  }

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, consentState);
  } catch (e) {
    console.warn("Unable to save cookie consent to localStorage:", e);
  }

  // Dispatch custom window event so listeners can react immediately
  window.dispatchEvent(
    new CustomEvent("getimagin_consent_updated", {
      detail: { status: consentState },
    })
  );
};

/**
 * Retrieves the stored consent status from localStorage.
 * @returns {'granted' | 'denied' | null}
 */
export const getStoredConsent = () => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch (e) {
    return null;
  }
};
