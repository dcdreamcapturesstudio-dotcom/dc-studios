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
    <div className="bg-neutral-50 min-h-screen text-black overflow-x-hidden font-display selection:bg-black selection:text-white">
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
             <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-black/40 to-black/20" />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 from-0% via-black/50 via-10% to-black/50 to-100%" />
          
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

        {/* Section 1: Intro Text Split */}
        <section className="py-24 md:py-32 px-6 bg-white min-h-[600px] flex items-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 items-center w-full">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-4 border-b md:border-b-0 md:border-r border-neutral-200 pb-16 md:pb-0 md:pr-16">
              <Reveal>
                <h2 className="font-antic text-4xl md:text-5xl lg:text-[42px] leading-[1.3] text-neutral-800 uppercase tracking-widest mb-10">
                  We are here to<br />
                  help you to<br />
                  remember the<br />
                  best days
                </h2>
                <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Heart of best memories
                </h3>
              </Reveal>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:pl-16 pt-10 md:pt-0">
              <Reveal>
                <div className="font-display text-sm lg:text-[15px] text-neutral-800 leading-[1.8] space-y-8">
                  <p>
                    I believe the most important element to be captured in a photograph is emotion. The more emotional the shot is, the more it appeals to our senses, and the greater the connection we feel to it. If a picture conveys emotion &ndash; whether it's happiness, surprise, sorrow &ndash; it is successful. Photography has become my passion and source of happiness to capture emotion and personality, vibes and feelings; things you can't see, but surely feel.
                  </p>
                  <p>
                    The connection with subject is what I love most about my job. That combined with photography, makes this the perfect job for me.
                  </p>
                  <div className="pt-8">
                    <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-800 leading-[2.5]">
                      We are here to help you to<br />
                      remember the best days
                    </h4>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Section 2: Black Banner & Image Split */}
        <section className="w-full flex flex-col md:flex-row bg-black">
          <div className="w-full md:w-1/2 text-white flex flex-col justify-center items-center lg:items-start p-16 lg:p-24 min-h-[500px]">
            <Reveal>
              <h2 className="font-antic text-3xl md:text-4xl lg:text-[42px] leading-[1.4] uppercase tracking-widest text-center lg:text-left text-neutral-200">
                Make a statement<br />
                through every picture.<br />
                We will make a<br />
                wonderful story
              </h2>
            </Reveal>
          </div>
          <div className="w-full md:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
             <Image 
                src="/christian-bowen-I0ItPtIsVEE-unsplash.jpg" // High contrast portfolio image
                alt="Statement Piece"
                fill
                className="object-cover"
              />
          </div>
        </section>

        {/* Section 3: Photographer Bio */}
        <section className="bg-[#f2f1ec] w-full pt-16 md:pt-0">
          <div className="flex flex-col lg:flex-row w-full">
            <div className="w-full lg:w-1/2 relative min-h-[500px] md:min-h-[700px] lg:min-h-[900px]">
               <Image 
                  src={contentBg} // Tied to the backend Backgrounds uploader
                  alt="Photographer Portrait"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 xl:p-24 bg-[#f2f1ec]">
              <Reveal>
                <h2 className="font-antic text-4xl md:text-5xl lg:text-[52px] leading-tight uppercase text-neutral-800 mb-6">
                  Hi! We are DC Studios
                </h2>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-700 mb-12">
                  Expressive moments, impressive art
                </h3>
                
                <div className="font-display text-[14px] md:text-[15px] text-neutral-800 leading-[1.8] space-y-6">
                  <p>
                    Since childhood I always had a craving to learn and create something new in any form of art, whether it's painting, craft, knitting, stitching anything that fuels my passion of creating something new and understanding the beauty of art. It ignites my soul and keeps me alive.
                  </p>
                  <p>
                    Photography gave a new meaning to my life. I started to express my feelings and emotions through pictures. Photographing people, places, nature, wildlife and capturing the true essence and beauty of life made my childhood dream come true.
                  </p>
                  <p>
                    After photographing anything and everything, I started DC Studios as a full time service, specialized in Maternity, new born, baby and toddlers. I also love to photograph portrait photo shoots.
                  </p>
                  <p>
                    Time flies very quickly. So, I urge everyone to take out some time and capture all your beautiful moments to preserve and cherish them forever.
                  </p>
                </div>

                <div className="mt-16 flex flex-col items-center md:items-start text-neutral-800 group cursor-default">
                  <div className="flex items-center -ml-2">
                    <span className="font-serif italic text-4xl pr-1 translate-y-1">DC Studios</span> 
                    
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-neutral-500 mt-2">Photography</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 md:py-32 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-12 lg:mb-16 text-center">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Inquiries</h3>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-black">Frequently Asked Questions</h2>
              </div>
            </Reveal>
            
            <Reveal>
              <FAQAccordion items={faqs} />
            </Reveal>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 bg-neutral-100 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-black mb-6 lg:mb-8">Let's Create Together</h2>
              <p className="text-neutral-600 font-display text-base md:text-lg mb-10 lg:mb-12">
                Have more questions or ready to reserve your date? We'd love to hear from you.
              </p>
              <div className="mt-12">
              <Link href="/contact" className="px-8 py-4 bg-black text-white rounded-full font-medium tracking-wide hover:bg-neutral-800 transition inline-flex items-center gap-3 group">
                Let's Connect <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            </Reveal>
          </div>
        </section>

      </main>

      {/* Map Section */}
      <section className="w-full max-w-7xl mx-auto h-[500px] relative  transition-all duration-1000 mb-19">
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
      </section>

      <Footer />
    </div>
  );
}
