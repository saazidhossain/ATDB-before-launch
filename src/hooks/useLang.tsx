import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "bn";

const STORAGE_KEY = "atdb_lang";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Inline bilingual: t("English", "বাংলা"). Returns the active locale's string. */
  t: (en: string, bn: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "bn" ? "bn" : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.classList.toggle("lang-bn", lang === "bn");
    }
  }, [lang]);

  const t = (en: string, bn: string) => (lang === "bn" ? bn : en);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
