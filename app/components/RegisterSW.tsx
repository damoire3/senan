"use client";

import { useEffect } from "react";

/** Enregistre le service worker sur toutes les pages (site + app). */
export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
