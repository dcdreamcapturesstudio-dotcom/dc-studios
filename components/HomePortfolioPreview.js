"use client";

import Image from "next/image";
import Link from "next/link";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { categories } from "../lib/constants";

// One fallback image per category in the same order as constants
const fallbackByCategory = {
  Maternity:  "/toa-heftiba-C-8uOz7GluA-unsplash.jpg",
  Newborn:    "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg",
  Baby:       "/yuri-li-p0hDztR46cw-unsplash.jpg",
  CakeSmash:  "/freestocks-ux53SGpRAHU-unsplash.jpg",
  Family:     "/adele-morris-mDiFpFl_jTs-unsplash.jpg",
  Child:      "/christian-bowen-I0ItPtIsVEE-unsplash.jpg",
  Fashion:    "/yuri-li-p0hDztR46cw-unsplash.jpg",
  BathTub:    "/placeholder.jpg",
};

export default function HomePortfolioPreview({
  header = "Adding the memories of every moment",
  galleryItems = [],
  bgItems = [],
}) {
  // Mapping between constant filters and backgrounds table category keys
  const bgCategoryMap = {
    Maternity: "maternity",
    Newborn: "newBorn",
    Baby: "kidsToddlers",
    CakeSmash: "cakeSmash",
    Family: "family",
    Child: "childSibling",
    Fashion: "fashion",
    BathTub: "bathTub",
  };

  // Build one card per category using:
  // 1. Matching background image (High priority / "Profile" image)
  // 2. First matching gallery image (Fallback)
  // 3. Static fallback constant (Last resort)
  const cards = categories.map((cat) => {
    // 1. Try to find in backgrounds table
    const bgMatch = bgItems.find(bg => bg.category === bgCategoryMap[cat.filter]);
    
    // 2. Try to find in gallery_images
    const galleryMatch = galleryItems.find(
      (item) =>
        (Array.isArray(item.tags) && item.tags.includes(cat.filter)) ||
        item.category === cat.filter
    );

    const src =
      bgMatch?.image_url ||
      galleryMatch?.image_urls?.[0] || 
      fallbackByCategory[cat.filter] || 
      "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg";

    return { name: cat.name, slug: cat.slug, src };
  });

  return (
    <section className="bg-[#f2f2f0] py-16 md:py-24 overflow-hidden">
      {/* Header row */}
      <div className="flex flex-col md:flex-row items-center md:items-end md:justify-between px-6 md:px-16 mb-12 gap-6 justify-center">
        <Reveal>
          <h2 className="font-antic text-4xl md:text-5xl lg:text-3xl text-black uppercase leading-tight max-w-sm text-center md:text-left tracking-widest">
            {header}
          </h2>
        </Reveal>
        <Reveal>
          <Link
            href="/portfolio"
            className="inline-block border border-black text-sm tracking-[0.3em] uppercase py-4 px-8 hover:bg-white/0 hover:text-black transition-colors duration-300 shrink-0 bg-black text-neutral-200 "
          >
            View All Portfolio
          </Link>
        </Reveal>
      </div>

      {/* Horizontally scrollable image row */}
      <div className="flex gap-3 px-6 md:px-16 overflow-x-auto hide-scrollbar pb-4">
        {cards.map((card, idx) => (
          <Link
            key={idx}
            href={`/gallery/${card.slug}`}
            className="group shrink-0 flex flex-col w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw]"
          >
            {/* Image */}
            <div className="relative w-full aspect-3/4 overflow-hidden">
              <ImageWithSkeleton
                src={card.src}
                alt={card.name}
                fill
                sizes="(max-width: 768px) 70vw, 22vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Text + Arrow row below image */}
            <div className="flex items-center justify-between mt-4 pr-1 px-2">
              <p className="font-antic text-base md:text-lg text-black tracking-wide group-hover:opacity-60 transition-opacity uppercase font-bold">
                {card.name}
              </p>
              <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center shrink-0 group-hover:bg-black group-hover:border-black transition-colors duration-300">
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-black group-hover:text-white transition-colors duration-300"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
