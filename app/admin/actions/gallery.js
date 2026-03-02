'use server'

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function uploadImage(formData) {
  try {
    const files = formData.getAll('images');
    const title = formData.get('title');
    const category = formData.get('tags'); // The form uses name="tags" for the category dropdown

    console.log("Starting upload action:", { 
      filesCount: files?.length, 
      title, 
      category 
    });

    if (!files || files.length === 0 || !title) {
      console.error("Missing required fields");
      return { error: 'Missing required fields' };
    }

    if (files.length > 2) {
      return { error: 'Maximum 2 images allowed per upload' };
    }

    const uploadedUrls = [];

    // Upload each file to Supabase Storage
    for (const file of files) {
      console.log("Processing file:", { name: file.name, size: file.size, type: file.type });
      if (!file.name || file.size === 0) {
        console.warn("Skipping empty file buffer");
        continue;
      }
      
      const timeHash = Math.random().toString(36).substring(2, 8);
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
      const filename = `${Date.now()}-${timeHash}-${safeName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('admin-uploads')
        .upload(filename, file, {
          contentType: file.type,
          upsert: false
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        return { error: `Failed to upload image: ${uploadError.message}` };
      }

      // Construct public URL
      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/admin-uploads/${data.path}`;
      uploadedUrls.push(publicUrl);
    }
    
    console.log("Finished storage uploads. URLs to insert:", uploadedUrls);

    if (uploadedUrls.length === 0) {
      return { error: 'No valid files were uploaded to storage.' };
    }

    // Insert record into gallery_images database
    const { error: dbError } = await supabase
      .from('gallery_images')
      .insert({
        title: title,
        category: category,
        image_urls: uploadedUrls
      });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return { error: `Failed to save record: ${dbError.message}` };
    }

    // Revalidate paths so the client gets updated HTML
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error) {
    console.error('Upload Error full trace:', error);
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
