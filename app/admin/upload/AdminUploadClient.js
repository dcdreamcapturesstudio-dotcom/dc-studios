'use client'

import { useState, useRef, useTransition } from 'react';
import { uploadImage } from '../actions/gallery';
import { Upload, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminUploadClient({ categories = [] }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const formRef = useRef(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 2) {
      setError('You can only upload a maximum of 2 images at once.');
      setPreviewUrls([]);
      e.target.value = ''; // Reset input
      return;
    }
    setError(null);
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);
    setSuccess(false);
    
    const formData = new FormData(e.currentTarget);
    formData.delete('images');
    const fileInput = e.currentTarget.querySelector('input[name="images"]');
    if (fileInput && fileInput.files) {
      Array.from(fileInput.files).forEach(file => {
        formData.append('images', file);
      });
    }
    
    try {
      const res = await uploadImage(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        formRef.current?.reset();
        setSuccess(true);
        setPreviewUrls([]);
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (err) {
      setError('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto font-display">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2 text-black">Upload to Gallery</h1>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
        
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-md mb-6 text-sm">
            Image uploaded successfully to the gallery!
          </div>
        )}

        <form ref={formRef} onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Title</label>
            <input 
              type="text" 
              name="title"
              required
              className="w-full bg-neutral-50 border border-neutral-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              placeholder="e.g. Vintage Portrait"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Category</label>
            <select 
              name="tags"
              required
              className="w-full bg-neutral-50 border border-neutral-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              defaultValue=""
            >
              <option value="" disabled>Select a category</option>
              {categories.map(c => (
                <option key={c.slug} value={c.filter}>{c.name}</option>
              ))}
            </select>
            <p className="text-xs text-neutral-500 mt-2">The image will be filed under this category.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Image File(s) - Max 2</label>
            <div className={`relative border-2 border-dashed rounded-lg overflow-hidden bg-neutral-50 text-center hover:bg-neutral-100 transition-colors group ${previewUrls.length > 0 ? 'border-black' : 'border-neutral-300 hover:border-black'}`}>
              <input 
                type="file" 
                name="images"
                accept="image/*"
                multiple
                required
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {previewUrls.length > 0 ? (
                <div className="relative w-full h-auto min-h-64 p-4">
                  <div className={`grid gap-4 ${previewUrls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative h-48 rounded overflow-hidden border border-neutral-200">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={url} alt={`Preview ${idx + 1}`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                      <span className="text-white font-medium flex items-center gap-2"><Upload size={18} /> Change Images</span>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-10 pointer-events-none">
                  <Upload className="mx-auto h-10 w-10 text-neutral-400 group-hover:text-black mb-3 transition-colors" />
                  <span className="text-sm font-medium text-black block mb-1">Click or drag images here</span>
                  <span className="text-xs text-neutral-500">Max file size: 5MB per image. Select up to 2.</span>
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isUploading}
            className="w-full bg-black text-white font-medium py-3 rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>
    </div>
  );
}
