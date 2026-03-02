"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "./AnimateText";
import { Reveal } from "./Reveal";

export default function Services({ services = [] }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Alternating movement vectors: odd items go up noticeably, even items drift slightly down
  const yUp = useTransform(scrollYProgress, [0, 1], [20, -80]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-0, 40]);

  const [isMobile, setIsMobile] = useState(true); // default to true to prevent initial clash
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="services" ref={containerRef} className="py-24 md:py-40 bg-white px-6 relative overflow-hidden">
      {/* Decorative Flowers */}
      <div className="absolute top-0 -left-16 w-64 md:w-64 aspect-square pointer-events-none opacity-60 mix-blend-multiply z-0">
        <Image src="/flower1.png" alt="Floral decoration top left" fill className="object-contain object-top-left rotate-45" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 md:w-96 aspect-square pointer-events-none opacity-60 mix-blend-multiply z-0">
        <Image src="/flower2.png" alt="Floral decoration bottom right" fill className="object-contain object-bottom-right" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Our Expertise</h3>
          <AnimatedText text="Our Services" className="font-antic text-4xl md:text-6xl mb-16 text-black uppercase" />
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16 md:gap-8 lg:gap-12 pb-16">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              style={{ y: isMobile ? 0 : (idx % 2 === 0 ? yUp : yDown) }}
              className="h-full"
            >
              <Reveal>
                <div className="group border-t border-neutral-200 pt-8 hover:border-neutral-600 transition-colors duration-500 cursor-pointer h-full flex flex-col">
                  <AnimatedText text={service.title} className="font-serif text-3xl mb-4 group-hover:text-black transition-colors" />
                  <p className="text-neutral-600 font-display leading-relaxed mb-6 grow">{service.desc}</p>
                  
                  <div className="relative w-full h-56 md:h-64 overflow-hidden mb-6">
                    <Image 
                      src={service.image_url} 
                      alt={service.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <ArrowRight className="text-white transform translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500" size={32} />
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
