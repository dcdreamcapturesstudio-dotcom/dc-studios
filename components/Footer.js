import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white md:rounded-t-[4rem] rounded-t-4xl pt-24 pb-12 px-6 lg:mx-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:items-end md:text-left gap-12 mb-16 md:mb-20">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-sedgwick text-4xl md:text-5xl mb-6">DC Studio</h2>
            <p className="text-neutral-400 max-w-sm mb-8 font-display leading-relaxed">
              Creating timeless memories through a lens of artistic vision and profound care. Let&apos;s make something beautiful together.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-serif text-2xl mb-6 md:text-right">Quick Links</h4>
            <ul className="flex flex-col items-center md:items-end space-y-4 text-neutral-400 font-display">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-center text-neutral-500 text-sm font-display">
          <p>&copy; {new Date().getFullYear()} DC Studio. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 md:mt-0 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/admin" className="hover:text-white transition-colors">Admin Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
