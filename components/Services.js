"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

// Each image card gets its own scroll-driven Y translation (no scale, just position)
// Service card for the mobile/medium grid
function ServiceGridCard({ service, label }) {
  return (
    <Link href={`/services/${service.slug}`} className="group flex flex-col w-full text-center">
      <div className="relative aspect-3/4 overflow-hidden">
        <ImageWithSkeleton
          src={service.image_url}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 22vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="mt-4">
        <p className="font-antic text-2xl md:text-base text-black tracking-[0.25em] group-hover:opacity-60 transition-opacity uppercase">
          {label}
        </p>
      </div>
    </Link>
  );
}

// Each image card gets its own scroll-driven Y translation (for desktop)
function ServiceScrollCard({ service, label, yTransform }) {
  return (
    <motion.div style={{ y: yTransform }} className="shrink-0 w-[12.5vw] text-center">
      <Link href={`/services/${service.slug}`} className="group flex flex-col w-full">
        <div className="relative w-full aspect-3/4 overflow-hidden">
          <ImageWithSkeleton
            src={service.image_url}
            alt={service.title}
            fill
            sizes="16vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="mt-4">
          <p className="font-antic text-base text-black tracking-[0.15em] group-hover:opacity-60 transition-opacity uppercase font-bold">
            {label}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Services({ services = [] }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Alternating scroll directions and speeds — even cards go up, odd go down
  const y0 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const yTransforms = [y0, y1, y2, y3, y4, y5];

  // Helper to format short labels from full titles (e.g. "Maternity Session" -> "Maternity")
  const getShortLabel = (title) => {
    if (!title) return "";
    return title.replace(/ Session$/i, '').replace(/ Photography$/i, '');
  };

  return (
    <section ref={containerRef} id="services" className="py-20 md:py-32 bg-white overflow-hidden">
      
      {/* Heading block */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-16 md:mb-24">
        <Reveal>
          <h2 className="font-antic text-4xl md:text-5xl lg:text-6xl text-black uppercase leading-[1.05] tracking-widest mb-10">
            Because every picture should be unique
          </h2>
        </Reveal>
        <Reveal>
          <Link
            href="/services"
            className="inline-block border border-black bg-black text-white tracking-[0.3em] uppercase py-4 px-10 hover:bg-white hover:text-black transition-colors duration-300 text-sm"
          >
            View All Services
          </Link>
        </Reveal>
      </div>

      {/* Mobile/Medium Grid Layout */}
      <div className="lg:hidden md:px-12 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
        {services.map((service, idx) => (
          <ServiceGridCard
            key={idx}
            service={service}
            label={getShortLabel(service.title)}
          />
        ))}
      </div>

      {/* Desktop Staggered Scroll Layout */}
      <div className="hidden lg:flex justify-center px-10 relative bottom-0">
        <div className="flex gap-4 items-center">
          {services.map((service, idx) => (
            <ServiceScrollCard
              key={idx}
              service={service}
              label={getShortLabel(service.title)}
              yTransform={yTransforms[idx % yTransforms.length]}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
