"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface DonorRecord {
    id: string;
    fullName: string;
    address: string;
    donationType: 'Cash' | 'Material Asset';
    amount: number | null;
    itemDonated: string;
    tributeItem: string;
    isAnonymous: boolean;
    receivedDate: string;
}

const Donors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 🌟 Fetch live, synchronized ledger rows from MongoDB via the API route
  const { data: donorLedger = [], isLoading, error } = useQuery<DonorRecord[]>({
    queryKey: ['public-donors-registry'],
    queryFn: async () => {
        const res = await fetch('/api/donors');
        if (!res.ok) throw new Error('Failed to synchronize donor ledger data lines');
        return res.json();
    }
  });

  // Simple filter to let families search for their names or addresses
  const filteredDonors = donorLedger.filter(donor => 
    donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="donors" className="py-10 px-4 max-w-7xl mx-auto bg-stone-50 min-h-[500px] text-stone-800">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
          Hall of <span className="text-orange-600 font-normal font-sans">Donors</span>
        </h2>
        <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2 rounded-full" />
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
          We express our deepest gratitude to the families whose generous contributions help sustain the daily rituals and construction at Om Kareshwor Siwalaya.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by donor name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 shadow-sm transition-colors text-stone-800 pl-4 pr-12"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Network Response Interface State Interceptors */}
      {isLoading ? (
        <div className="text-center py-12 text-xs font-mono font-bold text-stone-400 uppercase tracking-widest animate-pulse">
          Loading Holy Donation Records...
        </div>
      ) : error ? (
        <div className="text-center py-8 text-xs font-bold text-red-600 max-w-sm mx-auto bg-red-50 rounded-xl border border-red-100">
          Failed to fetch historical ledger files.
        </div>
      ) : (
        <>
          {/* Desktop View: Clean Grid Table (Hidden on small mobile viewports) */}
          <div className="hidden sm:block max-w-5xl mx-auto overflow-hidden bg-white border border-stone-200/80 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse m-0">
              <thead>
                <tr className="bg-stone-900 text-white uppercase text-[11px] tracking-wider font-semibold font-sans">
                  <th className="py-3 px-4">Donor Name / Family</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4 text-center">Type</th>
                  <th className="py-3 px-4">Contribution / Amount</th>
                  <th className="py-3 px-4">Dedicated Purpose</th>
                  <th className="py-3 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm text-stone-700 divide-y divide-stone-100">
                {filteredDonors.length > 0 ? (
                  filteredDonors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className={`py-3.5 px-4 font-bold ${donor.isAnonymous ? 'text-stone-400 italic font-medium' : 'text-stone-900'}`}>
                        {donor.fullName}
                      </td>
                      <td className="py-3.5 px-4 text-stone-500 font-medium">{donor.address}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border tracking-wide whitespace-nowrap ${
                          donor.donationType === "Cash" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                            : "bg-orange-50 text-orange-700 border-orange-100"
                        }`}>
                          {donor.donationType === "Cash" ? "Cash" : "Materials"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-stone-900 font-sans">
                        {donor.donationType === "Cash" && donor.amount ? (
                          <span className="text-emerald-700">रू {donor.amount.toLocaleString('en-IN')}</span>
                        ) : (
                          <span className="text-stone-800">{donor.itemDonated}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-stone-600 text-xs truncate max-w-[180px]" title={donor.tributeItem}>
                        {donor.tributeItem || "General Mandir Fund"}
                      </td>
                      <td className="py-3.5 px-4 text-right text-stone-400 font-medium whitespace-nowrap">{donor.receivedDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-stone-500 text-xs">No records matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View: Dynamic Card Streams (Optimized for viewport boxes under 400px) */}
          <div className="block sm:hidden space-y-3 max-w-md mx-auto">
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <div 
                  key={donor.id} 
                  className="bg-white border border-stone-200/80 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div>
                      <h3 className={`text-sm font-bold leading-snug ${donor.isAnonymous ? 'text-stone-400 italic font-medium' : 'text-stone-900'}`}>
                        {donor.fullName}
                      </h3>
                      <p className="text-[11px] text-stone-400 mt-0.5">{donor.address}</p>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase border tracking-wide whitespace-nowrap ${
                      donor.donationType === "Cash" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-orange-50 text-orange-700 border-orange-100"
                    }`}>
                      {donor.donationType === "Cash" ? "Cash" : "Materials"}
                    </span>
                  </div>

                  <div className="bg-stone-50/80 rounded-lg p-2.5 border border-stone-100 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-400 font-medium">Contributed:</span>
                      <span className="font-bold font-sans text-stone-900">
                        {donor.donationType === "Cash" && donor.amount ? (
                          <span className="text-emerald-700">रू {donor.amount.toLocaleString('en-IN')}</span>
                        ) : (
                          donor.itemDonated
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 items-start">
                      <span className="text-stone-400 font-medium whitespace-nowrap">For Purpose:</span>
                      <span className="text-stone-700 text-right text-[11px] truncate max-w-[180px]">
                        {donor.tributeItem || "General Mandir Fund"}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-400 text-right mt-2 font-medium">
                    Acknowledged on {donor.receivedDate}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-xl border border-stone-200/60 text-xs text-stone-500">
                No records matching your search.
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Donors;