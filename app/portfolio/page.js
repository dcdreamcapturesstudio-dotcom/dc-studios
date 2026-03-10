import { supabase } from "../../lib/supabase";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Gallery from "../../components/Gallery";


export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Portfolio | DC Studios",
  description: "Explore our premium portfolio featuring Maternity, Newborn, Toddler, Fashion, and Bath Tub photography. Capturing timeless moments in Tirupati.",
  openGraph: {
    title: "DC Studios Portfolio | Professional Photography",
    description: "Witness our artistic range in Newborn, maternity, and High-end conceptual Fashion & Bath Tub shoots.",
    images: ["/dc-favicon.png"],
  }
};

export default async function PortfolioPage() {
  const [{ data: galleryData }, { data: heroData }] = await Promise.all([
    supabase.from('gallery_images').select('*').order('created_at', { ascending: false }),
    supabase.from('hero_backgrounds').select('image_url').order('display_order', { ascending: true }).order('created_at', { ascending: false }).limit(2),
  ]);


  const fallbackGalleryItems = [
    { id: 1, title: 'Maternity Portrait', category: 'Maternity', image: '/toa-heftiba-C-8uOz7GluA-unsplash.jpg' },
    { id: 2, title: 'Newborn Session', category: 'Newborn', image: '/nihal-karkala-M5aSbOXeDyo-unsplash.jpg' },
    { id: 3, title: 'Toddler Milestone', category: 'Baby', image: '/yuri-li-p0hDztR46cw-unsplash.jpg' },
    { id: 4, title: 'Fashion Shoot', category: 'Fashion', image: '/adele-morris-mDiFpFl_jTs-unsplash.jpg' },
    { id: 5, title: 'Bath Tub Portrait', category: 'BathTub', image: '/yuri-li-p0hDztR46cw-unsplash.jpg' },
    { id: 6, title: 'Family Moment', category: 'Family', image: '/adele-morris-mDiFpFl_jTs-unsplash.jpg' },
    { id: 7, title: 'Child Portrait', category: 'Child', image: '/christian-bowen-I0ItPtIsVEE-unsplash.jpg' },
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
