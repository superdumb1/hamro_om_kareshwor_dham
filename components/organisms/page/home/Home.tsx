"use client";
import React from 'react';
import { useLanguage } from '@/providers/LanguageToggle';
import { HOME_TRANSLATIONS } from '@/translations/homeTranslations';

const Homes = () => {
  const { lang } = useLanguage();
  const t = HOME_TRANSLATIONS[lang];

  return (
    <div>
        {/* 1. Hero Section */}
        <section className="relative bg-stone-900 text-white py-16 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-950/40 to-stone-900/90 z-0" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-orange-400 font-semibold tracking-widest uppercase text-xs sm:text-sm block mb-2">
              {t.heroSub}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-amber-100">
              {t.heroTitle}
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {t.heroDesc}
            </p>
          </div>
        </section>

        {/* 2. Quick Info / Daily Timings Grid */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-950 font-serif border-b border-stone-100 pb-2 mb-4 flex items-center gap-2">
              <span className="text-orange-600">☀️</span> {t.timingTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-semibold text-stone-800">{t.morningTitle}</p>
                <p className="text-stone-500 mt-0.5">{t.morningTime}</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-semibold text-stone-800">{t.aartiTitle}</p>
                <p className="text-stone-500 mt-0.5">{t.aartiTime}</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-semibold text-stone-800">{t.eveningTitle}</p>
                <p className="text-stone-500 mt-0.5">{t.eveningTime}</p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Homes;