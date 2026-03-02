import { supabase } from '@/lib/supabase';
import BackgroundsClient from './BackgroundsClient';

export const dynamic = 'force-dynamic';

export default async function BackgroundsPage() {
  const { data: bgs } = await supabase
    .from('backgrounds')
    .select('*')
    .order('created_at', { ascending: false });

  const allItems = {
    aboutBgs:   (bgs || []).filter(b => b.category === 'aboutBgs'),
    aboutBgs2:  (bgs || []).filter(b => b.category === 'aboutBgs2'),
    contactBgs: (bgs || []).filter(b => b.category === 'contactBgs'),
    servicesBg: (bgs || []).filter(b => b.category === 'servicesBg'),
  };

  return <BackgroundsClient allItems={allItems} />;
}
