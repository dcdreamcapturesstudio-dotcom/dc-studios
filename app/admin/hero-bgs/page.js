import { supabase } from '@/lib/supabase';
import BackgroundManagerClient from '../components/BackgroundManagerClient';

export const dynamic = 'force-dynamic';

export default async function HeroBackgroundsPage() {
  const { data: heroImages } = await supabase
    .from('hero_backgrounds')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <BackgroundManagerClient 
      category="heroImages"
      items={heroImages || []}
      title="Hero Backgrounds"
      description="Manage the sliding backgrounds visible on the main homepage."
    />
  );
}
