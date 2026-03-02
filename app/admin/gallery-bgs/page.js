import { supabase } from '@/lib/supabase';
import BackgroundManagerClient from '../components/BackgroundManagerClient';

export const dynamic = 'force-dynamic';

export default async function GalleryBackgroundsPage() {
  const { data: galleryBgs } = await supabase.from('backgrounds').select('*').eq('category', 'galleryBgs').order('created_at', { ascending: false });

  return (
    <BackgroundManagerClient 
      category="galleryBgs"
      items={galleryBgs || []}
      title="Gallery Backgrounds"
      description="Manage the background images used for gallery categories."
    />
  );
}
