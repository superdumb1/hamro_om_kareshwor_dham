"use client";
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const navItems = [
    { name: "Home", href: "/", isActive: true },
    { name: "Blogs", href: "/blogs", isActive: false },
    { name: "Hall of Donors", href: "/hallofdoners", isActive: false },
    { name: "Membership", href: "/membership", isActive: false },
    { name: "Events", href: "/events", isActive: false },
    { name: "Contact Us", href: "#footer", isActive: false },
  ];

  return (
    <header className="bg-white border-b border-stone-200 shadow-sm relative z-50">
      {/* Minimalist Top Bar */}
      <div className="bg-stone-50 border-b border-stone-100 text-stone-600 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans tracking-wide">
          <div className="flex items-center gap-1.5 text-stone-500">
            <svg className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="font-medium">J4Q4+W56, Jyamirgadhi 57207</span>
          </div>
          <div className="text-orange-700 font-semibold tracking-widest hidden xs:block">
            ॐ नमः शिवाय
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Temple Identity */}
        <Link href="/" className="flex items-center gap-3 w-fit">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-serif">
              Om Kareshwor <span className="text-orange-600 font-normal font-sans text-lg sm:text-xl">Siwalaya</span>
            </h1>
            <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-0.5">
              Community Mandir &bull; Jyamirgadhi
            </p>
          </div>
        </Link>

        {/* Navigation Menu (No layout gaps or container background colors) */}
        <nav className="mt-3">
          <ul className="flex items-center flex-wrap m-0 p-0 list-none">
            {navItems.map((item, index) => (
              <React.Fragment key={item.name}>
                {/* Individual Link Button Container */}
                <li className="min-w-[30%] sm:flex-none">
                  <a
                    href={item.href}
                    className={`block w-full px-2 py-2 text-[15px] font-semibold rounded-lg border text-center transition-all duration-150 whitespace-nowrap tracking-wide uppercase text-xs ${
                      item.isActive
                        ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                        : "bg-stone-100 text-stone-700 border-stone-200/60 hover:bg-stone-200 hover:text-stone-900 active:scale-95"
                    }`}
                  >
                    {item.name}
                  </a>
                </li>

                {/* Wrap break row precisely after every 3 items */}
                {(index + 1) % 3 === 0 && <div className="w-full h-0 m-0 p-0" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;