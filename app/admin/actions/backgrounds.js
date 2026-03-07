'use server'

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function saveBackgroundRecord({ imageUrl, category, title }) {
  try {
    if (!imageUrl || !category) {
      return { error: 'Missing required data' };
    }

    // Based on category, insert into the correct table
    if (category === 'heroImages') {
      const { error: dbError } = await supabase.from('hero_backgrounds').insert({
        title: title || 'Hero Image',
        image_url: imageUrl
      });
      if (dbError) throw dbError;
    } else if (category === 'servicesImages') {
      const { error: dbError } = await supabase.from('services').insert({
        title: title || 'New Service',
        image_url: imageUrl
      });
      if (dbError) throw dbError;
    } else {
      // For aboutBgs, galleryBgs, etc.
      const { error: dbError } = await supabase.from('backgrounds').insert({
        category: category,
        image_url: imageUrl
      });
      if (dbError) throw dbError;
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Save Error:', error);
    return { error: error.message };
  }
}

export async function deleteBackground(imagePath, category, id) {
  try {
    // 1. Delete from Supabase Storage
    // Extract the filename from the URL, but preserve the 'bgs/' prefix structure
    const urlParts = imagePath.split('/');
    const filename = urlParts[urlParts.length - 1];
    const pathToDelete = `bgs/${filename}`;

    const { error: storageError } = await supabase.storage
      .from('admin-uploads')
      .remove([pathToDelete]);
    
    if (storageError) {
      console.error("Storage deletion error:", storageError);
      // Proceed to try and delete the DB record anyway
    }

    // 2. Delete from DB based on category
    if (category === 'heroImages') {
      // If no ID was passed (because old UI didn't have UUIDs), we delete by image_url
      if (id) {
        await supabase.from('hero_backgrounds').delete().eq('id', id);
      } else {
        await supabase.from('hero_backgrounds').delete().eq('image_url', imagePath);
      }
    } else if (category === 'servicesImages') {
      if (id) {
        await supabase.from('services').delete().eq('id', id);
      } else {
        await supabase.from('services').delete().eq('image_url', imagePath);
      }
    } else {
      if (id) {
        await supabase.from('backgrounds').delete().eq('id', id);
      } else {
        await supabase.from('backgrounds').delete().eq('image_url', imagePath).eq('category', category);
      }
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Delete Error:', error);
    return { error: error.message };
  }
}
