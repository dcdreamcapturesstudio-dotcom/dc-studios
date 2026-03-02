"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { Grid, Heart, MessageCircle } from "lucide-react";

const photos = [
  "/toa-heftiba-C-8uOz7GluA-unsplash.jpg",
  "/daniel-thomas-_tYNzEqehMk-unsplash.jpg",
  "/alireza-attari-SBIak0pKUIE-unsplash.jpg",
  "/vitor-monthay-R1UkYL5J1r8-unsplash.jpg",
  "/adele-morris-mDiFpFl_jTs-unsplash.jpg",
  "/christian-bowen-I0ItPtIsVEE-unsplash.jpg",
  "/alvin-mahmudov-vKuEhorbvYI-unsplash.jpg",
  "/jeremy-mcknight-11GZVrMzfUU-unsplash.jpg",
  "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg",
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white text-black min-h-screen">
      <div className="mx-auto px-4 md:px-8">
        <Reveal>

          <div className="mb-5 w-full flex justify-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-neutral-800 mb-8 mx-auto">
              <span className="text-neutral-800 italic">follow and visit</span> <span className="text-neutral-800 font-antic relative left-2 uppercase ">DC Studios</span>
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-center w-full justify-center">
             <div className="bg-neutral-900 md:h-[380px] overflow-hidden p-6 md:p-10 text-white font-display border border-neutral-800/50 transform transition-all duration-300 group md:w-1/2 justify-center">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 w-full">
              
              {/* Profile Avatar */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 shrink-0 mx-auto md:mx-0">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-black border border-neutral-700">
                  <Image 
                    src="/dc-image.jpg" // We can replace this with actual logo if needed
                    alt="DC Studios Profile"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex flex-col w-full text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <h1 className="text-xl md:text-2xl font-bold tracking-wide">dc.dreamcapturestudio</h1>
                    <span className="text-neutral-400">...</span>
                  </div>
                </div>

                <p className="mb-4 text-neutral-100 font-medium">Dc studio</p>

                {/* Stats row - Desktop */}
                <div className="hidden md:flex gap-8 mb-4">
                  <p><span className="font-bold text-white">753</span> <span className="text-neutral-300">posts</span></p>
                </div>

                {/* Bio */}
                <div className="text-sm md:text-base leading-relaxed text-neutral-300 mb-6">
                  <p className="mb-1 text-neutral-400">Photographer</p>
                  <p className="mb-2 max-w-xl text-white">
                    Exclusively for Newborn, toddlers, maternity shoots and also conceptual fashion shoots.
                  </p>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 font-medium text-sm">
                    <Link href="https://g.page/dc-studios-tirupati" target="_blank" className="hover:underline flex items-center justify-center md:justify-start gap-1 text-neutral-200">
                      <span className="text-blue-400 font-bold">🔗</span> g.page/dc-studios-tirupati
                    </Link>
                    <span className="hover:underline flex items-center justify-center md:justify-start gap-1 text-neutral-200 cursor-pointer">
                      <span>@</span> dc.dreamcapturestudio
                    </span>
                  </div>
                </div>

                

                {/* Action Buttons */}
                <div className="flex justify-center md:justify-start gap-2 mt-auto">
                  <Link href="https://instagram.com/dc.dreamcapturestudio" target="_blank" className="flex-1 md:flex-none px-12 py-2 bg-[#4460f1] hover:bg-[#3450e1] font-semibold text-sm rounded-lg text-white text-center transition-colors">
                    Follow
                  </Link>
                  <Link href="mailto:hello@dcstudios.com" className="flex-1 md:flex-none px-12 py-2 bg-[#2a2a2a] hover:bg-[#333333] border border-[#333333] transition-colors font-semibold text-sm rounded-lg text-white text-center">
                    Visit our Instagram
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <section className="h-[380px] relative transition-all duration-1000 md:w-1/2 w-full rounded">
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
          </div>
          {/* Profile Header (Dark Card Style) */}
         
        </Reveal>

      
        
      </div>
    </section>
  );
}
