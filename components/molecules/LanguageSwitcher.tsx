"use client";
import React from 'react';
import { useLanguage } from '@/providers/LanguageToggle';

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'ne' : 'en')}
      className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-stone-200 bg-white hover:bg-stone-50 transition-colors shadow-sm"
      aria-label="Toggle Language"
    >
      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-700">
        {lang === 'en' ? '🇺🇸 EN' : '🇳🇵 NE'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;