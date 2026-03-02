import { supabase } from '@/lib/supabase';
import AdminManageClient from './AdminManageClient';

export const dynamic = 'force-dynamic';

export default async function ManagePage() {
  const { data: galleryItems, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Failed to fetch gallery items:", error);
  }

  return <AdminManageClient initialItems={galleryItems || []} />;
}
