import { supabase } from "../../lib/supabase";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Gallery from "../../components/Gallery";


export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Portfolio | DC Studios",
  description: "Browse our full portfolio — maternity, newborn, baby, cake smash, family, child sessions, and fashion photography.",
};

export default async function PortfolioPage() {
  const [{ data: galleryData }, { data: heroData }] = await Promise.all([
    supabase.from('gallery_images').select('*').order('created_at', { ascending: false }),
    supabase.from('hero_backgrounds').select('image_url').order('display_order', { ascending: true }).order('created_at', { ascending: false }).limit(2),
  ]);


  const fallbackGalleryItems = [
    { title: "Maternity", category: "Maternity", tags: ["Maternity"], image_urls: ["/toa-heftiba-C-8uOz7GluA-unsplash.jpg"] },
    { title: "Newborn Session", category: "Newborn", tags: ["Newborn"], image_urls: ["/nihal-karkala-M5aSbOXeDyo-unsplash.jpg"] },
    { title: "Baby Portrait", category: "Baby", tags: ["Baby"], image_urls: ["/yuri-li-p0hDztR46cw-unsplash.jpg"] },
    { title: "Cake Smash", category: "CakeSmash", tags: ["CakeSmash"], image_urls: ["/freestocks-ux53SGpRAHU-unsplash.jpg"] },
    { title: "Family Portrait", category: "Family", tags: ["Family"], image_urls: ["/adele-morris-mDiFpFl_jTs-unsplash.jpg"] },
    { title: "Child & Sibling", category: "Child", tags: ["Child"], image_urls: ["/christian-bowen-I0ItPtIsVEE-unsplash.jpg"] },
    { title: "Fashion Portrait", category: "Fashion", tags: ["Fashion"], image_urls: ["/yuri-li-p0hDztR46cw-unsplash.jpg"] },
  ];

  const galleryItems = galleryData && galleryData.length > 0 ? galleryData : fallbackGalleryItems;

  return (
    <div className="bg-white min-h-screen text-black overflow-hidden">
      <Header />

      

      {/* Full Gallery Component */}
      <Gallery galleryItems={galleryItems} />

      <Footer />
    </div>
  );
}
