import { supabase } from '@/lib/supabase';
import ManageReviewsClient from './ManageReviewsClient';

export const dynamic = 'force-dynamic';

export default async function ManageReviewsPage() {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('date', { ascending: false });

  return <ManageReviewsClient initialReviews={reviews || []} />;
}
