// Event tracking constants and helpers
export const EVENT_ACTIONS = {
  CLICK: "click",
  NAVIGATE: "navigate",
  TOGGLE_THEME: "toggle_theme",
  TOGGLE_MENU: "toggle_menu",
};

export const EVENT_CATEGORIES = {
  ENGAGEMENT: "engagement",
  NAVIGATION: "navigation",
  SOCIAL: "social",
};

export const EVENT_LABELS = {
  // Header events
  JOIN_COMMUNITY_HEADER: "Join Community (Header)",
  JOIN_COMMUNITY_MOBILE: "Join Community (Mobile Menu)",
  OVERVIEW_LINK_MOBILE: "Overview Link (Mobile)",
  HITTING_AI_LINK_MOBILE: "Hitting the AI Link (Mobile)",
  THEME_DARK: "dark",
  THEME_LIGHT: "light",
  MENU_OPEN: "open",
  MENU_CLOSE: "close",
  // Registration events
  REGISTRATION_PAGE_VIEW: "Registration Page View",
  REGISTRATION_FORM_LOADED: "Registration Form Loaded",
  REGISTRATION_FORM_SUBMITTED: "Registration Form Submitted",
  TALLY_SCRIPT_LOADED: "Tally Script Loaded",
};

// Pre-configured event creators for common events
export const trackJoinCommunity = (location = "Header") => ({
  action: EVENT_ACTIONS.CLICK,
  category: EVENT_CATEGORIES.ENGAGEMENT,
  label: location === "Header" 
    ? EVENT_LABELS.JOIN_COMMUNITY_HEADER 
    : EVENT_LABELS.JOIN_COMMUNITY_MOBILE,
});

export const trackThemeToggle = (currentTheme) => ({
  action: EVENT_ACTIONS.TOGGLE_THEME,
  category: EVENT_CATEGORIES.ENGAGEMENT,
  label: currentTheme === "light" ? EVENT_LABELS.THEME_DARK : EVENT_LABELS.THEME_LIGHT,
});

export const trackMenuToggle = (isOpen) => ({
  action: EVENT_ACTIONS.TOGGLE_MENU,
  category: EVENT_CATEGORIES.NAVIGATION,
  label: isOpen ? EVENT_LABELS.MENU_CLOSE : EVENT_LABELS.MENU_OPEN,
});

export const trackNavigation = (label) => ({
  action: EVENT_ACTIONS.NAVIGATE,
  category: EVENT_CATEGORIES.NAVIGATION,
  label,
});

export const trackSocialClick = (socialName) => ({
  action: EVENT_ACTIONS.CLICK,
  category: EVENT_CATEGORIES.SOCIAL,
  label: socialName,
});

