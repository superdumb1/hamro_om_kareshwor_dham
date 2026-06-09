"use client";
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id='footer' className="bg-stone-950 text-stone-400 pt-12 pb-6 px-4 border-t-2 border-orange-600 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Column 1: Mandir Identity */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛕</span>
            <h3 className="text-white text-base font-bold font-serif tracking-tight">
              Om Kareshwor <span className="text-orange-500 font-sans font-normal">Siwalaya</span>
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-stone-500">
            A sacred sanctuary for spiritual growth, cultural preservation, and community unity. Built and sustained by the dedication of local devotees.
          </p>
          <div className="pt-1 flex items-center gap-3 text-stone-500">
            {/* Simple placeholder social anchors */}
            <a href="#facebook" className="hover:text-orange-500 transition-colors text-sm" aria-label="Facebook">🌐 FB</a>
            <a href="#youtube" className="hover:text-orange-500 transition-colors text-sm" aria-label="YouTube">📺 YT</a>
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div>
          <h4 className="text-stone-200 text-xs font-bold uppercase tracking-widest mb-3.5">
            Quick Navigation
          </h4>
          <ul className="space-y-2 m-0 p-0 list-none text-xs">
            <li>
              <a href="#about" className="hover:text-white transition-colors">Our History</a>
            </li>
            <li>
              <a href="#blogs" className="hover:text-white transition-colors">Blogs & Journals</a>
            </li>
            <li>
              <a href="#donors" className="hover:text-white transition-colors">Hall of Donors</a>
            </li>
            <li>
              <a href="#membership" className="hover:text-white transition-colors">Samity Membership</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Regional Location Reference */}
        <div>
          <h4 className="text-stone-200 text-xs font-bold uppercase tracking-widest mb-3.5">
            Holy Site Location
          </h4>
          <address className="not-italic text-xs space-y-2 text-stone-400">
            <p className="font-semibold text-stone-300">Om Kareshwor Siwalaya Mandir</p>
            <p>Jyamirgadhi, Mechinagar Municipality</p>
            <p>Jhapa, Koshi Province, Nepal</p>
            <p className="text-[11px] text-stone-500 mt-1">📍 Serving Wards 11, 12, 13, & 14</p>
          </address>
        </div>

        {/* Column 4: Contact Desk */}
        <div>
          <h4 className="text-stone-200 text-xs font-bold uppercase tracking-widest mb-3.5">
            Committee Desk
          </h4>
          <ul className="space-y-2.5 m-0 p-0 list-none text-xs">
            <li className="flex items-center gap-2">
              <span className="text-stone-500">📞</span>
              <a href="tel:+977XXXXXXXXXX" className="hover:text-white transition-colors font-mono">+977-XXXXXXXXXX</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-stone-500">✉️</span>
              <a href="mailto:info@omkareshworsiwalaya.org" className="hover:text-white transition-colors">info@omkareshworsiwalaya.org</a>
            </li>
            <li className="pt-1">
              <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-emerald-500 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
                Gate Open • 5:00 AM - 8:00 PM
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* 📜 Bottom Strip Line */}
      <div className="max-w-7xl mx-auto pt-5 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-600 font-medium">
        <div>
          &copy; {currentYear} Om Kareshwor Siwalaya Samity. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-stone-400 transition-colors">Privacy Terms</a>
          <span>•</span>
          <a href="#terms" className="hover:text-stone-400 transition-colors">Trust Governance</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;