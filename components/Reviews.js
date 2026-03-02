"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import AnimatedText from "./AnimateText";
import { Reveal } from "./Reveal";

const fallbackReviews = [
  {
    client_name: "Sarah Jenkins",
    review_text: "DC Studio perfectly captured the essence of my newborn. The lighting and care they took was exceptional. Truly images that look like paintings.",
    role: "Mother of two",
    rating: 5
  },
  {
    client_name: "David Chen",
    review_text: "Professional, creative, and incredibly talented. They made our family feel completely at ease during the toddler shoot.",
    role: "Client",
    rating: 5
  },
  {
    client_name: "Elena Rodriguez",
    review_text: "The maternity shoot was a dream. The bespoke concept they created for me was beyond what I could have imagined.",
    role: "Mother-to-be",
    rating: 5
  },
  {
    client_name: "Marcus Thorne",
    review_text: "Their editorial eye is unmatched. The fashion shoot we collaborated on yielded some of the best images in my portfolio.",
    role: "Model",
    rating: 5
  },
  {
    client_name: "Jessica Walsh",
    review_text: "I was nervous about my toddler sitting still, but they were so patient and managed to capture the most candid, beautiful moments.",
    role: "Client",
    rating: 5
  }
];

export default function Reviews({ reviews = [] }) {
  const displayReviews = reviews && reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <section className="py-24 md:py-32 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <Reveal>
          <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-neutral-600 mb-4">Client Love</h3>
          <AnimatedText text="What They Say" className="font-serif text-4xl sm:text-5xl md:text-6xl text-black" />
        </Reveal>
      </div>

      <div className="relative w-full left-1/2 -translate-x-1/2 -mx-6 md:mx-0">
        <motion.div 
          className="flex gap-6 md:gap-8 w-max px-6"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: Math.max(20, displayReviews.length * 8) }}
        >
          {[...displayReviews, ...displayReviews, ...displayReviews, ...displayReviews].map((review, i) => (
            <div key={i} className="w-[280px] sm:w-[320px] md:w-[400px] bg-white p-6 md:p-8 rounded border border-neutral-200 shrink-0 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-6 text-black">
                  {[...Array(5)].map((_, j) => (
                     <Star 
                       key={j} 
                       size={16} 
                       className={j < (review.rating || 5) ? 'fill-current' : 'text-neutral-300 fill-neutral-300'} 
                     />
                  ))}
                </div>
                <p className="text-neutral-700 font-display text-lg mb-8 leading-relaxed">&quot;{review.review_text}&quot;</p>
              </div>
              <div>
                <h4 className="font-serif text-xl text-black mb-1">{review.client_name}</h4>
                <p className="text-sm text-neutral-500 font-display">{review.role || "Client"}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
