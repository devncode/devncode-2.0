"use client";

import { useEffect } from "react";
import { event } from "../lib/mixpanel";
import { EVENT_CATEGORIES, EVENT_ACTIONS, EVENT_LABELS } from "../lib/analytics";

export default function PageViewTracker({ label }) {
  useEffect(() => {
    if (label) {
      event({
        action: EVENT_ACTIONS.NAVIGATE,
        category: EVENT_CATEGORIES.ENGAGEMENT,
        label,
      });
    }
  }, [label]);

  return null;
}

