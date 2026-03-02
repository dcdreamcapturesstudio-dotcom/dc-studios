"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

export default function WhyUs({ bgImage = "/toa-heftiba-C-8uOz7GluA-unsplash.jpg" }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Moves the entire image block for a faster, dramatic parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Decorative Flowers */}
      <div className="absolute top-2 left-0 w-64 md:w-96 md:-mt-10 aspect-square pointer-events-none opacity-60 mix-blend-multiply z-0">
        <Image src="/flower1.png" alt="Floral decoration top left" fill className="object-contain object-top-left -rotate-45" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 md:w-96 aspect-square pointer-events-none opacity-60 mix-blend-multiply z-0">
        <Image src="/flower2.png" alt="Floral decoration bottom right" fill className="object-contain object-bottom-right" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16 pb-16">
        <div className="flex flex-col lg:flex-row shadow-2xl  max-w-6xl mx-auto">
          {/* Left: Image with Parallax (Whole Div Moves) */}
          <motion.div 
            style={{ y }}
            className="w-full lg:w-1/2 h-[60vh] lg:h-auto lg:min-h-[700px] relative bg-neutral-100 shadow-[0_0_40px_rgba(0,0,0,0.1)] z-20"
          >
            <Image 
              src={bgImage} 
              alt="Studio session" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
              className="object-cover"
            />
          </motion.div>

          {/* Right: Content with Elegant Frame */}
          <div className="w-full lg:w-1/2 bg-[#b9a8a8] py-16 px-8 md:px-12 lg:px-20 flex flex-col justify-center items-center text-center relative z-10">
            <Reveal>
              {/* Elegant Border Frame */}
              <div className="relative border border-neutral-900/60 w-full py-16 md:py-24 px-6 md:px-10 flex flex-col items-center justify-center">
                {/* Extending vertical lines */}
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-neutral-800"></div>
                <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-neutral-800"></div>

                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-neutral-600 mb-6 font-display inline-block bg-[#f8f8f8] px-2 relative z-10 -mt-1">
                  Let's Work Together
                </h4>
                
                <h2 className="font-antic text-3xl md:text-4xl lg:text-[42px] leading-snug text-neutral-800 mb-8 uppercase max-w-[320px] mx-auto">
                  Let's hold every photo with <span className="block mt-2">new view</span>
                </h2>
                
                <p className="text-neutral-600 font-display text-sm md:text-base max-w-[280px] mx-auto mb-12 leading-relaxed">
                  We are here to capture all your special moments in a very creative and aesthetic manner.
                </p>
                
                <Link href="/contact" className="px-10 py-4 bg-[#313b44] text-white text-xs tracking-[0.15em] hover:bg-black transition-colors uppercase inline-block font-semibold">
                  Contact Me
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
