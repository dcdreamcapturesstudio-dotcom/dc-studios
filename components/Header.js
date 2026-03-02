'use client';

import { useState } from 'react';
import Link from "next/link";
import { categories } from "../lib/constants";
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="md:px-10 px-4 h-20 flex items-center justify-between">
        <div className=" px-1 py-1 rounded">
          <Link href="/" className="text-2xl tracking-wider font-serif text-neutral-200"><span className="font-sedgwick">DC Studios</span></Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400 bg-neutral-900 px-3 py-1 rounded">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          
          {/* Gallery Dropdown Group */}
          <div className="relative group flex items-center h-full">
            <Link href="/#gallery" className="hover:text-white transition-colors flex items-center gap-1 py-1">
              Gallery
            </Link>
            
            {/* Dropdown Menu (Hidden by default, shown on group hover) */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-lg p-2 min-w-48 shadow-2xl flex flex-col gap-1">
                {categories.map((category, idx) => (
                  <Link 
                    key={idx} 
                    href={`/gallery/${category.slug}`}
                    className="px-4 py-2 hover:bg-white/10 hover:text-white rounded transition-colors text-neutral-400 text-sm whitespace-nowrap"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden text-neutral-200 p-1 z-50 bg-neutral-900/90  rounded"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation Sidebar */}
      <div 
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-500 flex flex-col pt-24 px-8 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-4 text-xl text-neutral-300">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">About</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Services</Link>
          
          <div className="flex flex-col gap-4">
            <span className="text-white">Gallery</span>
            <div className="flex flex-col gap-3 pl-4 border-l border-neutral-800">
              {categories.map((category, idx) => (
                <Link 
                  key={idx} 
                  href={`/gallery/${category.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white transition-colors text-neutral-400 text-lg"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
