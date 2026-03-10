"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import { supabase } from "../lib/supabase";

export default function ServiceDarkLinks() {
  const [servicesList, setServicesList] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*');
      
      if (data) {
        // Defined requested sort order
        const order = ["Maternity", "Newborn", "Baby", "CakeSmash", "Family", "Child", "Fashion", "Bath Tub"];
        
        const getBaseTitle = (t) => t ? t.replace(/ Session$/i, '').replace(/ Photography$/i, '').replace(/ Portrait$/i, '').replace(/ & /g, ' ').replace(/\//g, ' ').trim() : "";
        
        const sortedData = [...data].sort((a, b) => {
          const indexA = order.findIndex(o => getBaseTitle(a.title).includes(o) || o.includes(getBaseTitle(a.title)));
          const indexB = order.findIndex(o => getBaseTitle(b.title).includes(o) || o.includes(getBaseTitle(b.title)));
          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });

        const formatted = sortedData.map(s => {
          // Special case for newborn slug to match routing
          let slug = s.slug || s.title.toLowerCase().replace(/\s+/g, '-');
          if (s.title === "Newborn Session" || s.title === "Newborn") {
            slug = "newborn-photography";
          }

          return {
            title: s.title,
            subtitle: s.subtitle || s.desc?.substring(0, 30).toUpperCase() || "DC STUDIOS",
            link: `/services/${slug}`,
            image: s.image_url
          };
        });
        setServicesList(formatted);
      }
      if (error) console.error("Error fetching services for dark links:", error);
    }
    fetchServices();
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative w-full py-32 md:py-48 flex items-center overflow-hidden bg-black">
       {/* Dynamic Background Image layer */}
       <motion.div 
         style={{ y: yBg }} 
         className="absolute inset-[-10%] w-[120%] h-[120%] z-0"
       >
         {servicesList.map((srv, idx) => (
           <motion.div
             key={idx}
             animate={{ opacity: idx === activeIdx ? 1 : 0 }}
             transition={{ duration: 0.8, ease: "easeInOut" }}
             className="absolute inset-0"
           >
             <Image 
               src={srv.image} 
               alt={srv.title}
               fill
               className="object-cover object-center brightness-[0.35]"
             />
           </motion.div>
         ))}
       </motion.div>

       <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-start justify-between">
          
          <div className="w-full md:w-1/3 mb-16 md:mb-0 sticky top-1/2">
            <Reveal>
              <h2 className="font-antic text-5xl md:text-6xl text-white uppercase tracking-wider drop-shadow-md hidden md:block">
                Services
              </h2>
            </Reveal>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-10">
             {servicesList.map((srv, idx) => {
               const isActive = idx === activeIdx;
               
               return (
                 <Reveal key={idx}>
                   <Link 
                     href={srv.link} 
                     className="group block py-2"
                     onMouseEnter={() => setActiveIdx(idx)}
                   >
                      <h3 className={`font-antic uppercase text-3xl md:text-4xl transition-colors duration-500 mb-1.5 tracking-wide drop-shadow-sm ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                          {srv.title.replace(/ Session$/i, '').replace(/ Photography$/i, '')}
                       </h3>
                       <p className={`font-display text-[10px] md:text-xs transition-colors duration-500 uppercase tracking-[0.3em] font-medium drop-shadow-sm ${isActive ? 'text-white/90' : 'text-white/30 group-hover:text-white/60'}`}>
                         {srv.subtitle}
                      </p>
                   </Link>
                 </Reveal>
               );
             })}
          </div>

       </div>
    </section>
  );
}
