import { useLang } from "./LanguageProvider";
import { translations } from "../translations";

export function useTranslation() {
  const { lang } = useLang();
  return {
    t: (key: string) =>
      translations[lang][key] || translations["es"][key] || key,
  };
}
