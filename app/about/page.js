"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "../../components/AnimateText";
import { Reveal } from "../../components/Reveal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FAQAccordion } from "../../components/FAQAccordion";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "How long do newborn sessions typically take?",
    answer: "Newborn sessions are baby-led, which means we allow plenty of time for feeding, soothing, and cuddling. Typically, a session lasts between 2 to 4 hours to ensure a relaxed, unhurried environment."
  },
  {
    question: "Do you provide outfits and props?",
    answer: "Yes, our studio is fully stocked with high-end, bespoke wraps, outfits, and fine-art props specifically curated for newborns, sitters, and maternity clients. You are welcome to bring personal heirlooms as well."
  },
  {
    question: "When is the best time to book a maternity shoot?",
    answer: "We recommend booking your maternity session between your 28th and 34th week of pregnancy. During this window, your bump is beautifully round, but you are generally still comfortable enough to pose and move easily."
  },
  {
    question: "What is your approach to toddler photography?",
    answer: "Toddlers rarely want to sit still, and we don't expect them to! Our approach is heavily candid and play-based. We interact with them, play games, and capture their authentic expressions as they explore the studio."
  }
];

export default function AboutPage() {
  const [heroBg, setHeroBg] = useState("/christian-bowen-I0ItPtIsVEE-unsplash.jpg");
  const [contentBg, setContentBg] = useState("/freestocks-ux53SGpRAHU-unsplash.jpg");

  useEffect(() => {
    async function loadBgs() {
      const { data } = await supabase
        .from('backgrounds')
        .select('*')
        .in('category', ['aboutBgs', 'aboutBgs2'])
        .order('created_at', { ascending: false });
        
      if (data) {
        const bg1Data = data.find(b => b.category === 'aboutBgs');
        const bg2Data = data.find(b => b.category === 'aboutBgs2');
        
        if (bg1Data) setHeroBg(bg1Data.image_url);
        if (bg2Data) setContentBg(bg2Data.image_url);
      }
    }
    loadBgs();
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen text-white overflow-x-hidden font-display selection:bg-white selection:text-black">
      <Header />
      
      <main>
        {/* Cinematic Hero */}
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={heroBg} 
              alt="About DC Studios" 
              fill 
              priority
              sizes="100vw"
              className="object-cover" 
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-black/20 to-black/40" />
          
          <div className="relative z-10 text-center max-w-4xl pt-20">
            <Reveal>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">The Studio</h3>
              <AnimatedText 
                text="Crafting Timeless Narratives" 
                className="font-serif text-4xl md:text-6xl lg:text-8xl leading-tight mb-6 lg:mb-8 text-white drop-shadow-xl" 
              />
              <p className="text-neutral-300 font-display text-base md:text-xl leading-relaxed">
                We believe that photography is more than capturing a moment; it's about preserving a feeling.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Philosophy / Story Section */}
        <section className="py-24 md:py-40 px-6 bg-neutral-950">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <div className="w-full lg:w-1/2">
              <Reveal>
                <div className="relative h-[600px] w-full rounded-md overflow-hidden">
                  <Image 
                    src={contentBg}
                    alt="Studio Workflow"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              </Reveal>
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <Reveal>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6 lg:mb-8">Our Philosophy</h2>
                <div className="space-y-6 text-neutral-400 font-display text-base md:text-lg leading-relaxed">
                  <p>
                    DC Studios was born out of a desire to create a sanctuary where raw emotion meets fine-art aesthetic. We specialize in isolating the pure, untouched beauty of newborns, the candid joy of toddlers, and the profound grace of maternity.
                  </p>
                  <p>
                    Every set we design and every lighting setup we craft is deeply intentional. We do not believe in mass-produced, cookie-cutter portraiture. Instead, we take the time to understand your vision, ensuring that the final gallery feels authentically *yours*.
                  </p>
                  <p>
                    Safety and comfort are the cornerstones of our practice. Our studio is meticulously maintained, heated appropriately for infants, and equipped to provide a soothing, stress-free environment from the moment you walk through our doors.
                  </p>
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 md:py-32 bg-black px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-12 lg:mb-16 text-center">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Inquiries</h3>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white">Frequently Asked Questions</h2>
              </div>
            </Reveal>
            
            <Reveal>
              <FAQAccordion items={faqs} />
            </Reveal>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 bg-neutral-900 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6 lg:mb-8">Let's Create Together</h2>
              <p className="text-neutral-400 font-display text-base md:text-lg mb-10 lg:mb-12">
                Have more questions or ready to reserve your date? We'd love to hear from you.
              </p>
              <div className="mt-12">
              <Link href="/contact" className="px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:bg-neutral-200 transition inline-flex items-center gap-3 group">
                Let's Connect <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            </Reveal>
          </div>
        </section>

      </main>

      {/* Map Section */}
      <section className="w-full h-[500px] relative grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84338.18135970713!2d79.45271729442399!3d13.64162437757282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4bd47a017575%3A0xfaa6213e2fc92ed5!2sDc%20studio%20%2FExclusively%20for%20New%20born%2C%20Maternity%20and%20kids%20studio.!5e0!3m2!1sen!2sin!4v1772459817954!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Studio Location"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 pointer-events-none border-t border-b border-neutral-900" />
      </section>

      <Footer />
    </div>
  );
}
