"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUp, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { Reveal } from "./Reveal";

export default function TestimonialSlider({ testimonials, staticImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left

  if (!testimonials || testimonials.length === 0) return null;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const img1 = staticImages && staticImages.length > 0 ? staticImages[0] : (testimonials[0]?.image || "/toa-heftiba-C-8uOz7GluA-unsplash.jpg");
  const img2 = staticImages && staticImages.length > 1 ? staticImages[1] : (testimonials[1]?.image || img1);

  return (
    <section className="bg-[#f2f2f1] relative py-32 px-6 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto w-full relative h-full flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Left Side: Staggered Static Images */}
        <div className="hidden xl:flex w-full xl:w-[45%] relative h-[800px] items-center">
           <div className="absolute left-0 top-0 w-3/5 aspect-[3/4] z-10 shadow-xl overflow-hidden">
             <ImageWithSkeleton src={img1} alt="Portfolio 1" fill className="object-cover" />
           </div>
           <div className="absolute right-0 bottom-12 w-[60%] aspect-[4/5] z-20 shadow-2xl overflow-hidden">
             <ImageWithSkeleton src={img2} alt="Portfolio 2" fill className="object-cover" />
           </div>
        </div>

        {/* Right Side: Stack Slider */}
        <div className="w-full xl:w-1/2 flex flex-col xl:pl-16 relative z-30">
           <Reveal>
             <h2 className="font-antic tracking-[0.4em] text-sm md:text-base text-black uppercase font-bold mb-16 text-center xl:text-left">
               TESTIMONIALS
             </h2>
           </Reveal>

           {/* Stack Container */}
           <div className="relative w-full min-h-[500px] lg:h-[550px] max-w-xl mx-auto xl:mx-0">
             <AnimatePresence initial={false} mode="wait">
               <motion.div
                 key={currentIndex}
                 initial={{ 
                   x: direction > 0 ? 100 : -100, 
                   opacity: 0,
                   rotate: direction > 0 ? 5 : -5,
                   scale: 0.9 
                 }}
                 animate={{ 
                   x: 0, 
                   opacity: 1,
                   rotate: 0,
                   scale: 1 
                 }}
                 exit={{ 
                   x: direction > 0 ? -100 : 100, 
                   opacity: 0,
                   rotate: direction > 0 ? -5 : 5,
                   scale: 0.9 
                 }}
                 transition={{ 
                   type: "spring", 
                   stiffness: 300, 
                   damping: 30 
                 }}
                 className="absolute inset-0 w-full h-full bg-white shadow-2xl p-8 lg:p-14 flex flex-col justify-center border border-neutral-100"
               >
                 <Quote className="text-neutral-100 absolute top-8 left-8 w-24 h-24 -z-10" />
                 
                 <p className="font-serif italic text-base lg:text-lg text-[#333] leading-relaxed mb-10 relative z-10 overflow-y-auto no-scrollbar">
                   "{testimonials[currentIndex].text || testimonials[currentIndex].review_text}"
                 </p>
                 
                 <div className="flex items-center gap-6 mt-auto relative z-10">
                    {testimonials[currentIndex].image && (
                      <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden">
                        <ImageWithSkeleton
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].author || testimonials[currentIndex].client_name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    )}
                    <div>
                       <div className="flex items-center gap-0.5 mb-2">
                         {[1, 2, 3, 4, 5].map((star) => (
                           <Star 
                             key={star} 
                             size={14} 
                             className={star <= (testimonials[currentIndex].rating || 5) ? 'text-black fill-black' : 'text-neutral-200'} 
                           />
                         ))}
                       </div>
                       <h4 className="text-xs tracking-[0.2em] text-black font-bold uppercase mb-2">
                         {testimonials[currentIndex].author || testimonials[currentIndex].client_name}
                       </h4>
                       <p className="text-[10px] tracking-widest text-neutral-500 uppercase">
                         {testimonials[currentIndex].sessionType || testimonials[currentIndex].session_type || "CLIENT REVIEW"}
                       </p>
                    </div>
                 </div>
               </motion.div>
             </AnimatePresence>

             {/* Background Stack Decoration */}
             <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 bg-white/50 border border-neutral-100 shadow-sm" />
             <div className="absolute inset-0 -z-20 translate-x-8 translate-y-8 bg-white/30 border border-neutral-100 shadow-sm" />
           </div>

           {/* Controls */}
           <div className="flex items-center justify-center xl:justify-end max-w-xl mx-auto xl:mx-0 w-full mt-14 gap-8 pr-0 xl:pr-12">
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "bg-black w-6" : "bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={prevSlide}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-sm text-neutral-600 border border-neutral-100"
                >
                  <ArrowLeft size={20} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-sm text-neutral-600 border border-neutral-100"
                >
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
           </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-6 md:right-12 z-50">
         <button 
           onClick={scrollToTop}
           className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors bg-transparent"
           aria-label="Scroll to top"
         >
           <ArrowUp size={20} strokeWidth={1.5} />
         </button>
      </div>
    </section>
  );
}
