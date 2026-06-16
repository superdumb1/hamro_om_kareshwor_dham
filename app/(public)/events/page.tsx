"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    // 🌟 Stream automatic chronological timeline snapshots straight from MongoDB
    const { data: eventsData, isLoading, error } = useQuery<EventsPayload>({
        queryKey: ['public-events-timeline'],
        queryFn: async () => {
            const res = await fetch('/api/events');
            if (!res.ok) throw new Error('Network response failed tracking events');
            return res.json();
        }
    });

    // Fallback safe defaults if async streams are initializing or offline
    const currentEventsList = eventsData ? eventsData[activeTab] : [];

    return (
        <section id="events" className="py-12 px-4 max-w-7xl mx-auto bg-stone-50 min-h-[500px] text-stone-800">
            {/* Section Header */}
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
                    Mandir <span className="text-orange-600 font-normal font-sans">Events & Notices</span>
                </h2>
                <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2 rounded-full" />
                <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
                    Stay updated with religious celebrations, community volunteer drives, and local gatherings at Om Kareshwor.
                </p>
            </div>

            {/* Tab Filter Controller */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex p-1 bg-stone-200/60 border border-stone-200 rounded-xl">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-5 py-2 text-xs font-bold tracking-wide uppercase rounded-lg transition-all ${
                            activeTab === 'upcoming'
                                ? "bg-stone-900 text-white shadow-sm"
                                : "text-stone-600 hover:text-stone-900"
                        }`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`px-5 py-2 text-xs font-bold tracking-wide uppercase rounded-lg transition-all ${
                            activeTab === 'past'
                                ? "bg-stone-900 text-white shadow-sm"
                                : "text-stone-600 hover:text-stone-900"
                        }`}
                    >
                        Past Events
                    </button>
                </div>
            </div>

            {/* Loading & Error States handling */}
            {isLoading ? (
                <div className="text-center py-16 text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">
                    Syncing Temple Calendar Logs...
                </div>
            ) : error ? (
                <div className="text-center py-12 text-xs font-bold text-red-600 max-w-sm mx-auto bg-red-50 rounded-xl border border-red-100">
                    Failed to synchronise events data indexes.
                </div>
            ) : (
                /* Events Stream / Cards Feed */
                <div className="space-y-4 max-w-2xl mx-auto">
                    {currentEventsList && currentEventsList.length > 0 ? (
                        currentEventsList.map((event: EventItem) => (
                            <div
                                key={event.id}
                                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex justify-between items-start gap-4 mb-3">
                                    <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${tagColorMap[event.tag] || tagColorMap.General}`}>
                                        {event.tag}
                                    </span>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-stone-900">{event.date}</p>
                                        <p className="text-[11px] font-mono text-stone-400 mt-0.5">{event.time}</p>
                                    </div>
                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-snug">
                                    {event.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                                    {event.description}
                                </p>

                                <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center text-xs text-stone-500">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <span className="font-medium truncate max-w-[220px]">
                                            {event.location}
                                        </span>
                                    </div>
                                    
                                    {activeTab === 'upcoming' && (
                                        <a 
                                            href="#contact" 
                                            className="text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider"
                                        >
                                            Inquire &rarr;
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-6">
                            <p className="text-xs text-stone-400 font-medium">No recorded events mapped inside this collection bracket.</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Events;