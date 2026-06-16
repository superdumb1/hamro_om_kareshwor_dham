"use client";
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MembershipForm from './MembershipForm';

const AdminMembershipsPage = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const { data: members = [], isLoading } = useQuery<Member[]>({
        queryKey: ['members', searchTerm],
        queryFn: async () => {
            const res = await fetch(`/api/members?search=${encodeURIComponent(searchTerm)}&sortKey=joinedDate&sortOrder=desc`);
            if (!res.ok) throw new Error('Database connection failed');
            return res.json();
        },
    });

    return (
        <div className="min-h-screen bg-stone-100 flex flex-col lg:flex-row text-stone-800 font-sans">

            {/* 🧭 Admin Navigation Sidebar Panel */}

            {/* 🏛️ Main Content Canvas Area */}
            <div className="grow p-4 sm:p-8 space-y-6 overflow-y-auto">

                {/* Header Information Banner Block */}
                <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-serif">
                            Om Kareshwor <span className="text-orange-600 font-sans font-normal">Samity Executive Admin</span>
                        </h1>
                        <p className="text-xs text-stone-500 mt-1">
                            Managed via TanStack Query state engine cache synchronization pipelines.
                        </p>
                    </div>
                    <span className="text-[10px] bg-stone-900 text-stone-100 px-3 py-1 font-bold tracking-widest uppercase rounded border border-stone-800 shadow-sm whitespace-nowrap">
                        🔐 Access Level: Master Admin
                    </span>
                </div>

                {/* Core Management Form + Audit Log Grid Section split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* Manual Entry Mutation Control Field card */}
                    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
                            Manual Member Initialization
                        </h2>
                        <MembershipForm />
                    </div>

                    {/* Master Ledger List View Table Grid card */}
                    <div className="lg:col-span-2 bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                                Core Audit Directory Ledger
                            </h2>
                            <input
                                type="text"
                                placeholder="Filter ledger database grid..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-3 py-1.5 text-xs border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 w-full sm:w-56 text-stone-800"
                            />
                        </div>

                        {isLoading ? (
                            <div className="text-center py-20 text-xs font-semibold text-stone-400 tracking-wider">
                                Fetching remote cache records snap...
                            </div>
                        ) : (
                            <div className="overflow-x-auto border border-stone-100 rounded-lg">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                        <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase text-[9px] font-bold tracking-wider">
                                            <th className="p-3">Member ID</th>
                                            <th className="p-3">Full Name</th>
                                            <th className="p-3">Address</th>
                                            <th className="p-3">Enrolled</th>
                                            <th className="p-3 text-right">Status Badge</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                                        {members.length > 0 ? (
                                            members.map((member) => (
                                                <tr key={member.id} className="hover:bg-stone-50/50 transition-colors">
                                                    <td className="p-3 font-mono font-bold text-stone-400 text-[10px]">{member.memberId}</td>
                                                    <td className="p-3 font-bold text-stone-900">{member.name}</td>
                                                    <td className="p-3 text-stone-500">{member.address}</td>
                                                    <td className="p-3 text-stone-400 text-[11px]">{member.joinedDate}</td>
                                                    <td className="p-3 text-right">
                                                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${member.status.includes('Board')
                                                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                            }`}>
                                                            {member.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-stone-400">
                                                    No administrative records found matching parameters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminMembershipsPage;