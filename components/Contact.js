"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import AnimatedText from "./AnimateText";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-40 bg-black text-white flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <Reveal>
          <AnimatedText 
            text="Say Hello" 
            className="font-serif text-5xl sm:text-6xl md:text-8xl leading-none text-white mb-8" 
          />
        </Reveal>

        <Reveal>
          <p className="text-neutral-400 font-display text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed">
            We'd love to discuss your vision. Reach out through any of our channels to check availability and book your session at DC Studios.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-12">
              <Link href="/contact" className="px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:bg-neutral-200 transition inline-flex items-center gap-3 group">
                Let's Connect <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
        </Reveal>
      </div>
    </section>
  );
}
