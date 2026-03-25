'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import ar, { Translations } from './translations/ar';
import en from './translations/en';

// ── Types ──────────────────────────────────────────────────────────────
export type Locale = 'ar' | 'en';

const TRANSLATIONS: Record<Locale, Translations> = { ar, en };

// ── Context ────────────────────────────────────────────────────────────
interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
  dir: 'rtl' | 'ltr';
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'ar',
  t: ar,
  setLocale: () => {},
  dir: 'rtl',
});

// ── Provider ───────────────────────────────────────────────────────────
const STORAGE_KEY = 'bara_alsalfa_locale';

function detectDefaultLocale(): Locale {
  // 1. Persisted user preference
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === 'ar' || saved === 'en') return saved;
    // 2. Browser language detection
    const browserLang = navigator.language || '';
    if (browserLang.startsWith('ar')) return 'ar';
  }
  // 3. Default to English
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar'); // SSR safe start

  // After mount, detect real preference
  useEffect(() => {
    setLocaleState(detectDefaultLocale());
  }, []);

  // Sync html lang + dir + persist on change
  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        t: TRANSLATIONS[locale],
        setLocale,
        dir: locale === 'ar' ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────
export function useLocale() {
  return useContext(LocaleContext);
}
