"use client";
import { Puzzle } from "lucide-react";
import { useLang } from "@/app/components/LanguageProvider";

export default function Solitario() {
  const { lang } = useLang();

  return (
    <div className="w-full h-full flex flex-col bg-[#c0c0c0] border border-[#888]">
      
      <div className="flex-1">
        <iframe
          src="/solitario/index.html"
          title="Solitario Clásico"
          width="100%"
          height="100%"
          style={{
            minHeight: 540,
            minWidth: 380,
            border: "none",
            background: "#1e5631",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
