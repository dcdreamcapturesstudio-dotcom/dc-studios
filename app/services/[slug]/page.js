import { supabase } from "../../../lib/supabase";
import { categories } from "../../../lib/constants";
import { serviceDetails } from "../../../lib/serviceDetails";
import ServiceDetail from "../../../components/ServiceDetail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({
    slug,
  }));
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServicePage({ params }) {
  const { slug } = await params;
  
  const detailsData = serviceDetails[slug];
  
  if (!detailsData) {
    notFound();
  }

  // Get the display title from constants
  const currentCategory = categories.find((c) => c.slug === slug);
  
  if (!currentCategory) {
    notFound();
  }

  const serviceTitle = currentCategory?.name || detailsData.heroTitle;

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

  // Fetch from Supabase for dynamic images (Hero and Gallery)
  const categoryFilters = [currentCategory.filter];
  const altFilter = bgCategoryMap[currentCategory.filter];
  if (altFilter) categoryFilters.push(altFilter);

  const [
    { data: bgsData },
    { data: galleryData },
    { data: servicesTableData },
    { data: reviewsData }
  ] = await Promise.all([
    supabase
      .from('backgrounds')
      .select('*'),
    supabase
      .from('gallery_images')
      .select('*')
      .in('category', categoryFilters)
      .order('created_at', { ascending: false }),
    supabase
      .from('services')
      .select('*'),
    supabase
      .from('reviews')
      .select('*')
      .order('date', { ascending: false })
  ]);

  const reviews = reviewsData && reviewsData.length > 0 
    ? reviewsData.map(r => ({
        text: r.review_text,
        author: r.client_name,
        rating: r.rating || 5,
        sessionType: r.session_type || "CLIENT REVIEW"
      }))
    : fallbackTestimonials;
    
  let heroImage = "";
  // Normalize gallery images: handle both image_url and image_urls array
  const galleryImages = (galleryData || []).flatMap(item => {
    if (item.image_urls && Array.isArray(item.image_urls) && item.image_urls.length > 0) {
      return item.image_urls;
    } else if (item.image_url) {
      return [item.image_url];
    }
    return [];
  });

  const getBaseTitle = (t) => t ? t.replace(/ Session$/i, '').replace(/ Photography$/i, '').trim() : "";
  
  // 1. Prioritize image from services table (uploaded via "Services Images")
  const servicesTableMatch = servicesTableData?.find(s => getBaseTitle(s.title) === getBaseTitle(serviceTitle));
  
  // 2. Fallback to backgrounds table (older method)
  const uploadedBackground = bgsData?.find(b => b.category === bgCategoryMap[currentCategory.filter])?.image_url;

  if (servicesTableMatch?.image_url) {
    heroImage = servicesTableMatch.image_url;
  } else if (uploadedBackground) {
    heroImage = uploadedBackground;
  } else {
    // Determine static fallback
    const fallbackServices = {
      "maternity": "/toa-heftiba-C-8uOz7GluA-unsplash.jpg",
      "newborn-photography": "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg",
      "baby-toddler": "/yuri-li-p0hDztR46cw-unsplash.jpg",
      "cake-smash": "/freestocks-ux53SGpRAHU-unsplash.jpg",
      "family": "/adele-morris-mDiFpFl_jTs-unsplash.jpg",
      "child-sibling": "/christian-bowen-I0ItPtIsVEE-unsplash.jpg",
      "fashion": "/yuri-li-p0hDztR46cw-unsplash.jpg"
    };
    heroImage = fallbackServices[slug] || '/placeholder.jpg';
  }

  return (
    <ServiceDetail 
      slug={slug} 
      serviceTitle={serviceTitle} 
      heroImage={heroImage} 
      detailsData={detailsData} 
      galleryImages={galleryImages}
      bgItems={bgsData || []}
      testimonials={reviews}
    />
  );
}
