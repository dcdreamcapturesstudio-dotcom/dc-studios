"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedText from "./AnimateText";
import { Reveal } from "./Reveal";
import Header from "./Header";
import Footer from "./Footer";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import ServiceFAQGrid from "./ServiceFAQGrid";
import ServiceDarkLinks from "./ServiceDarkLinks";
import PortfolioGridButton from "./PortfolioGridButton";
import TestimonialSlider from "./TestimonialSlider";
import MemoriesRow from "./MemoriesRow";
import HomePortfolioPreview from "./HomePortfolioPreview";

const getSectionImages = (sectionIndex, galleryImages) => {
  const count = 8;
  const start = sectionIndex * count;
  
  if (!galleryImages || galleryImages.length === 0) {
    return [];
  }

  const result = [];
  for (let i = 0; i < count; i++) {
    // Cycle through the available gallery images to ensure we always have 8
    // but with much better variety than just repeating a slice
    const imageIndex = (start + i) % galleryImages.length;
    result.push(galleryImages[imageIndex]);
  }
  return result;
};

const ImageCarousel = ({ images }) => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };

  const scrollToImage = (index) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollContainerRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-[650px] group">
        {/* Horizontal scroll container */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar aspect-3/4 md:aspect-4/3 bg-neutral-100"
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full shrink-0 h-full relative snap-start">
              <Image 
                src={img} 
                alt="carousel"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={scrollLeft}
              className="absolute left-1 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-opacity opacity-100 group-hover:opacity-100 md:opacity-100 z-10 p-2"
            >
              <ChevronLeft size={36} className="drop-shadow-md" />
            </button>
            <button 
              onClick={scrollRight}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-opacity opacity-100 group-hover:opacity-100 md:opacity-100 z-10 p-2"
            >
              <ChevronRight size={36} className="drop-shadow-md" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div className="flex gap-2.5 mt-6">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToImage(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'bg-black w-6' : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PackageBlock = ({ pkg, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="py-20 md:py-32 bg-[#fafafa]">
      <div className={`max-w-screen-2xl mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
        
        {/* Image Carousel Side */}
        <div className="w-full lg:w-[55%]">
           <ImageCarousel images={pkg.images} />
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center max-w-lg mx-auto lg:mx-0 px-6 md:px-0">
          <Reveal>
             {/* Vertical line matching mockup */}
             <div className="w-px h-16 md:h-20 bg-black mb-8 md:mb-12"></div>
             
             <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] leading-snug text-[#1a1a1a] uppercase mb-4 whitespace-pre-line tracking-wide">
               {pkg.title}
             </h2>
             <h3 className=" text-xs md:text-sm tracking-[0.2em] text-[#333] mb-10 uppercase font-medium">
               {pkg.subtitle}
             </h3>
             
             <div className="text-[#444] text-base md:text-lg mb-12 leading-relaxed max-w-lg">
               <p>{pkg.description}</p>
             </div>

             <Link 
               href="/#contact" 
               className="inline-block border border-black px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold text-black hover:bg-black hover:text-white transition-colors duration-300"
             >
               CONTACT US
             </Link>
          </Reveal>
        </div>
        
      </div>
    </div>
  );
};

export default function ServiceDetail({ slug, serviceTitle, heroImage, detailsData, galleryImages = [], bgItems = [] }) {
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  // Hero section parallax: scroll up faster. 
  // For every 1000px scrolled, the element moves up an extra 400px.
  const yHero = useTransform(scrollY, [0, 1000], [0, -400]);

  return (
    <div className="bg-[#fafafa] min-h-screen text-black overflow-x-hidden font-display selection:bg-black selection:text-white">
      <Header />
      
      <main>
        {/* Full Bleed Cinematic Hero Matching Mockup 1 with Parallax on Text */}
        <section className="relative w-full h-screen md:h-screen flex items-center justify-center overflow-hidden bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={heroImage} 
              alt={serviceTitle} 
              fill 
              priority={true}
              quality={90}
              sizes="100vw"
              className="object-cover object-center" 
            />
            {/* Dark gradient overlay to make text pop gently */}
            <div className="absolute inset-0 bg-black/30" />
            
            <motion.div 
              style={{ y: yHero }}
              className="absolute inset-0 w-full text-center flex flex-col items-center justify-center px-4 mt-20"
            >
              <Reveal>
                <AnimatedText 
                  text={detailsData.heroTitle} 
                  className="font-antic text-4xl md:text-5xl lg:text-6xl leading-none mb-6 text-white tracking-widest uppercase font-light drop-shadow-xl" 
                />
                <p className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-white drop-shadow-md">
                   {detailsData.heroSubtitle}
                </p>
              </Reveal>
            </motion.div>
          </motion.div>
        </section>

        {/* Intro Text Block Matching Mockup 2 */}
        <section className="py-24 md:py-32 bg-white px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-lg md:text-xl lg:text-[22px] text-[#222]  max-w-5xl mx-auto tracking-wide text-center">
                 {detailsData.introText}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Package Blocks Matching Mockups 3, 4, 5 */}
        <section className="relative bg-[#fafafa] z-10">
          {detailsData.packages && detailsData.packages.map((pkg, index) => (
            <PackageBlock 
              key={index} 
              pkg={{
                ...pkg,
                images: getSectionImages(index, galleryImages)
              }} 
              index={index} 
            />
          ))}
        </section>
        
        {/* FAQ Section (Mockup 1) */}
        {detailsData.faqs && detailsData.faqs.length > 0 && (
           <section className="py-24 md:py-32 bg-white px-6 z-10 relative">
             <div className="max-w-6xl mx-auto text-center mb-16">
               <Reveal>
                  <AnimatedText text="FAQ" className="font-antic text-5xl md:text-6xl text-black mb-16 uppercase tracking-widest font-light" />
               </Reveal>
             </div>
             <div className="max-w-6xl mx-auto">
                <Reveal>
                   <ServiceFAQGrid items={detailsData.faqs} />
                </Reveal>
             </div>
          </section>
        )}

        {/* Dark Services Links (Mockup 2) */}
        <div className="relative z-10">
          <ServiceDarkLinks />
        </div>

        {/* Portfolio Grid (Mockup 3) */}
        <div className="relative z-10">
          <PortfolioGridButton images={galleryImages} slug={slug} />
        </div>

        {/* Testimonials Slider (Mockup 4) */}
        <div className="relative z-10">
          <TestimonialSlider testimonials={detailsData.testimonials} staticImages={detailsData.portfolioImages} />
        </div>

        <div className="relative z-10">
          <HomePortfolioPreview 
            header="Adding the memories of every moment" 
            bgItems={bgItems}
            galleryItems={galleryImages}
          />
        </div>

      </main>

      <Footer />
    </div>
  );
}
