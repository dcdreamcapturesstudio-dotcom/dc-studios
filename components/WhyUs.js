import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import AnimatedText from "./AnimateText";

export default function WhyUs({ bgImage = "/toa-heftiba-C-8uOz7GluA-unsplash.jpg" }) {
  return (
    <section id="about" className="py-24 md:py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2">
          <Reveal>
            <div className="relative w-full aspect-square lg:aspect-4/5 rounded overflow-hidden shadow-2xl">
              <Image 
                src={bgImage} 
                alt="Behind the scenes" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <Reveal>
            <AnimatedText text="Why DC Studios?" className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 lg:mb-8 text-white" />
            <div className="space-y-6 text-neutral-400 font-display text-base lg:text-lg leading-relaxed">
              <p>
                DC Studios was born out of a desire to create a sanctuary where raw emotion meets fine-art aesthetic. We specialize in isolating the pure, untouched beauty of newborns, the candid joy of toddlers, and the profound grace of maternity.
              </p>
              <p>
                Every set we design and every lighting setup we craft is deeply intentional. We do not believe in mass-produced, cookie-cutter portraiture. Instead, we take the time to understand your vision, ensuring that the final gallery feels authentically yours.
              </p>
              <p>
                Safety and comfort are the cornerstones of our practice. Our studio is meticulously maintained, heated appropriately for infants, and equipped to provide a soothing, stress-free environment from the moment you walk through our doors.
              </p>
            </div>
            
            <div className="mt-10 lg:mt-12 flex justify-center lg:justify-start">
              <Link href="/about" className="px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:bg-neutral-200 transition inline-flex items-center gap-3 group">
                About Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
