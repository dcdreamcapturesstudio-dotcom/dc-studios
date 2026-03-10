"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { ArrowUpRight, Plus, Layers, Loader2 } from "lucide-react";
import AnimatedText from "./AnimateText";
import { Reveal } from "./Reveal";
import { categories as defaultCategories } from "../lib/constants";
import Lightbox from "./Lightbox";

// Fallback images guaranteed per category (2 each)
const categoryFallbacks = {
  Maternity:  [
    { id: "fb-mat-1", title: "Maternity", image_urls: ["/toa-heftiba-C-8uOz7GluA-unsplash.jpg"] },
    { id: "fb-mat-2", title: "Maternity", image_urls: ["/vitor-monthay-R1UkYL5J1r8-unsplash.jpg"] },
  ],
  Newborn: [
    { id: "fb-nb-1", title: "Newborn", image_urls: ["/nihal-karkala-M5aSbOXeDyo-unsplash.jpg"] },
    { id: "fb-nb-2", title: "Newborn", image_urls: ["/alireza-attari-SBIak0pKUIE-unsplash.jpg"] },
  ],
  Baby: [
    { id: "fb-baby-1", title: "Baby", image_urls: ["/yuri-li-p0hDztR46cw-unsplash.jpg"] },
    { id: "fb-baby-2", title: "Baby", image_urls: ["/freestocks-ux53SGpRAHU-unsplash.jpg"] },
  ],
  CakeSmash: [
    { id: "fb-cs-1", title: "Cake Smash", image_urls: ["/freestocks-ux53SGpRAHU-unsplash.jpg"] },
    { id: "fb-cs-2", title: "Cake Smash", image_urls: ["/yuri-li-p0hDztR46cw-unsplash.jpg"] },
  ],
  Family: [
    { id: "fb-fam-1", title: "Family", image_urls: ["/adele-morris-mDiFpFl_jTs-unsplash.jpg"] },
    { id: "fb-fam-2", title: "Family", image_urls: ["/christian-bowen-I0ItPtIsVEE-unsplash.jpg"] },
  ],
  Child: [
    { id: "fb-ch-1", title: "Child & Sibling", image_urls: ["/christian-bowen-I0ItPtIsVEE-unsplash.jpg"] },
    { id: "fb-ch-2", title: "Child & Sibling", image_urls: ["/daniel-thomas-_tYNzEqehMk-unsplash.jpg"] },
  ],
  BathTub: [
    { id: "fb-bt-1", title: "Bath Tub Portrait", image_urls: ["/placeholder.jpg"] },
    { id: "fb-bt-2", title: "Bath Tub Portrait", image_urls: ["/placeholder.jpg"] },
  ],
  Fashion: [
    { id: "fb-fs-1", title: "Fashion", image_urls: ["/yuri-li-p0hDztR46cw-unsplash.jpg"] },
    { id: "fb-fs-2", title: "Fashion", image_urls: ["/adele-morris-mDiFpFl_jTs-unsplash.jpg"] },
  ],
};

export default function Gallery({ galleryItems = [], categories = defaultCategories }) {
  const [lightboxData, setLightboxData] = useState(null);
  const handleOpenLightbox = (id, images) => {
    setLightboxData(images);
  };

  return (
    <section id="gallery" className="py-32 bg-neutral-50 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-32 mt-10">
          <AnimatedText text="PORTFOLIO" className="font-antic text-4xl md:text-5xl lg:text-6xl text-center text-black uppercase" />
          <p className="text-neutral-600 font-display text-base md:text-lg text-center">
            add magic to every moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {categories.map((category, idx) => {
            // Use uploaded items; fall back to per-category stubs so section always shows
            const uploaded = galleryItems.filter(item =>
              (Array.isArray(item.tags) && item.tags.includes(category.filter)) ||
              item.category === category.filter
            ).slice(0, 2);
            const items = uploaded.length > 0 ? uploaded.slice(0, 2) : (categoryFallbacks[category.filter] || []).slice(0, 2);

            return (
              <div key={idx} className="border-t border-neutral-200  pt-6 md:pt-12">
                <Reveal>
                  <div className="flex flex-col mb-6 gap-2">
                    <div>
                      <AnimatedText text={category.name} className="font-antic uppercase text-2xl sm:text-3xl md:text-4xl text-black" />
                      
                    </div>
                    
                    <Link href={`/gallery/${category.slug}`} className="group flex items-center gap-3 text-neutral-700 hover:text-black transition-colors">
                      <span className="font-serif italic text-xl md:text-2xl">View More</span>
                      <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={28} />
                    </Link>
                  </div>
                </Reveal>

                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {items.map((item, itemIdx) => (
                    <Reveal key={item.id || `${idx}-${itemIdx}`}>
                        <div 
                          className="relative w-full aspect-[3/4] overflow-hidden group cursor-pointer bg-neutral-100"
                          onClick={() => {
                            const images = Array.isArray(item.image_urls) ? item.image_urls : [item.image];
                            handleOpenLightbox(item.id || `${idx}-${itemIdx}`, images);
                          }}
                        >
                          <ImageWithSkeleton 
                            src={Array.isArray(item.image_urls) ? item.image_urls[0] : item.image} 
                            alt={item.title} 
                            fill 
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={85}
                            loading="lazy"
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                          
                      
                          
                          {/* Multi-image Indicator */}
                          {Array.isArray(item.image_urls) && item.image_urls.length > 1 && (
                            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white pointer-events-none">
                              <Layers size={14} />
                            </div>
                          )}

                          {/* Plus Icon Overlay */}
                          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Plus size={20} className="font-light" />
                          </div>
                        </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {lightboxData && (
        <Lightbox 
          images={lightboxData} 
          onClose={() => setLightboxData(null)} 
        />
      )}
    </section>
  );
}
