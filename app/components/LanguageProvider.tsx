"use client";
import React, { createContext, useContext, useState } from "react";
import { translations } from "../translations";

type Lang = "es" | "en";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({
  lang: "es",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  const { lang } = useLang();
  return {
    t: (key: string) =>
      translations[lang][key] || translations["es"][key] || key,
    lang, 
  };
}




