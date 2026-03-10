import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import AnimatedText from "../../components/AnimateText";
import { Reveal } from "../../components/Reveal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const fallbackServices = [
  {
    title: "Newborn Session",
    desc: "Delicate, gentle, and timeless captured in their simplest form. We ensure absolute safety, warmth, and a stress-free environment for both baby and parents.",
    img: "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg",
    slug: "newborn-photography"
  },
  {
    title: "Baby/Toddler Session",
    desc: "Bold, narrative-driven editorial photography. Every set is custom-built to match your unique vision, combining fine arts with high fashion.",
    img: "/adele-morris-mDiFpFl_jTs-unsplash.jpg",
    slug: "baby-toddler" 
  },
  {
    title: "Maternity Session",
    desc: "Celebrating the beautiful journey of motherhood with grace. Cinematic lighting and bespoke styling to honor this fleeting chapter.",
    img: "/toa-heftiba-C-8uOz7GluA-unsplash.jpg",
    slug: "maternity"
  },
  {
    title: "Family Session",
    desc: "Capturing the unique bond and love of your family. Natural poses and timeless portraits in a relaxed studio or outdoor setting.",
    img: "/adele-morris-mDiFpFl_jTs-unsplash.jpg",
    slug: "family"
  },
  {
    title: "Child & Sibling Session",
    desc: "Dedicated to the unique personalities of children and the special connection between siblings. Playful, artistic, and full of life.",
    img: "/christian-bowen-I0ItPtIsVEE-unsplash.jpg",
    slug: "child-sibling"
  },
  {
    title: "Cake Smash Session",
    desc: "A fun and messy celebration for your little one's first birthday. Custom themes and adorable moments captured forever.",
    img: "/freestocks-ux53SGpRAHU-unsplash.jpg",
    slug: "cake-smash"
  },
  {
    title: "Fashion Session",
    desc: "Every face has a narrative. Every set is custom-built to match your unique vision, combining fine arts with high fashion. Artistic, bold, and meticulously styled.",
    img: "/yuri-li-p0hDztR46cw-unsplash.jpg",
    slug: "fashion"
  },
  {
    title: "Bath Tub Session",
    desc: "Artistic and serene bath tub portraits, capturing pure elegance and grace. A unique fine-art experience using curated botanicals and soft lighting.",
    img: "/placeholder.jpg",
    slug: "bath-tub"
  }
];

const ServiceGridCard = ({ service }) => {
  return (
    <Reveal>
      <div className="group flex flex-col w-full bg-white overflow-hidden">
        <Link href={`/services/${service.slug}`} className="relative aspect-[3/3] overflow-hidden block">
          <Image 
            src={service.img} 
            alt={service.title} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </Link>
        
        <div className="py-8 flex flex-col items-center text-center">
          <h3 className="font-antic text-2xl md:text-3xl text-black uppercase tracking-[0.2em] mb-8">
            {service.title}
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full px-4">
            <Link 
              href={`/services/${service.slug}`}
              className="w-full sm:w-auto px-8 py-3 bg-black text-white text-sm tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors duration-300 font-bold"
            >
              View Service
            </Link>
            <Link 
              href={`/gallery/${service.slug}`}
              className="w-full sm:w-auto px-8 py-3 border border-black text-black text-sm tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300 font-bold"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default async function ServicesPage() {
  const { data: servicesData } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  const getBaseTitle = (t) => {
    if (!t) return "";
    return t
      .replace(/ Session$/i, '')
      .replace(/ Photography$/i, '')
      .replace(/ Portrait$/i, '')
      .replace(/[&/]/g, ' ')
      .trim()
      .toLowerCase();
  };

  const services = fallbackServices.map(fallback => {
    // 1. Prioritize image from services table
    const dbMatch = servicesData?.find(s => {
      const dbTitle = getBaseTitle(s.title);
      const fbTitle = getBaseTitle(fallback.title);
      return dbTitle.includes(fbTitle) || fbTitle.includes(dbTitle);
    });

    return {
      ...fallback,
      img: dbMatch?.image_url || fallback.img,
      title: dbMatch?.title || fallback.title
    };
  });

  return (
    <div className="bg-white min-h-screen text-black overflow-x-hidden font-display selection:bg-black selection:text-white">
      <Header />
      
      <main>
        <section className="relative w-full pt-40 pb-20 flex flex-col justify-center items-center px-6">
          <div className="relative z-10 text-center flex flex-col items-center max-w-4xl">
            <Reveal>
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-500 mb-6">Dc Studios</h3>
              <AnimatedText 
                text="Our Services" 
                className="font-antic text-5xl md:text-6xl leading-none mb-8 text-black uppercase" 
              />
              <p className="text-neutral-600 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed uppercase tracking-widest">
                Because every picture should be unique.
                Discover our bespoke styling, cinematic lighting, and dedicated care.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative bg-white pb-32 px-6 md:px-12 lg:px-20">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {services.map((service, index) => (
              <ServiceGridCard key={index} service={service} />
            ))}
          </div>
        </section>
        
        <section className="py-32 bg-neutral-50 px-6 border-t border-neutral-100">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="font-antic text-4xl md:text-5xl text-black mb-8 uppercase tracking-widest">Ready to capture your story?</h2>
              <p className="text-neutral-500 font-serif italic text-lg mb-12 tracking-wide">
                Every picture should be unique. Let us craft a wonderful narrative for your special day.
              </p>
              <Link 
                href="/#contact" 
                className="px-12 py-5 bg-black text-white rounded-xl font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors inline-block"
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
