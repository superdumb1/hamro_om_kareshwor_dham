"use client";
import React, { useState } from 'react';
interface Events
{
    id:number;
    title:string;
    date:string;
    time:string;
    location:string;
    description:string;
    tag:string;
    tagColor:string;
}
interface EventsData {
    upcoming: Events[];
    past: Events[];
    [key: string]: Events[];
}

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const eventsData: EventsData = {
    upcoming: [
      {
        id: 1,
        title: "Weekly Satsang & Bhajan",
        date: "Every Saturday", 
        
        time: "4:00 PM onwards",
        location: "Main Mandir Hall",
        description: "Join the community for our weekly spiritual gathering, devotional singing, and prasad distribution.",
        tag: "Weekly",
        tagColor: "bg-amber-100 text-amber-800 border-amber-200"
      },
      {
        id: 2,
        title: "Shrawan Sombar Special Preparation",
        date: "July 20, 2026",
        time: "5:00 AM - 8:00 PM",
        location: "Temple Premises",
        description: "Special abhishekam and line management volunteering for the holy month of Shrawan. Volunteer registration is open now.",
        tag: "Festival",
        tagColor: "bg-orange-100 text-orange-800 border-orange-200"
      }
    ],
    past: [
      {
        id: 3,
        title: "Maha Shivaratri Festival 2026",
        date: "March 17, 2026",
        time: "All Day & Night",
        location: "Om Kareshwor Premises",
        description: "Successfully celebrated with over 5,000 devotees. Deep gratitude to all volunteers and our Hall of Donors for making it possible.",
        tag: "Completed",
        tagColor: "bg-stone-100 text-stone-700 border-stone-200"
      },
      {
        id: 4,
        title: "Community Premises Cleanup Drive",
        date: "May 10, 2026",
        time: "7:00 AM - 10:00 AM",
        location: "Mandir Surroundings",
        description: "Local youth and temple committee members successfully organized a waste-management and plantation program around the outer complex.",
        tag: "Sanitation",
        tagColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
      }
    ]
  };

  return (
    <section id="events" className="py-10 px-4 max-w-7xl mx-auto bg-stone-50 min-h-[500px]">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
          Mandir <span className="text-orange-600 font-normal font-sans">Events & Notices</span>
        </h2>
        <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2 rounded-full" />
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
          Stay updated with religious celebrations, community volunteer drives, and local gatherings at Om Kareshwor.
        </p>
      </div>

      {/* Tab Filter Controller (No heavy containers, clean button links styling) */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 bg-stone-200/60 border border-stone-300/40 rounded-xl">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase rounded-lg transition-all duration-150 ${
              activeTab === 'upcoming'
                ? "bg-stone-900 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase rounded-lg transition-all duration-150 ${
              activeTab === 'past'
                ? "bg-stone-900 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {/* Events Stream / Cards Feed */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {eventsData[activeTab].length > 0 ? (
          eventsData[activeTab].map((event:any) => (
            <div
              key={event.id}
              className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Top meta strip */}
              <div className="flex justify-between items-start gap-2 mb-2.5">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${event.tagColor}`}>
                  {event.tag}
                </span>
                <div className="text-right">
                  <p className="text-xs font-bold text-stone-900">{event.date}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{event.time}</p>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-snug">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                {event.description}
              </p>

              {/* Location Stamp & Footer Action */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center text-xs text-stone-500">
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="font-medium truncate max-w-[180px] xs:max-w-none">
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
          <div className="text-center py-12 bg-white rounded-xl border border-stone-200/60 p-6">
            <p className="text-sm text-stone-500">No events found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;