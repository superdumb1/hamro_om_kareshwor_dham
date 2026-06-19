"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/providers/LanguageToggle';
import { PUBLIC_MEMBERSHIP_TRANSLATIONS } from '@/translations/publicMembershipTranslation';

interface Member {
    id: string;
    name: string;
    address: string;
    memberId: string;
    joinedDate: string;
    status: string;
}

type SortKey = 'name' | 'joinedDate';
type SortOrder = 'asc' | 'desc';

const MemberList = () => {
    const { lang } = useLanguage();
    const t = PUBLIC_MEMBERSHIP_TRANSLATIONS[lang];

    const [members, setMembers] = useState<Member[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [isLoading, setIsLoading] = useState(true);

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
            <div className="max-w-5xl mx-auto">
                <div className="text-center sm:text-left mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                            {t.rosterTitle1} <span className="text-orange-600 font-normal font-sans">{t.rosterTitle2}</span>
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                            {t.rosterDesc}
                        </p>
                    </div>

                    <div className="flex flex-col xs:flex-row items-center gap-2 w-full sm:w-auto">
                        <div className="w-full sm:w-64 relative">
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-orange-500 shadow-sm transition-colors text-stone-800"
                            />
                        </div>

                        <div className="flex items-center gap-1.5 w-full xs:w-auto justify-end">
                            <select
                                value={sortKey}
                                onChange={(e) => setSortKey(e.target.value as SortKey)}
                                className="px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-orange-500 shadow-sm text-stone-600 font-medium cursor-pointer"
                            >
                                <option value="name">{t.sortName}</option>
                                <option value="joinedDate">{t.sortDate}</option>
                            </select>

                            <button
                                onClick={toggleSortOrder}
                                title={sortOrder === 'asc' ? t.sortAsc : t.sortDesc}
                                className="px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg hover:border-stone-300 text-stone-600 font-bold shadow-sm flex items-center gap-1 min-w-[38px] justify-center"
                            >
                                {sortOrder === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-16 text-stone-400 text-xs tracking-wider font-medium">
                        {t.loadingState}
                    </div>
                ) : (
                    <>
                        <DesktopMemberTable filteredMembers={members} t={t} />
                        <MobileMembersView filteredMembers={members} t={t} />
                    </>
                )}
            </div>
        </div>
    )
}

// Passed `t` as a prop to child components to keep renders clean
const MobileMembersView = ({ filteredMembers, t }: { filteredMembers: Member[], t: any }) => (
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
                            {t.statusActive}
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium">
                            {member.joinedDate}
                        </span>
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-stone-200/60 text-xs text-stone-500">
                {t.emptyState}
            </div>
        )}
    </div>
)

const DesktopMemberTable = ({ filteredMembers, t }: { filteredMembers: Member[], t: any }) => (
    <div className="hidden sm:block overflow-hidden bg-white border border-stone-200/80 rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse m-0">
            <thead>
                <tr className="bg-stone-900 text-white uppercase text-[10px] tracking-wider font-semibold font-sans">
                    <th className="py-2.5 px-4">{t.colId}</th>
                    <th className="py-2.5 px-4">{t.colName}</th>
                    <th className="py-2.5 px-4">{t.colAddress}</th>
                    <th className="py-2.5 px-4">{t.colEnrolled}</th>
                    <th className="py-2.5 px-4 text-right">{t.colStatus}</th>
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
                        <td colSpan={5} className="py-8 text-center text-stone-500 text-xs">{t.emptyState}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
)

export default MemberList;