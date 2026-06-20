"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/providers/LanguageToggle';
import { DONORS_TRANSLATIONS } from '@/translations/publicDonerTranslation';

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
  const { lang } = useLanguage();
  const t = DONORS_TRANSLATIONS[lang];
  const [searchTerm, setSearchTerm] = useState("");

  const { data: donorLedger = [], isLoading, error } = useQuery<DonorRecord[]>({
    queryKey: ['public-donors-registry'],
    queryFn: async () => {
        const res = await fetch('/api/donors');
        if (!res.ok) throw new Error('Failed to synchronize donor ledger data');
        return res.json();
    }
  });

  const filteredDonors = donorLedger.filter(donor => 
    donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="donors" className="py-10 px-4 max-w-7xl mx-auto bg-stone-50 min-h-[500px] text-stone-800">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
          Hall of <span className="text-orange-600 font-normal font-sans">{t.title}</span>
        </h2>
        <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2 rounded-full" />
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">{t.subtitle}</p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 shadow-sm transition-colors text-stone-800 pl-4 pr-12"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold">
              {t.clear}
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">{t.loading}</div>
      ) : error ? (
        <div className="text-center py-8 text-xs font-bold text-red-600 max-w-sm mx-auto bg-red-50 rounded-xl border border-red-100">{t.error}</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block max-w-5xl mx-auto overflow-hidden bg-white border border-stone-200/80 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-900 text-white uppercase text-[11px] tracking-wider font-semibold font-sans">
                  <th className="py-3 px-4">{t.name}</th>
                  <th className="py-3 px-4">{t.address}</th>
                  <th className="py-3 px-4 text-center">{t.type}</th>
                  <th className="py-3 px-4">{t.contribution}</th>
                  <th className="py-3 px-4">{t.purpose}</th>
                  <th className="py-3 px-4 text-right">{t.date}</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm text-stone-700 divide-y divide-stone-100">
                {filteredDonors.length > 0 ? filteredDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-stone-50 transition-colors">
                    <td className={`py-3.5 px-4 font-bold ${donor.isAnonymous ? 'text-stone-400 italic' : 'text-stone-900'}`}>{donor.fullName}</td>
                    <td className="py-3.5 px-4">{donor.address}</td>
                    <td className="py-3.5 px-4 text-center">
                       <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${donor.donationType === "Cash" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-orange-50 text-orange-700 border-orange-100"}`}>
                        {donor.donationType === "Cash" ? t.cash : t.materials}
                       </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-900">
                        {donor.donationType === "Cash" && donor.amount ? `रू ${donor.amount.toLocaleString('en-IN')}` : donor.itemDonated}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 text-xs truncate max-w-[180px]">{donor.tributeItem || t.general}</td>
                    <td className="py-3.5 px-4 text-right text-stone-400">{donor.receivedDate}</td>
                  </tr>
                )) : <tr><td colSpan={6} className="py-8 text-center text-stone-500">{t.noRecords}</td></tr>}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Stream */}
          <div className="block sm:hidden space-y-3 max-w-md mx-auto">
            {filteredDonors.length > 0 ? filteredDonors.map((donor) => (
              <div key={donor.id} className="bg-white border border-stone-200/80 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className={`text-sm font-bold ${donor.isAnonymous ? 'text-stone-400 italic' : 'text-stone-900'}`}>{donor.fullName}</h3>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase border ${donor.donationType === "Cash" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-orange-50 text-orange-700 border-orange-100"}`}>
                    {donor.donationType === "Cash" ? t.cash : t.materials}
                  </span>
                </div>
                <div className="bg-stone-50/80 rounded-lg p-2.5 border border-stone-100 text-xs space-y-1">
                  <div className="flex justify-between text-stone-400"><span>{t.contribution}:</span> <span className="font-bold text-stone-900">{donor.donationType === "Cash" && donor.amount ? `रू ${donor.amount.toLocaleString('en-IN')}` : donor.itemDonated}</span></div>
                  <div className="flex justify-between text-stone-400"><span>{t.purpose}:</span> <span className="text-stone-700 text-right">{donor.tributeItem || t.general}</span></div>
                </div>
              </div>
            )) : <div className="text-center py-8 bg-white rounded-xl border text-stone-500 text-xs">{t.noRecords}</div>}
          </div>
        </>
      )}
    </section>
  );
};

export default Donors;