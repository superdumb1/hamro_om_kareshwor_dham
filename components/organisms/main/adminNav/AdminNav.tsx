"use client";
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/providers/LanguageToggle';

const AdminNav = () => {
    const pathname = usePathname();
    const { lang, setLang } = useLanguage();

    const navItems = [
        { id: 'dashboard', label: lang === 'en' ? 'Dashboard Overview' : 'ड्यासबोर्ड अवलोकन', icon: '📊', href: '/admin' },
        { id: 'members', label: lang === 'en' ? 'Members Directory' : 'सदस्य निर्देशिका', icon: '👥', href: '/admin/memberships' },
        { id: 'finance', label: lang === 'en' ? 'Treasury & Fees' : 'कोष तथा शुल्क', icon: '🇳🇵', badge: 'v2', href: '/admin/finance', isLocked: true },
        { id: 'logs', label: lang === 'en' ? 'System Audit Logs' : 'सिस्टम अडिट लगहरू', icon: '💾', href: '/admin/logs', isLocked: true },
        { id: 'blogs', label: lang === 'en' ? 'Blog Creation' : 'ब्लग सिर्जना', icon: '📝', href: '/admin/blogs/blog_creation', isLocked: false },
        { id: 'Events', label: lang === 'en' ? 'Event Creation' : 'कार्यक्रम सिर्जना', icon: '📅', href: '/admin/events/event_creation', isLocked: false },
        { id: 'donor', label: lang === 'en' ? 'Donor Management' : 'दाता व्यवस्थापन', icon: '❤️', href: '/admin/donors/donor_creation', isLocked: false }
    ];

    return (
        <nav className="w-full lg:w-64 bg-stone-900 text-stone-300 border-b lg:border-b-0 lg:border-r border-stone-800 flex flex-col lg:min-h-screen shrink-0">
            {/* Nav Header Branding */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="text-xl bg-orange-600 p-1.5 rounded-lg text-white font-serif font-bold">ॐ</span>
                    <div>
                        <h2 className="text-sm font-bold text-stone-100 tracking-wide font-serif">OKSM Console</h2>
                        <p className="text-[10px] text-stone-500 font-mono">v1.4.0</p>
                    </div>
                </div>

                {/* Unified Toggle Switch */}
                <button
                    type="button"
                    onClick={() => setLang(lang === 'en' ? 'ne' : 'en')}
                    className="flex bg-stone-950 p-0.5 rounded border border-stone-800 select-none cursor-pointer hover:border-stone-700 transition-colors group"
                    title="Toggle Language"
                >
                    <span
                        className={`px-1.5 py-0.5 text-[9px] font-bold rounded transition-all duration-300 ${
                            lang === 'en' 
                            ? 'bg-stone-800 text-stone-100 shadow-sm' 
                            : 'text-stone-600 group-hover:text-stone-400'
                        }`}
                    >
                        EN
                    </span>
                    <span
                        className={`px-1.5 py-0.5 text-[9px] font-bold rounded transition-all duration-300 ${
                            lang === 'ne' 
                            ? 'bg-orange-600 text-white shadow-sm' 
                            : 'text-stone-600 group-hover:text-stone-400'
                        }`}
                    >
                        नेप
                    </span>
                </button>
            </div>

            {/* Navigation Link Stack */}
            <div className="p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible items-center lg:items-stretch grow">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const baseStyles = `flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap lg:w-full`;
                    const activeStyles = isActive ? 'bg-orange-600 text-white shadow-sm' : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200';
                    const lockedStyles = 'opacity-40 cursor-not-allowed select-none';

                    if (item.isLocked) {
                        return (
                            <div key={item.id} className={`${baseStyles} ${lockedStyles}`} title="Feature locked">
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                                {item.badge && <span className="text-[8px] px-1.5 py-0.2 rounded ml-auto bg-stone-800 text-stone-500 font-mono">{item.badge}</span>}
                            </div>
                        );
                    }

                    return (
                        <Link key={item.id} href={item.href} className={`${baseStyles} ${activeStyles}`}>
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                            {item.badge && (
                                <span className={`text-[8px] px-1.5 py-0.2 rounded ml-auto tracking-wide ${isActive ? 'bg-orange-700 text-orange-200' : 'bg-stone-800 text-stone-500 font-mono'}`}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Footer Profile Details */}
            <div className="hidden lg:block p-4 border-t border-stone-800 bg-stone-950/40 text-stone-500">
                <p className="text-[10px] font-mono tracking-wider uppercase">Active Session</p>
                <p className="text-xs text-stone-300 font-semibold truncate mt-0.5">admin@omkareshwor.org</p>
            </div>
        </nav>
    );
};

export default AdminNav;