"use client";

import Script from "next/script";
import { MIXPANEL_TOKEN, initMixpanel } from "../lib/mixpanel";

export default function Mixpanel() {
  if (!MIXPANEL_TOKEN) {
    return null;
  }

  return (
    <Script
      id="mixpanel"
      strategy="afterInteractive"
      src="https://cdn.mixpanel.com/mixpanel-2-latest.min.js"
      onLoad={() => {
        if (typeof window !== "undefined" && window.mixpanel) {
          initMixpanel();
        }
      }}
    />
  );
}

