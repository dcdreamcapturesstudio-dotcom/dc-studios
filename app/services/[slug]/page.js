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
  };

  // Fetch from Supabase for dynamic images (Hero and Gallery)
  const categoryFilters = [currentCategory.filter];
  const altFilter = bgCategoryMap[currentCategory.filter];
  if (altFilter) categoryFilters.push(altFilter);

  const [
    { data: bgsData },
    { data: galleryData },
    { data: servicesTableData }
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
      .select('*')
  ]);
    
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
      "child-sibling": "/christian-bowen-I0ItPtIsVEE-unsplash.jpg"
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
    />
  );
}
