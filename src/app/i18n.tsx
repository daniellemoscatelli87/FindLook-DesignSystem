import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "pt";
export type Bi = { en: string; pt: string };

// FindLook Design System: só português. O mecanismo bilíngue é mantido para
// compatibilidade com os componentes herdados, mas o idioma é fixo em "pt".
function initialLang(): Lang {
  return "pt";
}

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** t("English", "Português") returns the string for the active language. */
  t: (en: string, pt: string) => string;
  /** bi({ en, pt }) for bilingual objects stored in data arrays. */
  bi: (v: Bi) => string;
};

const I18nContext = createContext<Ctx>({
  lang: "pt",
  setLang: () => {},
  t: (_en, pt) => pt,
  bi: (v) => v.pt,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((_l: Lang) => {
    setLangState("pt");
  }, []);

  useEffect(() => {
    document.documentElement.lang = "pt-BR";
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (en, pt) => (lang === "pt" ? pt : en),
      bi: (v) => (lang === "pt" ? v.pt : v.en),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
