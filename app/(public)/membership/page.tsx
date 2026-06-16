"use client";
import React, { useState } from 'react';
import MemberList from './components/MemberList';

const Membership = () => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [isSectionExpanded, setIsSectionExpanded] = useState(false);

  return (
    <section id="membership" className="py-10 px-4 max-w-7xl mx-auto bg-stone-50 min-h-[500px]">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
          Mandir <span className="text-orange-600 font-normal font-sans">Membership</span>
        </h2>
        <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2 rounded-full" />
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
          Become a formal pillar of our community. Membership offers the exclusive path to driving the long-term vision of Om Kareshwor Siwalaya.
        </p>
      </div>

      {/* 🏛️ MASTER ACCORDION TRIGGER PANEL */}
      <div className="max-w-3xl mx-auto bg-white border border-stone-200/80 rounded-2xl shadow-sm overflow-hidden mb-12">
        <button
          onClick={() => setIsSectionExpanded(!isSectionExpanded)}
          className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-6 text-left hover:bg-stone-50/50 transition-colors focus:outline-none gap-4"
        >
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
              Registration Portal
            </span>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif mt-1.5 flex items-center gap-2">
              How to Become a Mandir General Member
            </h3>
            <p className="text-xs text-stone-500 mt-0.5 font-normal">
              Click to view pricing, committee lock rules, voting rights, and application procedures.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider font-sans bg-orange-50/50 px-3 py-1 rounded-lg border border-orange-100">
              {isSectionExpanded ? "Hide Details" : "Inquire & View Details"}
            </span>
            <span className={`text-stone-400 font-mono text-sm transition-transform duration-200 ${isSectionExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
        </button>

        {/* Unrolled Accordion Body */}
        <div className={`transition-all duration-300 overflow-hidden ${isSectionExpanded ? 'max-h-[1500px] border-t border-stone-100 p-6 bg-stone-50/30' : 'max-h-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Cost & Access Rules */}
            <div className="bg-white border border-stone-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-stone-100 pb-3 mb-3">
                  <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wider font-sans">Samity Cost</h4>
                  <div className="text-right">
                    <p className="text-lg font-black text-stone-950 font-sans">NPR 1,100</p>
                    <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wide">One-Time Registration</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  This registration fee goes directly into the central temple trust to fund structural maintenance and physical preservation.
                </p>

                <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3">
                  <p className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                    <span>🛡️</span> Strict Samity Access Lock
                  </p>
                  <p className="text-[10px] text-stone-600 mt-1 leading-relaxed">
                    Membership is the <strong>only way</strong> to join the official *Samity Management Committee*. Outside individuals cannot alter financial files or manage event dashboards.
                  </p>
                </div>
              </div>
            </div>

            {/* Privileges List */}
            <div className="bg-white border border-stone-200/60 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-800 font-sans mb-3">
                  Included Privileges
                </h4>
                
                <ul className="space-y-3 m-0 p-0 list-none text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold leading-none">✓</span>
                    <div><strong>Executive Eligibility:</strong> Qualify to step into leadership roles within sub-committees.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold leading-none">✓</span>
                    <div><strong>Voting Rights:</strong> Take part in general assemblies to elect representatives.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold leading-none">✓</span>
                    <div><strong>Development Auditing:</strong> Review construction logs and official financial ledgers.</div>
                  </li>
                </ul>
              </div>
              
              <div className="mt-4 pt-3 border-t border-stone-100 text-[10px] text-stone-400 text-center font-medium">
                *Applications are subject to board verification.
              </div>
            </div>

          </div>

          {/* Action Trigger Button at the very bottom inside the unrolled accordion */}
          <div className="mt-6 pt-4 border-t border-stone-100">
            <button
              onClick={() => setShowInquiryModal(true)}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow transition-colors"
            >
              Proceed to Request Membership Form
            </button>
          </div>
        </div>
      </div>

      {/* 🏛️ Section Divider Line */}
      <hr className="border-t border-stone-200 my-10 max-w-5xl mx-auto" />

      <MemberList />
      {/* 📋 Application Request Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-base font-bold font-serif text-stone-900">
                Join the Mandir Samity
              </h4>
              <button 
                onClick={() => setShowInquiryModal(false)}
                className="text-stone-400 hover:text-stone-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              To keep our core committee strictly local and secure, formal memberships are initialized offline. Please message or call our records clerk to request a printed registration slip.
            </p>

            <div className="space-y-2">
              <a 
                href={`https://wa.me/977XXXXXXXXXX?text=Hello%20Om%20Kareshwor%20Siwalaya%20Samity,%20I%20would%20like%20to%20apply%20for%20the%20General%20Membership%20(NPR%201100).%20Please%20provide%20the%20form%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                💬 Request Form via WhatsApp
              </a>
              
              <a 
                href="tel:+977XXXXXXXXXX"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                📞 Call Committee Desk
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Membership;