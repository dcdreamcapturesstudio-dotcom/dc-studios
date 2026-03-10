import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import AnimatedText from "../../../components/AnimateText";
import { Reveal } from "../../../components/Reveal";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CategoryGalleryGrid from "../../../components/CategoryGalleryGrid";
import GalleryHero from "../../../components/GalleryHero";

import { categories } from "../../../lib/constants";
import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import HomePortfolioPreview from "@/components/HomePortfolioPreview";

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

  const fallbackServices = [
    { title: "Newborn Session", image_url: "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg", slug: "newborn-photography" },
    { title: "Baby/Toddler Session", image_url: "/adele-morris-mDiFpFl_jTs-unsplash.jpg", slug: "baby-toddler" },
    { title: "Maternity Session", image_url: "/toa-heftiba-C-8uOz7GluA-unsplash.jpg", slug: "maternity" },
    { title: "Family Session", image_url: "/adele-morris-mDiFpFl_jTs-unsplash.jpg", slug: "family" },
    { title: "Child & Sibling Session", image_url: "/christian-bowen-I0ItPtIsVEE-unsplash.jpg", slug: "child-sibling" },
    { title: "Cake Smash Session", image_url: "/freestocks-ux53SGpRAHU-unsplash.jpg", slug: "cake-smash" },
    { title: "Fashion Session", image_url: "/yuri-li-p0hDztR46cw-unsplash.jpg", slug: "fashion" }
  ];

  // Mapping between gallery category filters and backgrounds table keys
  const bgCategoryMap = {
    Maternity: "maternity",
    Newborn: "newBorn",
    Baby: "kidsToddlers",
    CakeSmash: "cakeSmash",
    Family: "family",
    Child: "childSibling",
    Fashion: "fashion",
  };

  const [
    { data: galleryItems, error: galleryError },
    { data: bgsData, error: bgError }
  ] = await Promise.all([
    supabase
      .from('gallery_images')
      .select('*')
      .eq('category', currentCategory.filter)
      .order('created_at', { ascending: false }),
    supabase
      .from('backgrounds')
      .select('*')
  ]);

  if (galleryError) console.error("Error fetching category images:", galleryError);
  if (bgError) console.error("Error fetching backgrounds:", bgError);
  
  const fullCategoryItems = galleryItems || [];

  // Find fallback image in case background table is missing it
  const currentServiceFallback = fallbackServices.find(f => f.slug === slug);

  // Hero image: find specific match
  const bgMatch = bgsData?.find(b => b.category === bgCategoryMap[currentCategory.filter]);
  const heroImageSrc = bgMatch?.image_url || currentServiceFallback?.image_url || '/placeholder.jpg';

  return (
    <div className="bg-white min-h-screen text-black overflow-x-hidden font-display selection:bg-black selection:text-white">
      <Header />
      <main className="bg-neutral-50 min-h-screen">
      
      <GalleryHero 
        src={heroImageSrc} 
        title={currentCategory.name} 
        subtitle=" PORTFOLIO /GALLERY COLLECTION " 
      />

      {/* Gallery Grid */}
      <section className="py-24 px-6 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-screen-2xl mx-auto">
          <CategoryGalleryGrid items={fullCategoryItems} />
        </div>
      </section>
    </main>
    <HomePortfolioPreview header=" Explore More Portfolios" bgItems={bgsData} />
    <Footer />
    </div>
  );
}
