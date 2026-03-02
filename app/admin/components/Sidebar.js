'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Upload, Image as ImageIcon, Sparkles, LayoutGrid, MonitorPlay, Contact, LogOut, ArrowLeft, MessageSquare, Menu, X } from 'lucide-react';
import { logout } from '../actions/auth';
import { useState } from 'react';

const navItems = [
  { name: 'Upload Image', href: '/admin/upload', icon: Upload },
  { name: 'Manage Gallery', href: '/admin/manage', icon: ImageIcon },
  { name: 'Hero Backgrounds', href: '/admin/hero-bgs', icon: Sparkles },
  { name: 'Services Images', href: '/admin/services-bgs', icon: LayoutGrid },
  { name: 'Backgrounds', href: '/admin/backgrounds', icon: MonitorPlay },
  { name: 'Manage Reviews', href: '/admin/reviews', icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-3 right-4 z-50 p-2 bg-neutral-100 rounded-md text-black"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-200 flex flex-col text-black h-screen font-display z-50 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 border-b border-neutral-200 flex flex-col justify-center">
        <h1 className="text-2xl font-serif text-black uppercase tracking-widest text-center mt-2">
          DC Studio
        </h1>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors ${
                    isActive 
                      ? 'bg-black text-white font-medium shadow-md' 
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-black font-medium'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-neutral-200 space-y-2">
        <Link href="/" target="_blank" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-black rounded-md transition-colors font-medium">
          <ArrowLeft size={18} />
          Back to Live Site
        </Link>
        <form action={logout}>
          <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-sm bg-black text-white hover:bg-neutral-800 rounded-md transition-colors font-medium cursor-pointer">
            <LogOut size={18} />
            Logout
          </button>
        </form>
      </div>
    </aside>
    </>
  );
}
