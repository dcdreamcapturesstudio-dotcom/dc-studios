import { supabase } from '@/lib/supabase';
import { categories } from '../../../lib/constants';
import BackgroundManagerClient from '../components/BackgroundManagerClient';

export const dynamic = 'force-dynamic';

export default async function ServicesBackgroundsPage() {
  const { data: servicesImages } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <BackgroundManagerClient 
      category="servicesImages"
      items={servicesImages || []}
      title="Services Assets"
      description="Manage the images and text for the Services section on the homepage and individual service hero backgrounds."
      requiresDetails={true}
      categories={categories}
    />
  );
}
