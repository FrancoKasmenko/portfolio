"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/app/components/LanguageProvider";

export default function Paint() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { lang } = useLang();

  // Elige la URL según el idioma
  const paintUrl = lang === "en"
    ? "https://jspaint.app/?lang=en"
    : "https://jspaint.app/?lang=es";

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full h-full m-0 p-0 bg-white overflow-hidden">
      <iframe
        ref={iframeRef}
        src={paintUrl}
        title="JS Paint"
        className="w-full h-full border-none m-0 p-0"
        style={{
          margin: 0,
          padding: 0,
          border: "none",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
