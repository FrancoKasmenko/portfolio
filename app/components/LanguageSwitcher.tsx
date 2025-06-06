"use client";
import { useLang } from "./LanguageProvider";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex gap-2 items-center ml-auto">
      <button
        className={`px-2 py-1 rounded ${lang === "es" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setLang("es")}
      >
        ES
      </button>
      <button
        className={`px-2 py-1 rounded ${lang === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
