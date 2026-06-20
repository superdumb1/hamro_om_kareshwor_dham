"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/providers/LanguageToggle'; // Import your provider
import { EVENTS_TRANSLATIONS } from '@/translations/publicEventsTranslations'; // Import translations

interface EventItem {

    id: string;

    title: string;

    date: string;

    time: string;

    location: string;

    description: string;

    tag: string;

}


interface EventsPayload {

    upcoming: EventItem[];

    past: EventItem[];

}


// Map database tag keys to clean Tailwind style profiles

const tagColorMap: Record<string, string> = {

    Weekly: "bg-amber-100 text-amber-800 border-amber-200",

    Festival: "bg-orange-100 text-orange-800 border-orange-200",

    Sanitation: "bg-emerald-100 text-emerald-800 border-emerald-200",

    Meeting: "bg-blue-100 text-blue-800 border-blue-200",

    General: "bg-stone-100 text-stone-700 border-stone-200"

};

const Events = () => {
    const { lang } = useLanguage();
    const t = EVENTS_TRANSLATIONS[lang];
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    const { data: eventsData, isLoading, error } = useQuery<EventsPayload>({
        queryKey: ['public-events-timeline'],
        queryFn: async () => {
            const res = await fetch('/api/events');
            if (!res.ok) throw new Error('Network response failed');
            return res.json();
        }
    });

    const currentEventsList = eventsData ? eventsData[activeTab] : [];

    return (
        <section id="events" className="py-12 px-4 max-w-7xl mx-auto bg-stone-50 min-h-[500px] text-stone-800">
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
                    Mandir <span className="text-orange-600 font-normal font-sans">{t.sectionTitle}</span>
                </h2>
                <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2 rounded-full" />
                <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
                    {t.subtitle}
                </p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="inline-flex p-1 bg-stone-200/60 border border-stone-200 rounded-xl">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-5 py-2 text-xs font-bold tracking-wide uppercase rounded-lg transition-all ${activeTab === 'upcoming' ? "bg-stone-900 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                            }`}
                    >
                        {t.upcoming}
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`px-5 py-2 text-xs font-bold tracking-wide uppercase rounded-lg transition-all ${activeTab === 'past' ? "bg-stone-900 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                            }`}
                    >
                        {t.past}
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-16 text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">
                    {t.loading}
                </div>
            ) : error ? (
                <div className="text-center py-12 text-xs font-bold text-red-600 max-w-sm mx-auto bg-red-50 rounded-xl border border-red-100">
                    Failed to synchronise events data.
                </div>
            ) : (
                <div className="space-y-4 max-w-2xl mx-auto">
                    {currentEventsList && currentEventsList.length > 0 ? (
                        currentEventsList.map((event: EventItem) => (
                            <div key={event.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                                {/* ... (rest of your event card UI remains the same) ... */}
                                <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center text-xs text-stone-500">
                                    {/* ... location display ... */}
                                    {activeTab === 'upcoming' && (
                                        <a href="#contact" className="text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider">
                                            {t.inquire}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-6">
                            <p className="text-xs text-stone-400 font-medium">{t.noEvents}</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Events;