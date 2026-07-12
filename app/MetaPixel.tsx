"use client";

import Script from "next/script";
import { useEffect } from "react";

const META_PIXEL_ID = "2140373103194475";

type MetaFbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => number;
};

declare global {
  interface Window {
    fbq?: MetaFbq;
    _fbq?: MetaFbq;
    __metaPixelPageViewTracked?: boolean;
  }
}

export default function MetaPixel() {
  useEffect(() => {
    if (!window.fbq) {
      const fbq = ((...args: unknown[]) => {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue.push(args);
      }) as MetaFbq;

      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.push = (...args: unknown[]) => fbq.queue.push(args);
      window.fbq = fbq;
      window._fbq = fbq;
    }

    if (window.__metaPixelPageViewTracked) return;
    window.__metaPixelPageViewTracked = true;

    const eventId = crypto.randomUUID();
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView", {}, { eventID: eventId });

    void fetch("/api/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, eventSourceUrl: window.location.href }),
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-script"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
      />
      <noscript>
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
