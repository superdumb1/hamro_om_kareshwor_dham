"use client";
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const AdminNav = () => {
    const pathname = usePathname();

    const navItems = [
        { id: 'dashboard', label: 'Dashboard Overview', icon: '📊', href: '/admin' },
        { id: 'members', label: 'Members Directory', icon: '👥', href: '/admin/memberships' }, // Adjusted path to match route structure
        { id: 'finance', label: 'Treasury & Fees', icon: '🇳🇵', badge: 'v2', href: '/admin/finance', isLocked: true },
        { id: 'logs', label: 'System Audit Logs', icon: '💾', href: '/admin/logs', isLocked: true },
        { id: 'blogs', label: 'blog creation ', icon: '💾', href: '/admin/blogs/blog_creation', isLocked: false },
        { id: 'Events', label: 'Event Creation', icon: '📅', href: '/admin/events/event_creation', isLocked: false },
        {id:'donor', label: 'Donor Management', icon: '❤️', href: '/admin/donors/donor_creation', isLocked: false}
        
    ];

    return (
        <nav className="w-full lg:w-64 bg-stone-900 text-stone-300 border-b lg:border-b-0 lg:border-r border-stone-800 flex flex-col lg:min-h-screen shrink-0">
            {/* Nav Header Branding */}
            <div className="p-5 border-b border-stone-800 flex items-center gap-3">
                <span className="text-xl bg-orange-600 p-1.5 rounded-lg text-white font-serif font-bold">ॐ</span>
                <div>
                    <h2 className="text-sm font-bold text-stone-100 tracking-wide font-serif">OKSM Console</h2>
                    <p className="text-[10px] text-stone-500 font-mono">v1.4.0-stable</p>
                </div>
            </div>

            {/* Navigation Link Stack */}
            <div className="p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible items-center lg:items-stretch grow">
                {navItems.map((item) => {
                    // Automatically determine active states dynamically using Next.js pathnames!
                    const isActive = pathname === item.href;
                    
                    const baseStyles = `flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap lg:w-full`;
                    const activeStyles = isActive
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200';
                    const lockedStyles = 'opacity-40 cursor-not-allowed select-none';

                    // 🛠️ Structural Core Fix: Render an unclickable div instead of a link if it's a locked route placeholder
                    if (item.isLocked) {
                        return (
                            <div
                                key={item.id}
                                className={`${baseStyles} ${lockedStyles}`}
                                title="Feature locked under current iteration rollout"
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                                {item.badge && (
                                    <span className="text-[8px] px-1.5 py-0.2 rounded ml-auto tracking-wide bg-stone-800 text-stone-500 font-mono">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`${baseStyles} ${activeStyles}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                            {item.badge && (
                                <span className={`text-[8px] px-1.5 py-0.2 rounded ml-auto tracking-wide ${
                                    isActive ? 'bg-orange-700 text-orange-200' : 'bg-stone-800 text-stone-500 font-mono'
                                }`}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Footer Workspace profile wrapper */}
            <div className="hidden lg:block p-4 border-t border-stone-800 bg-stone-950/40 text-stone-500">
                <p className="text-[10px] font-mono tracking-wider uppercase">Active Session</p>
                <p className="text-xs text-stone-300 font-semibold truncate mt-0.5">admin@omkareshwor.org</p>
            </div>
        </nav>
    );
};

export default AdminNav;