'use server'

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function addReview(formData) {
  try {
    const name   = formData.get('name');
    const text   = formData.get('text');
    const rating = parseInt(formData.get('rating') || '5', 10);
    const date   = formData.get('date');

    if (!name || !text || !date) {
      return { error: 'All fields are required.' };
    }

    const { error } = await supabase.from('reviews').insert({
      client_name: name,
      rating,
      review_text: text,
      date
    });

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Add Review Error:', error);
    return { error: error.message };
  }
}

export async function deleteReview(id) {
  try {
    const { error } = await supabase.from('reviews').delete().eq('id', id);

    if (error) {
      console.error("Supabase delete error:", error);
      throw error;
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Delete Review Error:', error);
    return { error: error.message };
  }
}
