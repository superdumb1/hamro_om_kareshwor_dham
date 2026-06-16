"use client";
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const EventCreationForm = () => {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        tagType: 'General'
    });

    const addEventMutation = useMutation({
        mutationFn: async (newEventData: typeof form) => {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEventData)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to record event log');
            }
            return res.json();
        },
        onSuccess: () => {
            alert('Community event successfully saved to the temple registry!');
            // Reset state parameters completely
            setForm({
                title: '',
                date: '',
                time: '',
                location: '',
                description: '',
                tagType: 'General'
            });
            // Force refetch on active public feeds to update calendars instantly
            queryClient.invalidateQueries({ queryKey: ['public-events-timeline'] });
        },
        onError: (err: Error) => {
            alert(`Execution error: ${err.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addEventMutation.mutate(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-stone-200 p-6 rounded-xl shadow-sm max-w-2xl text-stone-800 text-xs">
            <h2 className="text-sm font-bold uppercase font-serif border-b border-stone-100 pb-2 text-stone-900">
                Schedule New Mandir Event / Notice
            </h2>

            {/* Event Title */}
            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Event Title</label>
                <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., Shrawan Sombar Bhajan Kirtan & Feast"
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 font-medium"
                />
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Calendar Date</label>
                    <input
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none font-medium font-mono text-stone-700 bg-stone-50 cursor-pointer"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Execution Time Slot</label>
                    <input
                        type="text"
                        required
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        placeholder="e.g., 4:00 PM onwards or All Day"
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                    />
                </div>
            </div>

            {/* Classification Tags & Location */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Event Classification Tag</label>
                    <select
                        value={form.tagType}
                        onChange={(e) => setForm({ ...form, tagType: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none text-stone-700 font-semibold cursor-pointer bg-stone-50"
                    >
                        <option value="General">General Notice</option>
                        <option value="Weekly">Weekly Satsang</option>
                        <option value="Festival">Festival Celebration</option>
                        <option value="Sanitation">Sanitation / Sanitation Drive</option>
                        <option value="Meeting">Executive Committee Meeting</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Venue / Specific Location</label>
                    <input
                        type="text"
                        required
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g., Main Mandir Hall"
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                    />
                </div>
            </div>

            {/* Detailed Description */}
            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Event Description & Information</label>
                <textarea
                    rows={4}
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Provide full details regarding the prasad layout arrangements, volunteer distribution tasks, or holy procedures..."
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none text-stone-700 leading-relaxed"
                />
            </div>

            {/* Submit Operation Target Button */}
            <button
                type="submit"
                disabled={addEventMutation.isPending}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-colors cursor-pointer disabled:opacity-40"
            >
                {addEventMutation.isPending ? 'Logging to Database Registry...' : 'Publish Event To Calendar'}
            </button>
        </form>
    );
};

export default EventCreationForm;