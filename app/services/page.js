"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import AnimatedText from "../../components/AnimateText";
import { Reveal } from "../../components/Reveal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const fallbackServices = [
  {
    title: "Newborn Photography",
    desc: "Delicate, gentle, and timeless captured in their simplest form. We ensure absolute safety, warmth, and a stress-free environment for both baby and parents.",
    img: "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg",
    slug: "newborn-photography"
  },
  {
    title: "Fashion & Editorial",
    desc: "Bold, narrative-driven editorial photography. Every set is custom-built to match your unique vision, combining fine arts with high fashion.",
    img: "/adele-morris-mDiFpFl_jTs-unsplash.jpg",
    slug: "fashion-editorial" 
  },
  {
    title: "Maternity",
    desc: "Celebrating the beautiful journey of motherhood with grace. Cinematic lighting and bespoke styling to honor this fleeting chapter.",
    img: "/toa-heftiba-C-8uOz7GluA-unsplash.jpg",
    slug: "maternity"
  },
  {
    title: "Conceptual Arts",
    desc: "Candid moments tracking their playful and curious milestones. Let them run free while we capture their pure, unfiltered joy.",
    img: "/yuri-li-p0hDztR46cw-unsplash.jpg",
    slug: "conceptual-arts"
  },
];

// Reusable Sticky Scroll Component
const StickyServiceCard = ({ service, index }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Dramatic parallax for the image inside the card
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center py-24 sticky top-0 bg-neutral-950 px-6 md:px-20">
      <div className={`max-w-screen-2xl mx-auto w-full flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-24`}>
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <Reveal>
            <span className="text-neutral-300 font-serif tracking-widest mb-4 block">0{index + 1} &mdash; STUDIO FEATURE</span>
            <AnimatedText text={service.title} className="font-serif text-5xl md:text-7xl lg:text-[5rem] text-white mb-8" />
            <p className="text-neutral-300 font-display text-lg md:text-xl leading-relaxed max-w-xl mb-12">
              {service.desc}
            </p>
            
            <div className="flex gap-6 items-center">
              <Link 
                href="/#contact" 
                className="px-8 py-4 bg-white text-black rounded-xl font-medium tracking-wide hover:bg-neutral-200 transition"
              >
                Book Session
              </Link>
              <Link 
                href={`/gallery/${service.slug}`} 
                className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                onClick={(e) => {
                  if(service.slug === "toddler") {
                     e.preventDefault();
                     window.location.href = "/#gallery"
                  }
                }}
              >
                <span className="font-serif italic text-lg">View Gallery</span>
                <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Image Content with Parallax */}
        <div className="w-full lg:w-1/2 h-[60vh] md:h-[80vh] relative overflow-hidden rounded-md group">
          <motion.div 
            style={{ y: yImage }}
            className="absolute inset-[-15%] w-[130%] h-[130%]"
          >
            <Image 
              src={service.img} 
              alt={service.title} 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
        </div>
        
      </div>
    </div>
  );
};

export default function ServicesPage() {
  const [heroBg, setHeroBg] = useState("/vitor-monthay-R1UkYL5J1r8-unsplash.jpg");
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [bgRes, svcRes] = await Promise.all([
        supabase.from('backgrounds').select('image_url').eq('category', 'servicesBg').order('created_at', { ascending: false }).limit(1),
        supabase.from('services').select('*').order('created_at', { ascending: false })
      ]);

      if (bgRes.data && bgRes.data.length > 0) {
        setHeroBg(bgRes.data[0].image_url);
      }

      if (svcRes.data) {
        setServicesData(svcRes.data);
      }
    }
    loadData();
  }, []);

  const services = fallbackServices.map(fallback => {
    const uploaded = servicesData?.find(s => s.title === fallback.title);
    return uploaded ? { ...fallback, img: uploaded.image_url, desc: uploaded.desc || fallback.desc, title: uploaded.title } : fallback;
  });

  return (
    <div className="bg-neutral-950 min-h-screen text-white overflow-x-hidden font-display selection:bg-white selection:text-black">
      <Header />
      
      <main>
        {/* Full Screen Cinematic Hero */}
        <section className="relative w-full h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={heroBg} 
              alt="Creative Services" 
              fill 
              priority={true}
              quality={90}
              sizes="100vw"
              className="object-cover" 
            />
          </motion.div>
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-black/60 to-black/30" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <Reveal>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6">Our Expertise</h3>
              <AnimatedText 
                text="Creative Services" 
                className="font-serif text-6xl md:text-8xl lg:text-[8rem] leading-none mb-8 text-white drop-shadow-2xl" 
              />
              <p className="text-neutral-400 font-display max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-12">
                We don't just take photographs; we freeze time. Discover our bespoke styling, cinematic lighting, and dedicated care across all our studio sessions.
              </p>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Link href="/#contact" className="inline-flex font-serif italic text-2xl text-neutral-300 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1">
                Start a Conversation
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Sticky Scroll Flowing Sections */}
        <section className="relative bg-neutral-950 pb-32">
          {services.map((service, index) => (
            <StickyServiceCard key={index} service={service} index={index} />
          ))}
        </section>
        
        {/* Call to Action Footer block inside the page body */}
        <section className="py-32 bg-black px-6 border-t border-neutral-900">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">Ready to capture your story?</h2>
              <p className="text-neutral-400 font-display text-lg mb-12">
                Every picture should be unique. Let us craft a wonderful narrative for your special day.
              </p>
              <Link 
                href="/#contact" 
                className="px-12 py-5 bg-white text-black rounded-full font-medium tracking-widest uppercase hover:bg-neutral-200 transition"
              >
                Contact Studio
              </Link>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
