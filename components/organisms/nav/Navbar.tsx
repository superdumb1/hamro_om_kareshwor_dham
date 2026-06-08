"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Blogs", href: "#blogs" },
    { name: "Hall of Donors", href: "#donors" },
    { name: "Membership", href: "#membership" },
    { name: "Events", href: "#events" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-shaded border-b border-border z-50 px-4 flex items-center justify-between">
      
      {/* Left: Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-card transition active:scale-90"
        aria-label="Toggle Menu"
      >
        <div className="space-y-1.5">
          <span className="block w-6 h-0.5 bg-text"></span>
          <span className="block w-6 h-0.5 bg-text"></span>
          <span className="block w-6 h-0.5 bg-text"></span>
        </div>
      </button>

      {/* Center Logo */}
      <Link
        href="/"
        className="font-bold text-primary tracking-tight text-lg"
      >
        OM KARESHWOR
      </Link>

      {/* Right Login */}
      <Link
        href="/login"
        className="bg-primary text-text-invert px-4 py-1.5 rounded-full text-sm font-semibold hover:opacity-90 transition active:scale-95"
      >
        Login
      </Link>

      {/* Overlay */}
      {isOpen && (
        <>
          {/* Background blur */}
          <div
            className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-bg border-r border-border z-50 p-6 animate-in slide-in-from-left duration-300">
            <ul className="space-y-5 text-lg font-medium">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className="border-b border-border pb-3 transition-transform duration-200 text-primary  hover:scale-105 hover:text-primary"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block w-full"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}