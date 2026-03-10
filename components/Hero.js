"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function Hero({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Handle slideshow timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 7 seconds
    return () => clearInterval(timer);
  }, []);

  // Preload next image to eliminate transition stutter
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const img = new window.Image();
    img.src = images[nextIndex];
  }, [currentIndex]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-black min-h-screen flex flex-col pt-32 pb-4 md:pb-12">
      {/* Background Images Slider */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" style={{ willChange: 'transform' }}>
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full transform-gpu"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.07 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 5, ease: "easeInOut" },
              scale: { duration: 10, ease: "linear" }, // Gentle subtle zoom
            }}
          >
            <ImageWithSkeleton
              src={images[currentIndex]}
              alt="Hero background image"
              fill
              priority={currentIndex === 0}
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      <div className="relative z-20 flex-1 flex flex-col justify-between w-full h-full">
        {/* Top Section */}
        <motion.div 
          className="text-center mt-60 md:mt-40"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="font-antic text-2xl lg:text-2xl tracking-[0.5em] text-white uppercase mb-4"
          >
            Dream Capture Studio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-xs md:text-sm tracking-[0.4em] text-neutral-300 uppercase font-semibold"
          >
            Est. 2019
          </motion.p>
        </motion.div>

        {/* Bottom Section - 3 columns */}
        <motion.div 
          className="max-w-screen-3xl mx-auto w-full px-2 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.0, ease: "easeInOut" }}
        >
          {/* Column 1 */}
          <div className="flex flex-col items-center justify-end text-center md:border-r border-white/30 md:pr-8 py-4 pb-15 md:pb-0">
            <p className="text-lg md:text-lg text-neutral-200  mb-2">Get In Touch</p>
            <p className="text-xs md:text-xs tracking-[0.2em] text-neutral-200 uppercase mb-2">
              We are here to help you to <br/>
              remember the best days
            </p>
            <a 
              href="#contact" 
              className="inline-block font-antic uppercase text-md md:text-lg text-white hover:text-neutral-300 transition-colors transform hover:scale-95 duration-800 border px-4 py-2 tracking-widest"
            >
              Contact Us
            </a>
            
          </div>

          {/* Column 2 */}
          <div className="md:flex flex-col items-center justify-end text-center md:px-12 py-4 hidden">
            <p className="font-serif italic text-xl md:text-2xl lg:text-2xl text-white leading-relaxed md:leading-[1.6] font-light tracking-wide">
              Because every picture should be unique.
              Making your special day. We will make a
              wonderful story
            </p>
          </div>

          {/* Column 3 */}
          <div className="md:flex flex-col items-center justify-end text-center md:border-l border-white/30 md:pl-8 py-4 hidden">
<p className="text-[7px] md:text-lg text-neutral-200  mb-2">Our Portfolio</p>
            <p className="text-[10px] md:text-xs tracking-[0.2em] text-neutral-200 uppercase mb-2">
              They are the memories.<br/>
              Real life, real memories
            </p>
            <a 
              href="/portfolio" 
              className="inline-block font-serif italic text-xl md:text-2xl text-white hover:text-neutral-300 transition-colors underline underline-offset-2 hover:underline-offset-4 transform hover:scale-105 duration-800"
            >
              View Portfolio
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
