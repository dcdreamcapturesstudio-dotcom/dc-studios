"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Layers, Loader2 } from "lucide-react";
import AnimatedText from "./AnimateText";
import { Reveal } from "./Reveal";
import { categories as defaultCategories } from "../lib/constants";
import Lightbox from "./Lightbox";

export default function Gallery({ galleryItems = [], categories = defaultCategories }) {
  const [lightboxData, setLightboxData] = useState(null);
  const handleOpenLightbox = (id, images) => {
    setLightboxData(images);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-neutral-50 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-24">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4 text-center">Portfolio</h3>
          <AnimatedText text="Gallery / Featured Works" className="font-antic text-4xl md:text-5xl lg:text-6xl text-center text-black uppercase" />
        </div>

        <div className="space-y-32">
          {categories.map((category, idx) => {
            // Filter items for this category and limit to 8 for preview
            const items = galleryItems.filter(item => 
              (Array.isArray(item.tags) && item.tags.includes(category.filter)) || 
              item.category === category.filter
            ).slice(0, 8);
            
            // Only render categories that actually have images
            if (items.length === 0) return null;

            return (
              <div key={idx} className="border-t border-neutral-200 pt-12">
                <Reveal>
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                      <AnimatedText text={category.name} className="font-antic uppercase text-3xl sm:text-4xl md:text-5xl text-black mb-2 md:mb-4" />
                      <p className="text-neutral-600 font-display max-w-xl text-base md:text-lg">
                        {category.desc}
                      </p>
                    </div>
                    
                    <Link href={`/gallery/${category.slug}`} className="group flex items-center gap-3 text-neutral-700 hover:text-black transition-colors">
                      <span className="font-serif italic text-xl md:text-2xl">View More</span>
                      <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={28} />
                    </Link>
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {items.map((item, itemIdx) => (
                    <Reveal key={item.id || `${idx}-${itemIdx}`}>
                        <div 
                          className="relative w-full aspect-square md:aspect-4/5 overflow-hidden group cursor-pointer bg-neutral-100"
                          onClick={() => {
                            const images = Array.isArray(item.image_urls) ? item.image_urls : [item.image];
                            handleOpenLightbox(item.id || `${idx}-${itemIdx}`, images);
                          }}
                        >
                          <Image 
                            src={Array.isArray(item.image_urls) ? item.image_urls[0] : item.image} 
                            alt={item.title} 
                            fill 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
