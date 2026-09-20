/**
 * Privacy-friendly, cookie-free analytics helper
 * Works with Plausible, Cloudflare Web Analytics, or standard custom event logs.
 */

export function trackEvent(eventName, properties = {}) {
  try {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props: properties });
    }
    // Debug logging in development
    if (import.meta.env.DEV) {
      console.log(`[Analytics] ${eventName}:`, properties);
    }
  } catch (err) {
    console.debug('[Analytics Error]', err);
  }
}

export function trackPageView(pagePath = window.location.pathname) {
  trackEvent('pageview', { path: pagePath });
}
