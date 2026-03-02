"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedHeroImage({ src, alt }) {
  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <Image 
        src={src} 
        alt={alt} 
        fill 
        priority={true}
        quality={90}
        sizes="100vw"
        className="object-cover" 
      />
    </motion.div>
  );
}
