/**
 * Anonymous user identification for journey tracking
 * Generates and stores a persistent anonymous ID in localStorage
 */

const USER_ID_KEY = "devncode_anonymous_id";

/**
 * Generate a random anonymous ID
 * @returns {string} Random ID string
 */
function generateAnonymousId() {
  return `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Get or create anonymous user ID from localStorage
 * @returns {string|null} Anonymous user ID or null if localStorage unavailable
 */
export function getAnonymousUserId() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    let userId = localStorage.getItem(USER_ID_KEY);
    
    if (!userId) {
      userId = generateAnonymousId();
      localStorage.setItem(USER_ID_KEY, userId);
    }
    
    return userId;
  } catch (error) {
    // localStorage unavailable (private browsing, etc.)
    console.warn("Failed to access localStorage for user ID:", error);
    return null;
  }
}

/**
 * Identify user in Mixpanel with anonymous ID
 * Should be called after Mixpanel is initialized
 */
export function identifyUser() {
  if (typeof window === "undefined" || !window.mixpanel) {
    return;
  }

  try {
    const userId = getAnonymousUserId();
    if (userId && typeof window.mixpanel.identify === "function") {
      window.mixpanel.identify(userId);
      
      // Set user properties for better journey tracking
      window.mixpanel.people.set({
        "$name": "Anonymous User",
        "first_seen": new Date().toISOString(),
      });
    }
  } catch (error) {
    console.warn("Failed to identify user in Mixpanel:", error);
  }
}
