/**
 * Security & Sanitization Utilities
 */

/**
 * Basic email format validation
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 standard-compliant email regex
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

/**
 * Sanitizes input string to prevent script injection
 */
export function sanitizeInput(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // remove script tags and contents
    .replace(/<[^>]*>/g, '') // remove remaining complete HTML tags
    .trim();
}

/**
 * Client-side rate limiter for form submissions
 * @param {number} cooldownMs Cooldown time in milliseconds
 */
export function createRateLimiter(cooldownMs = 60000) {
  let lastSubmission = 0;
  return {
    canSubmit: () => {
      const now = Date.now();
      return now - lastSubmission >= cooldownMs;
    },
    recordSubmission: () => {
      lastSubmission = Date.now();
    },
    remainingCooldownSec: () => {
      const remaining = cooldownMs - (Date.now() - lastSubmission);
      return Math.max(0, Math.ceil(remaining / 1000));
    },
  };
}

/**
 * Obfuscates email for safe display to avoid naive harvester crawlers
 */
export function obfuscateEmail(email) {
  if (!email) return '';
  const [user, domain] = email.split('@');
  if (!domain) return email;
  return `${user} [at] ${domain}`;
}
