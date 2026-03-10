'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { categories } from "../lib/constants";
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const [heroImages, setHeroImages] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchHeroImages = async () => {
      const { data } = await supabase
        .from('hero_backgrounds')
        .select('image_url')
        .order('display_order', { ascending: true })
        .limit(2);
      
      if (data) {
        setHeroImages(data.map(item => item.image_url));
      }
    };
    fetchHeroImages();
  }, []);

  const isSolidPage = pathname === '/services' || pathname === '/portfolio' || pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past the Hero section (100vh minus ~80px for the header)
      if (window.scrollY > window.innerHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="md:px-10 px-4 h-20 flex items-center justify-between">
        <div className=" px-1 py-1 rounded">
          <Link href="/" className={`text-2xl md:text-4xl tracking-wider font-serif transition-colors duration-300 ${isScrolled || isSolidPage ? 'text-black' : 'text-white'}`}>
            <span className="font-sedgwick ">Dc Studios</span>
            <span className="uppercase font-display text-[8px] block  text-right relative bottom-[4px] md:bottom-1">Dream Captures</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-[13px] tracking-wide font-bold text-neutral-800 bg-neutral-200 px-4 rounded h-10 my-auto uppercase">
          <Link href="/" className="hover:text-neutral-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-neutral-600 transition-colors">About</Link>
          
          {/* Our Services Mega Menu */}
          <div className="group flex items-center h-full uppercase">
            <Link href="/services" className="hover:text-neutral-600 transition-colors flex items-center gap-1 py-1 border-b-2 border-transparent group-hover:border-white">
              Our Services <ChevronDown size={14} className="opacity-70" />
            </Link>
            
            <div className="absolute top-[50px] left-0 w-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 pt-4">
               <div className="max-w-7xl mx-auto flex  h-[250px] justify-end">
                    <div className="w-1/3 relative bg-black overflow-hidden group/img">
                     <Image 
                       src={heroImages[0] || "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg"}
                       alt="Adding Memories"
                       fill
                       className="object-cover opacity-60 group-hover/img:scale-105 transition-transform duration-700"
                     />
                     <div className="absolute inset-0 p-5 flex flex-col justify-start">
                        <h3 className="font-antic text-xl md:text-2xl text-white uppercase tracking-wider leading-snug max-w-sm font-light">
                           ADDING THE MEMORIES OF EVERY MOMENT
                        </h3>
                        <div className="mt-auto">
                           <span className="font-display text-3xl text-white font-light tracking-wider opacity-90 block capitalize" style={{ fontFamily: 'var(--font-sedgwick)' }}>
                              Dc Studios
                           </span>
                        </div>
                     </div>
                  </div>
                  {/* Left Side: Columns */}
                  <div className="w-1/2 bg-[#f4f2ef] p-12 flex justify-between">
                     <div className="w-1/2 flex flex-col gap-2 uppercase text-xs xl:text-md">
                        <span className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-bold mb-2">SET 1</span>
                        <Link href="/services/maternity" className="text-[#333] hover:text-black text-sm tracking-wide">Maternity Session</Link>
                        <Link href="/services/newborn-photography" className="text-[#333] hover:text-black text-sm tracking-wide">Newborn Session</Link>
                        <Link href="/services/baby-toddler" className="text-[#333] hover:text-black text-sm tracking-wide">Baby/Toddler Session</Link>
                        <Link href="/services/cake-smash" className="text-[#333] hover:text-black text-sm tracking-wide">Cake Smash Session</Link>
                     </div>
                     <div className="w-1/2 flex flex-col gap-2 uppercase text-xs xl:text-md">
                        <span className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-bold mb-2">SET 2</span>
                        <Link href="/services/family" className="text-[#333] hover:text-black text-sm tracking-wide">Family Session</Link>
                        <Link href="/services/child-sibling" className="text-[#333] hover:text-black text-sm tracking-wide">Child & Sibling Session</Link>
                        <Link href="/services/fashion" className="text-[#333] hover:text-black text-sm tracking-wide">Fashion Session</Link>
                     </div>
                  </div>

               </div>
            </div>
          </div>

          {/* Portfolio Mega Menu */}
          <div className="group flex items-center h-full">
            <Link href="/portfolio" className="hover:text-neutral-600 transition-colors flex items-center gap-1 py-1 border-b-2 border-transparent group-hover:border-white">
              Portfolio <ChevronDown size={14} className="opacity-70" />
            </Link>
            
            <div className="absolute top-[50px] left-0 w-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 pt-4">
               <div className="max-w-7xl mx-auto flex  h-[250px] justify-end">
                  {/* Right Side: Image with Text */}
                  <div className="w-1/3 relative bg-black overflow-hidden group/img">
                     <Image 
                       src={heroImages[1] || heroImages[0] || "/klara-kulikova-o1rq5GwVorY-unsplash.jpg"}
                       alt="Portfolio Highlights"
                       fill
                       className="object-cover opacity-60 group-hover/img:scale-105 transition-transform duration-700"
                     />
                     <div className="absolute inset-0 p-5 flex flex-col justify-start">
                        <h3 className="font-antic text-xl md:text-2xl text-white uppercase tracking-widest leading-snug max-w-sm font-light">
                           OUR BEST RECENT SESSIONS
                        </h3>
                        <div className="mt-auto">
                           <span className="font-display text-3xl text-white font-light tracking-wider opacity-90 block capitalize" style={{ fontFamily: 'var(--font-sedgwick)' }}>
                              Dc Studios
                           </span>
                        </div>
                     </div>
                  </div>
                  {/* Left Side: Columns */}
                  <div className="w-1/2 bg-[#f4f2ef] p-12 flex justify-between">
                     <div className="w-1/2 flex flex-col gap-3">
                        <span className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-bold mb-2">GALLERY SET 1</span>
                        {categories.slice(0, 3).map((category, idx) => (
                          <Link 
                            key={idx} 
                            href={`/gallery/${category.slug}`}
                            className="text-[#333] hover:text-black text-sm uppercase"
                          >
                            {category.name}
                          </Link>
                        ))}
                     </div>
                     <div className="w-1/2 flex flex-col gap-3">
                        <span className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-bold mb-2">GALLERY SET 2</span>
                        {categories.slice(3).map((category, idx) => (
                          <Link 
                            key={idx} 
                            href={`/gallery/${category.slug}`}
                            className="text-[#333] hover:text-black text-sm uppercase"
                          >
                            {category.name}
                          </Link>
                        ))}
                     </div>
                  </div>

                

               </div>
            </div>
          </div>
          <Link href="/contact" className="hover:text-neutral-600 transition-colors">Contact Us</Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button 
          suppressHydrationWarning
          className="md:hidden text-black p-1 z-50 bg-white/90 rounded border border-neutral-200"
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
        <nav className="flex flex-col gap-6 text-xl text-neutral-300">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-md uppercase tracking-widest font-bold">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-md uppercase tracking-widest font-bold">About</Link>
          
          <div className="flex flex-col gap-2">
            <button 
              suppressHydrationWarning
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="text-white text-md uppercase tracking-widest font-bold flex items-center justify-between w-full text-left"
            >
              Our Services
              <ChevronDown size={16} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`flex flex-col gap-3 pl-4 border-l border-neutral-800 overflow-hidden transition-all duration-300 ${mobileServicesOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <Link href="/services/maternity" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-neutral-400 text-sm">Maternity Session</Link>
              <Link href="/services/newborn-photography" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-neutral-400 text-sm">Newborn Session</Link>
              <Link href="/services/baby-toddler" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-neutral-400 text-sm">Baby/Toddler Session</Link>
              <Link href="/services/cake-smash" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-neutral-400 text-sm">Cake Smash Session</Link>
              <Link href="/services/family" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-neutral-400 text-sm">Family Session</Link>
              <Link href="/services/child-sibling" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-neutral-400 text-sm">Child & Sibling Session</Link>
              <Link href="/services/fashion" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-neutral-400 text-sm">Fashion Session</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <button 
              suppressHydrationWarning
              onClick={() => setMobilePortfolioOpen(!mobilePortfolioOpen)}
              className="text-white text-md uppercase tracking-widest font-bold flex items-center justify-between w-full text-left"
            >
              Portfolio
              <ChevronDown size={16} className={`transition-transform duration-300 ${mobilePortfolioOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`flex flex-col gap-3 pl-4 border-l border-neutral-800 overflow-hidden transition-all duration-300 ${mobilePortfolioOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              {categories.map((category, idx) => (
                <Link 
                  key={idx} 
                  href={`/gallery/${category.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white transition-colors text-neutral-400 text-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors text-md uppercase tracking-widest font-bold">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}
