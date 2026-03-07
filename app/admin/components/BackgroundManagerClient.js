'use client'

import { useState, useRef, useTransition } from 'react';
import Image from 'next/image';
import { uploadBackground, deleteBackground } from '../actions/backgrounds';
import { Trash2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackgroundManagerClient({ 
  category, 
  items, 
  title, 
  description, 
  requiresDetails = false,
  categories = []
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const formRef = useRef(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_SIZE = 25 * 1024 * 1024; // 25MB
      if (!file.type.startsWith('image/')) {
        setError(`Invalid format: "${file.name}" is not an image file.`);
        setPreviewUrl(null);
        e.target.value = '';
        return;
      }
      if (file.size > MAX_SIZE) {
        const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
        setError(`File too large: "${file.name}" is ${sizeInMb}MB. Maximum allowed is 25MB.`);
        setPreviewUrl(null);
        e.target.value = '';
        return;
      }
      setError(null);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (category === 'heroImages' && items.length >= 8) {
      setError('Maximum 8 hero images allowed. Please delete an existing image first.');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await uploadBackground(formData, category);
      if (res?.error) {
        setError(res.error);
      } else {
        formRef.current?.reset();
        setPreviewUrl(null);
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

  const handleDelete = async (imagePath, id) => {
    if (!confirm('Are you sure you want to delete this background?')) return;
    
    startTransition(async () => {
      const res = await deleteBackground(imagePath, category, id);
      if (res?.error) {
        alert(res.error);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <div className="font-display">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-xl">
          <h1 className="text-4xl font-serif mb-2 text-black">{title}</h1>
        </div>
        <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
          {items.length} Images
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-1">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm md:sticky md:top-24">
            <h2 className="text-xl font-serif mb-6 text-black">Upload New</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6 text-sm">
                {error}
              </div>
            )}

            <form ref={formRef} onSubmit={handleUpload} className="space-y-5">
              
              {requiresDetails && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Service Title</label>
                    {categories && categories.length > 0 ? (
                      <select 
                        name="title"
                        required
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-md px-4 py-2 text-black focus:outline-none focus:border-black transition-colors"
                        defaultValue=""
                      >
                        <option value="" disabled>Select a service category</option>
                        {categories.map(c => (
                          <option key={c.slug} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        name="title"
                        required
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-md px-4 py-2 text-black focus:outline-none focus:border-black transition-colors"
                        placeholder="e.g. Newborn Photography"
                      />
                    )}
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-black mb-2">Image File</label>
                <div className={`relative border-2 border-dashed rounded-lg overflow-hidden bg-neutral-50 text-center hover:bg-neutral-100 transition-colors group ${previewUrl ? 'border-black' : 'border-neutral-300 hover:border-black'}`}>
                  <input 
                    type="file" 
                    name="image"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {previewUrl ? (
                    <div className="relative w-full h-48">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-medium flex items-center gap-2"><Upload size={18} /> Change Image</span>
                       </div>
                    </div>
                  ) : (
                    <div className="px-4 py-8">
                      <Upload className="mx-auto h-8 w-8 text-neutral-400 group-hover:text-black mb-2 transition-colors" />
                      <span className="text-sm font-medium text-black block">Click or drag image</span>
                      <span className="text-[10px] text-neutral-400 block mt-1">Max file size: 25MB</span>
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

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item, idx) => {
              const imgPath = item.image_url || item.img || item;
              const displayTitle = item.title || item.category || `Background ${idx + 1}`;
              const displayDesc = item.desc || imgPath.split('/').pop();

              return (
                <div key={idx} className="group relative bg-white rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="relative h-56 w-full bg-neutral-100 shrink-0">
                    <Image 
                      src={imgPath}
                      alt={displayTitle}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => handleDelete(imgPath, item.id)}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors transform hover:scale-110 cursor-pointer shadow-lg"
                        title="Delete Image"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-white flex-1 flex flex-col">
                    <h3 className="font-semibold text-black truncate">{displayTitle}</h3>
                  </div>
                </div>
              );
            })}
            
            {items.length === 0 && (
              <div className="col-span-full py-12 text-center text-neutral-500 border-2 border-dashed border-neutral-200 rounded-xl">
                No backgrounds uploaded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
