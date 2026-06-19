"use client";
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/providers/LanguageToggle';
import { HEADER_TRANSLATIONS } from '@/translations/headerTranslations';
import LanguageSwitcher from '@/components/molecules/LanguageSwitcher';

const Header = () => {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const t = HEADER_TRANSLATIONS[lang];

  const navItems = [
    { name: t.navHome, href: "/" },
    { name: t.navBlogs, href: "/blogs" },
    { name: t.navDonors, href: "/hallofdoners" },
    { name: t.navMembership, href: "/membership" },
    { name: t.navEvents, href: "/events" },
    { name: t.navContact, href: "#footer" },
  ];

  return (
    <header className="bg-white border-b border-stone-200 shadow-sm relative z-50">
      {/* Minimalist Top Bar */}
      <div className="bg-stone-50 border-b border-stone-100 text-stone-600 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans tracking-wide">
          <div className="flex items-center gap-3">
             <a href="https://maps.app.goo.gl/E1Pm7iyZb6RSvbRk9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-stone-500 hover:text-orange-600">
              <svg className="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
              <span className="font-medium hidden sm:block">{t.address}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="text-orange-700 font-semibold tracking-widest hidden xs:block">
              {t.mantra}
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto py-4">
        <div className="px-4">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-serif">
                {t.titleMain} <span className="text-orange-600 font-normal font-sans text-lg sm:text-xl">{t.titleSub}</span>
              </h1>
              <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-0.5">
                {t.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu - Restored to your original alignment logic */}
        <nav className="mt-3 bg-[#fffff1] px-4">
          <ul className="flex items-center flex-wrap m-0 p-0 gap-[2px] list-none">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <React.Fragment key={item.name}>
                  <li className="sm:flex-none">
                    <Link
                      href={item.href}
                      className={`block w-full px-[8px] py-2 text-[14px] font-semibold rounded-lg border text-center transition-all duration-150 whitespace-nowrap tracking-wide uppercase text-xs ${isActive
                          ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                          : "bg-stone-100 text-stone-700 border-stone-200/60 hover:bg-stone-200 hover:text-stone-900 active:scale-95"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                  {(index + 1) % 3 === 0 && <div className="w-full h-0 m-0 p-0" aria-hidden="true" />}
                </React.Fragment>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;