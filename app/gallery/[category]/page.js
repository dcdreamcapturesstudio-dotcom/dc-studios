import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import AnimatedText from "../../../components/AnimateText";
import { Reveal } from "../../../components/Reveal";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CategoryGalleryGrid from "../../../components/CategoryGalleryGrid";
import AnimatedHeroImage from "../../../components/AnimatedHeroImage";

import { categories } from "../../../lib/constants";
import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";

// Generate static params for the static site generation build phase
export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function GalleryPage({ params }) {
  // Extract category slug from the URL parameters
  const { category: slug } = await params;
  
  // Find the category definition based on the slug
  const currentCategory = categories.find((c) => c.slug === slug);
  
  if (!currentCategory) {
    notFound();
  }

  const [
    { data: galleryItems, error: galleryError },
    { data: serviceData, error: serviceError }
  ] = await Promise.all([
    supabase
      .from('gallery_images')
      .select('*')
      .eq('category', currentCategory.filter)
      .order('created_at', { ascending: false }),
    supabase
      .from('services')
      .select('image_url')
      .eq('title', currentCategory.name)
      .limit(1)
  ]);

  if (galleryError) console.error("Error fetching category images:", galleryError);
  if (serviceError) console.error("Error fetching service image:", serviceError);
  
  const fullCategoryItems = galleryItems || [];

  const fallbackServices = [
    { title: "Newborn Photography", image_url: "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg" },
    { title: "Fashion & Editorial", image_url: "/adele-morris-mDiFpFl_jTs-unsplash.jpg" },
    { title: "Conceptual Arts", image_url: "/yuri-li-p0hDztR46cw-unsplash.jpg" },
    { title: "Maternity", image_url: "/toa-heftiba-C-8uOz7GluA-unsplash.jpg" }
  ];

  const fallbackImage = fallbackServices.find(s => s.title === currentCategory.name)?.image_url;
  const uploadedImage = Array.isArray(serviceData) && serviceData.length > 0 ? serviceData[0].image_url : serviceData?.image_url;
  const heroImageSrc = uploadedImage || fallbackImage || '/placeholder.jpg';

  return (
    <div className="bg-white min-h-screen text-black overflow-x-hidden font-display selection:bg-black selection:text-white">
      <Header />
      <main className="bg-neutral-50 min-h-screen">
      
      {/* Full Screen Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-end px-6 pb-24 md:pb-32 overflow-hidden">
        {heroImageSrc && (
          <AnimatedHeroImage src={heroImageSrc} alt={currentCategory.name} />
        )}
        {/* Dark overlay for text legibility adjusted for light theme text reading */}
         <div className="absolute inset-0 bg-linear-to-t from-neutral-800 via-black/40 to-black/20" />
        
        <div className="relative z-10 max-w-screen-2xl mx-auto w-full px-0 md:px-10">
          <Link href="/#gallery" className="inline-flex items-center gap-2 text-neutral-300 hover:text-black transition-colors mb-6 md:mb-8 group">
            <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="font-serif italic text-lg tracking-wide">Back to Home</span>
          </Link>

          <Reveal>
            <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-neutral-300 mb-4">Gallery Collection</h3>
            <AnimatedText text={currentCategory.name} className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] mb-4 md:mb-6 text-white" />
            <p className="text-neutral-300 font-display max-w-2xl text-base md:text-lg leading-relaxed">
              {currentCategory.desc} Discover the full collection of moments captured with precision and emotion.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 px-6 bg-neutral-50">
        <div className="max-w-screen-2xl mx-auto">
          <CategoryGalleryGrid items={fullCategoryItems} />
        </div>
      </section>
    </main>
      <Footer />
    </div>
  );
}
