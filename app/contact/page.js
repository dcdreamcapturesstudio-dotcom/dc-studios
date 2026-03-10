"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedText from "../../components/AnimateText";
import { Reveal } from "../../components/Reveal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const socialLinks = [
  { platform: "Mobile", url: "tel:+919573717647", handle: "+91 95737 17647" },
  { platform: "Instagram", url: "https://instagram.com/dc.dreamcapturestudio", handle: "@dc.dreamcapturestudio" },
  { platform: "Email", url: "mailto:dc.dreamcapturesstudio@gmail.com", handle: "dc.dreamcapturesstudio@gmail.com" },
  { platform: "WhatsApp", url: "https://wa.me/919573717647", handle: "+91 95737 17647" },
];

export default function ContactPage() {
  return (
    <div 
      className="min-h-screen text-black overflow-x-hidden font-display selection:bg-black selection:text-white flex flex-col relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/dc-bg.jpg')" }}
    >
      {/* Overlay to ensure readability if the image is too bright/busy */}
      <div className="absolute inset-0 bg-white/60 -z-10" />

      <Header />
      
      <main className="grow pt-32 pb-24 md:pt-48 md:pb-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Intro */}
          <div className="w-full lg:w-5/12">
            <Reveal>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6">Let's Connect</h3>
              <AnimatedText 
                text="Say Hello" 
                className="font-serif text-4xl sm:text-5xl md:text-7xl leading-none text-white font-antic uppercase mb-8" 
              />
              <p className="text-neutral-400 font-display text-sm md:text-lg leading-relaxed max-w-md">
                We'd love to discuss your vision. Reach out through any of our channels to check availability and book your session at DC Studios.
              </p>
            </Reveal>
            
            <div className="mt-16 space-y-8">
              <Reveal>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Studio Location</h4>
                    <a href="https://maps.app.goo.gl/oBaRfDJa5qnJ9TUT8" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-black flex items-center gap-1 transition-colors">
                      Open in Maps <ArrowUpRight size={14} />
                    </a>
                  </div>
                  <div className="w-full aspect-video overflow-hidden transition-all duration-700 border border-neutral-200 bg-white/80">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84338.18135970713!2d79.45271729442399!3d13.64162437757282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4bd47a017575%3A0xfaa6213e2fc92ed5!2sDc%20studio%20%2FExclusively%20for%20New%20born%2C%20Maternity%20and%20kids%20studio.!5e0!3m2!1sen!2sin!4v1772459817954!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Studio Location"
                    />
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Business Hours</h4>
                  <p className="text-neutral-400 text-base md:text-lg">Monday – Friday: 9am to 6pm<br/>Saturday & Sunday: By Appointment Only</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Social Links Grid */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-6">
              {socialLinks.map((link, idx) => (
                <Reveal key={idx}>
                  <Link 
                    href={link.url} 
                    target={link.platform === "Email" || link.platform === "Mobile" ? undefined : "_blank"}
                    className="group flex flex-col md:flex-row md:items-center justify-between p-8 border border-neutral-800 rounded-xl hover:border-neutral-400 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl text-white mb-2 group-hover:text-neutral-600 transition-colors">
                        {link.platform}
                      </h3>
                      <p className="text-neutral-400 font-display text-base md:text-lg tracking-wide">
                        {link.handle}
                      </p>
                    </div>
                    <div className="mt-6 md:mt-0 w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                      <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-neutral-400" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
