
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import HomePortfolioPreview from "../components/HomePortfolioPreview";
import WhyUs from "../components/WhyUs";
import TestimonialSlider from "../components/TestimonialSlider";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollMarquee from "../components/ScrollMarquee";
import StatsSection from "../components/StatsSection";
import { supabase } from "@/lib/supabase";
import AnimatedText from "@/components/AnimateText";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    { title: "Maternity Session", slug: "maternity", desc: "Celebrating the beautiful journey of motherhood with grace.", image_url: "/toa-heftiba-C-8uOz7GluA-unsplash.jpg" },
    { title: "Newborn Session", slug: "newborn-photography", desc: "Delicate, gentle, and timeless—captured in their simplest form.", image_url: "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg" },
    { title: "Baby/Toddler Session", slug: "baby-toddler", desc: "Candid moments tracking their playful and curious milestones.", image_url: "/yuri-li-p0hDztR46cw-unsplash.jpg" },
    { title: "Cake Smash Session", slug: "cake-smash", desc: "First birthday celebrations frozen in the most joyful way.", image_url: "/freestocks-ux53SGpRAHU-unsplash.jpg" },
    { title: "Family Session", slug: "family", desc: "Treasured memories of your family, captured with warmth.", image_url: "/adele-morris-mDiFpFl_jTs-unsplash.jpg" },
    { title: "Child & Sibling Session", slug: "child-sibling", desc: "The unique bond between children—full of personality and love.", image_url: "/christian-bowen-I0ItPtIsVEE-unsplash.jpg" },
  ];

  const fallbackGalleryItems = [
    { title: "Oliver's First Days", category: "Newborn", tags: ["Newborn"], image_urls: ["/adele-morris-mDiFpFl_jTs-unsplash.jpg"] },
    { title: "Sweet Sophia", category: "Fashion", tags: ["Fashion"], image_urls: ["/christian-bowen-I0ItPtIsVEE-unsplash.jpg"] },
    { title: "Avant Garde", category: "Conceptual", tags: ["Conceptual"], image_urls: ["/yuri-li-p0hDztR46cw-unsplash.jpg"] },
    { title: "Emma's Glow", category: "Maternity", tags: ["Maternity"], image_urls: ["/toa-heftiba-C-8uOz7GluA-unsplash.jpg"] }
  ];

  const heroImages = heroData && heroData.length > 0 ? heroData.map(h => h.image_url) : fallbackHeroImages;
  
  // Merge Services: Match DB items to fallbacks by title, ensuring a full 6-item grid
  const getBaseTitle = (t) => t ? t.replace(/ Session$/i, '').replace(/ Photography$/i, '').trim() : "";

  const services = fallbackServices.map(fallback => {
    const dbMatch = servicesData?.find(s => getBaseTitle(s.title) === getBaseTitle(fallback.title));
    if (dbMatch) {
      return {
        title: dbMatch.title || fallback.title,
        slug: dbMatch.slug || fallback.slug,
        desc: dbMatch.desc || fallback.desc,
        image_url: dbMatch.image_url || fallback.image_url
      };
    }
    return fallback;
  });

  // Also add any DB services that DON'T match a fallback (just in case new categories are added)
  const unmatchedDbServices = servicesData?.filter(s => 
    !fallbackServices.some(f => getBaseTitle(f.title) === getBaseTitle(s.title))
  ).map(s => ({
    title: s.title,
    slug: s.slug || s.title.toLowerCase().replace(/\s+/g, '-'),
    desc: s.desc || "",
    image_url: s.image_url
  })) || [];

  if (unmatchedDbServices.length > 0) {
    services.push(...unmatchedDbServices);
  }

  // Define requested sort order
  const order = ["Newborn", "Maternity", "Baby/Toddler", "Family", "Cake Smash", "Child & Sibling"];
  
  // Sort services based on the predefined order
  services.sort((a, b) => {
    const getBaseTitle = (t) => t.replace(/ Session$/i, '').replace(/ Photography$/i, '').trim();
    const indexA = order.indexOf(getBaseTitle(a.title));
    const indexB = order.indexOf(getBaseTitle(b.title));
    
    // If title not found in order array, put it at the end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const contactBg = bgsData?.find(b => b.category === 'contactBgs')?.image_url || "/freestocks-ux53SGpRAHU-unsplash.jpg";
  const aboutBg2 = bgsData?.find(b => b.category === 'aboutBgs2')?.image_url || "/toa-heftiba-C-8uOz7GluA-unsplash.jpg";
  const fallbackTestimonials = [
    { 
      text: "I recently visited DC Studios for a photography session for my baby and the experience was excellent from start to finish. Friendly Environment: The studio has a warm and welcoming atmosphere. Mr. Dileep is approachable, patient, and made me and my family feel comfortable throughout the shoot. Professional Services: DC Studios offers a wide range of services including portrait photography, event coverage, product shoots, and editing packages. The photographers are skilled at guiding poses and using lighting creatively to bring out the best in every shot. Quality & Turnaround: The final images were crisp, well-edited, and delivered promptly. I appreciated the attention to detail in both the photography and post-production work. Value: Pricing felt fair compared to the quality of service. Packages are flexible, making it easy to choose what suits your needs. ✅ Overall: DC Studios combines professionalism with a friendly environment, making it a great choice for anyone looking for high-quality photography services in a comfortable setting.", 
      author: "REKHA C", 
      sessionType: "BABY PHOTO SESSION", 
      image: "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg" 
    },
    { text: "The maternity shoot made me feel so empowered and beautiful. Every single photo is a treasure.", author: "JESSICA MILLER", sessionType: "MATERNITY SESSION", image: "/toa-heftiba-C-8uOz7GluA-unsplash.jpg" },
    { text: "They captured my newborn's tiny details so perfectly. I cry happy tears every time I look at them.", author: "PRIYA SHARMA", sessionType: "NEWBORN SESSION", image: "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg" },
    { text: "The cake smash session was pure magic. My daughter was so comfortable and the photos are incredible.", author: "ANANYA KAPOOR", sessionType: "CAKE SMASH SESSION", image: "/yuri-li-p0hDztR46cw-unsplash.jpg" },
    { text: "They captured the most natural, beautiful family moments. Absolutely no stiff poses — just real love.", author: "RAHUL & PRIYA PATEL", sessionType: "FAMILY SESSION", image: "/adele-morris-mDiFpFl_jTs-unsplash.jpg" },
  ];
  const reviews = reviewsData && reviewsData.length > 0 
    ? reviewsData.map(r => ({
        text: r.review_text,
        author: r.client_name,
        rating: r.rating || 5, // Pass the star rating
        sessionType: r.session_type || "CLIENT REVIEW"
      }))
    : fallbackTestimonials;

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
    <div className="bg-white min-h-screen text-black overflow-hidden font-display selection:bg-black selection:text-white">
      <Header />
      <Hero images={heroImages} />
      <Services services={services} />
<div className="hidden md:block">
      <ScrollMarquee
        line1="We will make a wonderful story"
        line2="Make a statement through every picture"
      />
      </div>
      <AnimatedText text="We will make a wonderful story. Make a statement through every picture"  className="text-black w-full text-center text-4xl font-antic uppercase px-2 py-20 pb-30 md:hidden"/>

      <HomePortfolioPreview galleryItems={galleryItems} bgItems={bgsData} />
      <StatsSection />
      <WhyUs bgImage={contactBg} />
      <TestimonialSlider
        testimonials={reviews}
        staticImages={[
          bgsData?.find(b => b.category === 'testimonials')?.image_url || "/toa-heftiba-C-8uOz7GluA-unsplash.jpg",
          bgsData?.find(b => b.category === 'testimonials2')?.image_url || "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg",
        ]}
      />
      <Contact bgImage={contactBg} />
      <Footer />
    </div>
  );
}
