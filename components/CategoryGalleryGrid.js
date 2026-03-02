'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Layers, Loader2 } from 'lucide-react';
import { Reveal } from './Reveal';
import Lightbox from './Lightbox';

export default function CategoryGalleryGrid({ items = [] }) {
  const [lightboxData, setLightboxData] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);

  const handleOpenLightbox = (id, images) => {
    setLightboxData(images);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.slice(0, visibleCount).map((item) => {
          const images = item.image_urls && item.image_urls.length > 0 ? item.image_urls : ['/placeholder.jpg'];
          
          return (
            <Reveal key={item.id}>
                <div 
                  className="relative w-full aspect-square md:aspect-4/5 overflow-hidden group cursor-pointer bg-neutral-100"
                  onClick={() => handleOpenLightbox(item.id, images)}
                >
                  <Image 
                    src={images[0]} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  

                  {images.length > 1 && (
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white pointer-events-none">
                      <Layers size={14} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={20} className="font-light" />
                  </div>
                </div>
            </Reveal>
          );
        })}
      </div>

      {visibleCount < items.length && (
        <div className="mt-16 text-center">
          <Reveal>
            <button 
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="px-10 py-4 bg-transparent border border-neutral-300 text-neutral-700 rounded-full font-medium tracking-widest uppercase hover:text-black hover:border-neutral-600 transition-all duration-300"
            >
              Load More
            </button>
          </Reveal>
        </div>
      )}
      
      {items.length === 0 && (
        <div className="py-24 text-center text-neutral-500 font-display italic">
          More images arriving soon...
        </div>
      )}

      {lightboxData && (
        <Lightbox 
          images={lightboxData} 
          onClose={() => setLightboxData(null)} 
        />
      )}
    </>
  );
}
