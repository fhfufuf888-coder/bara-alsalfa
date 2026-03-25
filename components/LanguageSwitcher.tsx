'use client';

import { useLocale } from '../lib/i18n';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      style={{
        position: 'fixed',
        top: '14px',
        right: '14px',
        zIndex: 1000,
        display: 'flex',
        gap: '4px',
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)',
        borderRadius: '50px',
        padding: '4px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
        border: '1px solid rgba(255,255,255,0.25)',
      }}
    >
      <button
        onClick={() => setLocale('en')}
        style={{
          padding: '6px 14px',
          borderRadius: '50px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '0.85rem',
          fontWeight: 700,
          transition: 'all 0.25s ease',
          background: locale === 'en' ? 'var(--primary)' : 'transparent',
          color: locale === 'en' ? '#fff' : 'var(--text-main)',
          boxShadow: locale === 'en' ? '0 2px 8px rgba(108,92,231,0.35)' : 'none',
        }}
        aria-label="Switch to English"
      >
        {t.lang.english}
      </button>
      <button
        onClick={() => setLocale('ar')}
        style={{
          padding: '6px 14px',
          borderRadius: '50px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '0.85rem',
          fontWeight: 700,
          transition: 'all 0.25s ease',
          background: locale === 'ar' ? 'var(--primary)' : 'transparent',
          color: locale === 'ar' ? '#fff' : 'var(--text-main)',
          boxShadow: locale === 'ar' ? '0 2px 8px rgba(108,92,231,0.35)' : 'none',
        }}
        aria-label="Switch to Arabic"
      >
        {t.lang.arabic}
      </button>
    </div>
  );
}
