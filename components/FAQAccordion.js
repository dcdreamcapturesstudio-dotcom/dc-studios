"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function FAQAccordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto border-t border-neutral-800">
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        
        return (
          <div key={index} className="border-b border-neutral-800">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full py-8 flex items-center justify-between text-left group transition-colors hover:text-white text-neutral-300"
            >
              <span className="font-serif text-2xl md:text-3xl pr-8">{item.question}</span>
              <span className="shrink-0 w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center group-hover:border-white transition-colors">
                {isActive ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 text-neutral-400 font-display text-lg leading-relaxed max-w-3xl">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
