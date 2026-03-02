
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import WhyUs from "../components/WhyUs";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AnimatedText from "../components/AnimateText";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch required data from Supabase concurrently
  const [
    { data: heroData },
    { data: servicesData },
    { data: bgsData },
    { data: reviewsData },
    { data: galleryData }
  ] = await Promise.all([
    supabase.from('hero_backgrounds').select('image_url').order('display_order', { ascending: true }).order('created_at', { ascending: false }),
    supabase.from('services').select('*').order('created_at', { ascending: false }),
    supabase.from('backgrounds').select('*'),
    supabase.from('reviews').select('*').order('date', { ascending: false }),
    supabase.from('gallery_images').select('*').order('created_at', { ascending: false })
  ]);

  const fallbackHeroImages = [
    "/adele-morris-mDiFpFl_jTs-unsplash.jpg",
    "/christian-bowen-I0ItPtIsVEE-unsplash.jpg",
    "/daniel-thomas-_tYNzEqehMk-unsplash.jpg",
    "/freestocks-ux53SGpRAHU-unsplash.jpg",
  ];

  const fallbackServices = [
    { title: "Newborn Photography", desc: "Delicate, gentle, and timeless captured in their simplest form.", image_url: "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg" },
    { title: "Fashion & Editorial", desc: "Bold, narrative-driven editorial photography.", image_url: "/adele-morris-mDiFpFl_jTs-unsplash.jpg" },
    { title: "Conceptual Arts", desc: "Candid moments tracking their playful and curious milestones.", image_url: "/yuri-li-p0hDztR46cw-unsplash.jpg" },
    { title: "Maternity", desc: "Celebrating the beautiful journey of motherhood with grace.", image_url: "/toa-heftiba-C-8uOz7GluA-unsplash.jpg" }
  ];

  const fallbackGalleryItems = [
    { title: "Oliver's First Days", category: "Newborn", tags: ["Newborn"], image_urls: ["/adele-morris-mDiFpFl_jTs-unsplash.jpg"] },
    { title: "Sweet Sophia", category: "Fashion", tags: ["Fashion"], image_urls: ["/christian-bowen-I0ItPtIsVEE-unsplash.jpg"] },
    { title: "Avant Garde", category: "Conceptual", tags: ["Conceptual"], image_urls: ["/yuri-li-p0hDztR46cw-unsplash.jpg"] },
    { title: "Emma's Glow", category: "Maternity", tags: ["Maternity"], image_urls: ["/toa-heftiba-C-8uOz7GluA-unsplash.jpg"] }
  ];

  const heroImages = heroData && heroData.length > 0 ? heroData.map(h => h.image_url) : fallbackHeroImages;
  
  // Merge Services: Ensure all 4 sections present, override image if uploaded for that title
  const services = fallbackServices.map(fallback => {
    const uploaded = servicesData?.find(s => s.title === fallback.title);
    return uploaded ? { ...fallback, image_url: uploaded.image_url } : fallback;
  });

  const contactBg = bgsData?.find(b => b.category === 'contactBgs')?.image_url || "/freestocks-ux53SGpRAHU-unsplash.jpg";
  const aboutBg2 = bgsData?.find(b => b.category === 'aboutBgs2')?.image_url || "/toa-heftiba-C-8uOz7GluA-unsplash.jpg";
  const reviews = reviewsData && reviewsData.length > 0 ? reviewsData : [];

  // Merge Gallery: Ensure at least one image per category exists so sections don't disappear
  const uploadedGalleryItems = galleryData || [];
  const galleryItems = [...uploadedGalleryItems];
  const galleryCategories = ["Newborn", "Fashion", "Conceptual", "Maternity"];
  
  galleryCategories.forEach(cat => {
    const hasUploads = uploadedGalleryItems.some(item => item.category === cat || (Array.isArray(item.tags) && item.tags.includes(cat)));
    if (!hasUploads) {
      const fallbackItemsForCat = fallbackGalleryItems.filter(f => f.category === cat);
      galleryItems.push(...fallbackItemsForCat);
    }
  });

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden font-display selection:bg-white selection:text-black">
      <Header />
      <Hero images={heroImages} />
      <Services services={services} />

      <section className="py-24 md:py-40 bg-neutral-950 flex items-center justify-center px-6">
        <AnimatedText 
          text="We don't just take photographs, we freeze time, preserving the innocence of today for the nostalgia of tomorrow."
          className="max-w-4xl text-center font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-neutral-200"
        />
      </section>

      <Gallery galleryItems={galleryItems} />
      <WhyUs bgImage={aboutBg2} />
      <Reviews reviews={reviews} />
      <Contact bgImage={contactBg} />
      <Footer />
    </div>
  );
}
