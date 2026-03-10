"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageWithSkeleton from "./ImageWithSkeleton";
import AnimatedText from "./AnimateText";
import { Reveal } from "./Reveal";

export default function GalleryHero({ src, title, subtitle }) {
  const { scrollY } = useScroll();
  // Parallax effect for text: move up faster as you scroll down.
  const yHero = useTransform(scrollY, [0, 1000], [0, -400]);

  return (
    <section className="relative w-full h-screen md:h-screen flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <ImageWithSkeleton 
          src={src} 
          alt={title} 
          fill 
          priority={true}
          quality={90}
          sizes="100vw"
          className="object-cover object-center" 
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-black/30" />
        
        <motion.div 
          style={{ y: yHero }}
          className="absolute inset-0 w-full text-center flex flex-col items-center justify-center px-4 mt-20"
        >
          <Reveal>
            <p className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-white drop-shadow-md pb-2">
               {subtitle}
            </p>
            <AnimatedText 
              text={title} 
              className="font-antic text-4xl md:text-5xl lg:text-6xl leading-none mb-6 text-white tracking-[0.15em] uppercase font-light drop-shadow-xl" 
            />
           
          </Reveal>
        </motion.div>
      </motion.div>
    </section>
  );
}
