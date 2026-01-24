// City extraction patterns - shared across client and server
export const CITY_PATTERNS = [
  { pattern: /\bKarachi\b/i, city: "Karachi" },
  { pattern: /\bLahore\b/i, city: "Lahore" },
  { pattern: /\bIslamabad\b/i, city: "Islamabad" },
  { pattern: /\bPeshawar\b/i, city: "Peshawar" },
  { pattern: /\bHyderabad\b/i, city: "Hyderabad" },
  { pattern: /\bAbbottabad\b/i, city: "Abbottabad" },
  { pattern: /\bSahiwal\b/i, city: "Sahiwal" },
  { pattern: /\bRawalpindi\b/i, city: "Rawalpindi" },
  { pattern: /\bQuetta\b/i, city: "Quetta" },
  { pattern: /\bFaisalabad\b/i, city: "Faisalabad" },
  { pattern: /\bMultan\b/i, city: "Multan" },
];

/**
 * Extract city name from a title string
 * @param {string} title - The title to search for city names
 * @returns {string|null} - The city name if found, null otherwise
 */
export function extractCity(title) {
  if (!title || typeof title !== "string") {
    return null;
  }

  for (const { pattern, city } of CITY_PATTERNS) {
    if (pattern.test(title)) {
      return city;
    }
  }

  return null;
}
