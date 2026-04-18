import { useState, useEffect } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
type UtmData = Record<UtmKey, string>;

const SESSION_KEY = "moonglade_utm";

/**
 * Reads UTM parameters from the URL on first landing and persists them to
 * sessionStorage so they survive internal navigation within the same session.
 * On pages where the URL has no UTM params, falls back to the stored values.
 */
export function useUtm(): UtmData {
  const [utmData, setUtmData] = useState<UtmData>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const fromUrl: Partial<UtmData> = {};

    UTM_KEYS.forEach((key) => {
      const val = params.get(key);
      if (val) fromUrl[key] = val;
    });

    const hasUtmInUrl = Object.keys(fromUrl).length > 0;

    if (hasUtmInUrl) {
      // Fresh UTMs in the URL — save them to sessionStorage
      const merged: UtmData = { utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "" };
      UTM_KEYS.forEach((key) => {
        merged[key] = fromUrl[key] ?? "";
      });
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(merged));
      setUtmData(merged);
    } else {
      // No UTMs in URL — try sessionStorage (user navigated from a UTM landing page)
      try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        if (stored) {
          const parsed: UtmData = JSON.parse(stored);
          setUtmData(parsed);
        }
      } catch {
        // sessionStorage unavailable or corrupted — silently ignore
      }
    }
  }, []);

  return utmData;
}
