'use server'

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function saveGalleryRecord({ title, category, urls }) {
  try {
    if (!urls || urls.length === 0 || !title || !category) {
      return { error: 'Missing required fields' };
    }

    const { error: dbError } = await supabase
      .from('gallery_images')
      .insert({
        title,
        category,
        image_urls: urls
      });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return { error: `Failed to save record: ${dbError.message}` };
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Save Error:', error);
    return { error: error.message || String(error) };
  }
}

export async function deleteImage(id) {
  try {
    // 1. Fetch the record to get the image URLs
    const { data: record, error: fetchError } = await supabase
      .from('gallery_images')
      .select('image_urls')
      .eq('id', id)
      .single();

    if (fetchError) {
      return { error: `Could not find record: ${fetchError.message}` };
    }

    // 2. Extract filenames for storage deletion
    if (record && record.image_urls) {
      const filenamesToDelete = record.image_urls.map(url => {
        // Extract the filename from the end of the Supabase public URL
        const parts = url.split('/');
        return parts[parts.length - 1];
      });

      // 3. Delete from Supabase Storage
      if (filenamesToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('admin-uploads')
          .remove(filenamesToDelete);
        
        if (storageError) {
          console.error("Storage deletion error:", storageError);
          // Non-fatal, we still try to delete the db row
        }
      }
    }

    // 4. Delete the database record
    const { error: deleteError } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return { error: `Database deletion failed: ${deleteError.message}` };
    }

    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error) {
    console.error('Delete Error:', error);
    return { error: error.message };
  }
}
