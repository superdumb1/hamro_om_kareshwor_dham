"use client";
import React, { useState } from 'react';

const Membership = () => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Official Registered General body members roster
  const registeredMembers = [
    { id: 1, name: "Bishwanath Baral", address: "Mechinagar-12", memberId: "OKSM-2026-001", joinedDate: "Jan 15, 2026", status: "Active Member" },
    { id: 2, name: "Anup Rajbanshi", address: "Mechinagar-11", memberId: "OKSM-2026-042", joinedDate: "Feb 10, 2026", status: "Active Member" },
    { id: 3, name: "Janak Khadka", address: "Mechinagar-13", memberId: "OKSM-2026-089", joinedDate: "Mar 02, 2026", status: "Active Member" },
    { id: 4, name: "Pankaj Dhakal", address: "Mechinagar-14", memberId: "OKSM-2026-114", joinedDate: "April 20, 2026", status: "Active Member" },
    { id: 5, name: "Kiran Prasad Sharma", address: "Jyamirgadhi", memberId: "OKSM-2025-312", joinedDate: "Nov 18, 2025", status: "Active Member" }
  ];

  // Filter roster by name or local ward location
  const filteredMembers = registeredMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch mb-12">
        
        {/* Left Column: Cost & Core Access */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                  Official Tier
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-serif mt-1">General Samity Membership</h3>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-stone-950 font-sans">NPR 1,100</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">One-Time Registration</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
              Our temple is proudly supported by a vast network of dedicated community members. This registration fee goes directly into the central temple trust to fund structural maintenance and physical preservation.
            </p>

            <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3">
              <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <span>🛡️</span> Strict Samity Access Lock
              </p>
              <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                Membership is the <strong>only way</strong> for citizens to join the official *Samity Management Committee*. Outside individuals cannot access executive logs, manage event dashboards, or alter financial files.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowInquiryModal(true)}
            className="w-full mt-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow transition-colors"
          >
            Request Membership Form
          </button>
        </div>

        {/* Right Column: Key Privileges & Responsibilities */}
        <div className="bg-stone-100/50 border border-stone-200/60 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-sans mb-3">
              What does Membership include?
            </h3>
            
            <ul className="space-y-3.5 m-0 p-0 list-none text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-bold text-base leading-none">✓</span>
                <div>
                  <strong>Samity Executive Eligibility:</strong> Qualify to step into leadership roles within the central committee or specific sub-committees (Nirman, Pooja, etc.).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-bold text-base leading-none">✓</span>
                <div>
                  <strong>Voting & Governance Rights:</strong> Take part in general body assemblies to elect working committee representatives and vote on structural policy revisions.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-bold text-base leading-none">✓</span>
                <div>
                  <strong>Development Auditing:</strong> Review the official blueprints, financial ledgers, and construction logs regarding how temple property is expanded.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200/60 text-[11px] text-stone-400 text-center font-medium">
            *Applications are subject to background review by the acting board directors.
          </div>
        </div>
      </div>

      {/* 🏛️ Section Divider Line */}
      <hr className="border-t border-stone-200 my-10 max-w-5xl mx-auto" />

      {/* 👥 REGISTERED MEMBERS DIRECTORY */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center sm:text-left mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
              General Body <span className="text-orange-600 font-normal font-sans">Roster</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Public transparency ledger of active, verified mandir general members.
            </p>
          </div>

          {/* Inline Filter Search bar */}
          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              placeholder="Search member directory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-orange-500 shadow-sm transition-colors text-stone-800"
            />
          </div>
        </div>

        {/* Desktop Member Table View */}
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

        {/* Mobile Member Card View */}
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
      </div>

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