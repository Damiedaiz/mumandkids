"use client";
import { useEffect } from "react";

export default function PixelTracker({ event, payload }: { event: string, payload: any }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq('track', event, payload);
    }
  }, [event, payload]);
  return null;
}