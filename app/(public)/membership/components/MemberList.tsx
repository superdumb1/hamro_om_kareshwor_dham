"use client";
import React, { useState, useEffect } from 'react'

interface Member {
    id: string; // MongoDB IDs will come back as strings (_id)
    name: string;
    address: string;
    memberId: string;
    joinedDate: string; // API sends back pre-formatted string dates
    status: string;
}

type SortKey = 'name' | 'joinedDate';
type SortOrder = 'asc' | 'desc';

const MemberList = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch filtered and sorted data straight from the backend API route
    useEffect(() => {
        const fetchMembers = async () => {
            setIsLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    search: searchTerm,
                    sortKey: sortKey,
                    sortOrder: sortOrder
                });

                const res = await fetch(`/api/members?${queryParams.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setMembers(data);
                }
            } catch (err) {
                console.error("Database sync failure:", err);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce continuous typing inputs by 250ms to safeguard your DB connection pool
        const delayDebounceFn = setTimeout(() => {
            fetchMembers();
        }, 250);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, sortKey, sortOrder]);

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="py-6 px-2">
            {/* 👥 REGISTERED MEMBERS DIRECTORY */}
            <div className="max-w-5xl mx-auto">
                <div className="text-center sm:text-left mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                            General Body <span className="text-orange-600 font-normal font-sans">Roster</span>
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                            Live database transparency ledger of active, verified mandir general members.
                        </p>
                    </div>

                    {/* Inline Filter & Sort Engine */}
                    <div className="flex flex-col xs:flex-row items-center gap-2 w-full sm:w-auto">
                        {/* Search Input */}
                        <div className="w-full sm:w-64 relative">
                            <input
                                type="text"
                                placeholder="Search member directory..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-orange-500 shadow-sm transition-colors text-stone-800"
                            />
                        </div>

                        {/* Sort Utilities */}
                        <div className="flex items-center gap-1.5 w-full xs:w-auto justify-end">
                            <select
                                value={sortKey}
                                onChange={(e) => setSortKey(e.target.value as SortKey)}
                                className="px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-orange-500 shadow-sm text-stone-600 font-medium cursor-pointer"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="joinedDate">Sort by Date</option>
                            </select>

                            <button
                                onClick={toggleSortOrder}
                                title={sortOrder === 'asc' ? "Ascending order" : "Descending order"}
                                className="px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg hover:border-stone-300 text-stone-600 font-bold shadow-sm flex items-center gap-1 min-w-[38px] justify-center"
                            >
                                {sortOrder === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* State-driven view rendering */}
                {isLoading ? (
                    <div className="text-center py-16 text-stone-400 text-xs tracking-wider font-medium">
                        Synchronizing real-time database ledger...
                    </div>
                ) : (
                    <>
                        {/* Desktop Member Table View */}
                        <DesktopMemberTable filteredMembers={members} />

                        {/* Mobile Member Card View */}
                        <MobileMembersView filteredMembers={members} />
                    </>
                )}
            </div>
        </div>
    )
}

const MobileMembersView = ({ filteredMembers }: { filteredMembers: Member[] }) => (
    <div className="block sm:hidden space-y-2.5">
        {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
                <div key={member.id} className="bg-white border border-stone-200/80 rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3">
                    <div>
                        <span className="block text-[9px] font-mono font-bold text-stone-400 tracking-wider">
                            {member.memberId}
                        </span>
                        <h4 className="text-sm font-bold text-stone-900 mt-0.5">{member.name}</h4>
                        <p className="text-[11px] text-stone-500 mt-0.5 font-medium">{member.address}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1.5">
                        <span className="text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Active
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium">
                            {member.joinedDate}
                        </span>
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-stone-200/60 text-xs text-stone-500">
                No registered members match your criteria.
            </div>
        )}
    </div>
)

const DesktopMemberTable = ({ filteredMembers }: { filteredMembers: Member[] }) => (
    <div className="hidden sm:block overflow-hidden bg-white border border-stone-200/80 rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse m-0">
            <thead>
                <tr className="bg-stone-900 text-white uppercase text-[10px] tracking-wider font-semibold font-sans">
                    <th className="py-2.5 px-4">Member ID</th>
                    <th className="py-2.5 px-4">Full Name</th>
                    <th className="py-2.5 px-4">Area Reference</th>
                    <th className="py-2.5 px-4">Enrolled Date</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
            </thead>
            <tbody className="text-xs sm:text-sm text-stone-700 divide-y divide-stone-100">
                {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-stone-50/60 transition-colors">
                            <td className="py-3 px-4 font-mono text-[11px] text-stone-400 font-bold">{member.memberId}</td>
                            <td className="py-3 px-4 font-bold text-stone-900">{member.name}</td>
                            <td className="py-3 px-4 text-stone-500 font-medium">{member.address}</td>
                            <td className="py-3 px-4 text-stone-400 text-xs font-medium">{member.joinedDate}</td>
                            <td className="py-3 px-4 text-right">
                                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    {member.status}
                                </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="py-8 text-center text-stone-500 text-xs">No registered members match your criteria.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
)

export default MemberList