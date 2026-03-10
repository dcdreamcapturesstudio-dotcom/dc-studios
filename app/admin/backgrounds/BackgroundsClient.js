'use client'

import { useState, useRef, useTransition } from 'react';
import Image from 'next/image';
import { saveBackgroundRecord, deleteBackground } from '../actions/backgrounds';
import { Trash2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const CATEGORY_OPTIONS = [
  { label: 'New Born',  value: 'newBorn' },
  { label: 'Maternity', value: 'maternity' },
  { label: 'Family',  value: 'family' },
  { label: 'Kids/Toddlers',  value: 'kidsToddlers' },
  { label: 'Cake Smash',  value: 'cakeSmash' },
  { label: 'Child & Sibling',  value: 'childSibling' },
  { label: 'Fashion',  value: 'fashion' },
  { label: 'Bath Tub',  value: 'bathTub' },
  { label: 'About - I',  value: 'aboutBgs' },
  { label: 'About - II', value: 'aboutBgs2' },
  { label: 'About - III',       value: 'aboutBgs3' },
  { label: 'Contact',    value: 'contactBgs' },
  { label: 'Testimonials - I', value: 'testimonials'},
  { label: 'Testimonials - II', value: 'testimonials2'},
];

export default function BackgroundsClient({ allItems }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const formRef = useRef(null);
  const router  = useRouter();
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
    setIsUploading(true);
    setError(null);
    setSuccess(false);

    const fileInput = e.currentTarget.querySelector('input[name="image"]');
    const file = fileInput?.files?.[0];

    if (!file || !selectedCategory) {
      setError('Missing file or category');
      setIsUploading(false);
      return;
    }

    try {
      const timeHash = Math.random().toString(36).substring(2, 8);
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
      const filename = `bgs/${Date.now()}-${timeHash}-${safeName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('admin-uploads')
        .upload(filename, file, {
          contentType: file.type,
          upsert: false
        });

      if (uploadError) throw uploadError;

      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/admin-uploads/${uploadData.path}`;

      const res = await saveBackgroundRecord({
        imageUrl,
        category: selectedCategory
      });

      if (res?.error) {
        setError(res.error);
      } else {
        formRef.current?.reset();
        setPreviewUrl(null);
        setSelectedCategory('');
        setSuccess(true);
        startTransition(() => router.refresh());
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (imagePath, category, id) => {
    if (!confirm('Delete this background?')) return;
    startTransition(async () => {
      const res = await deleteBackground(imagePath, category, id);
      if (res?.error) alert(res.error);
      else router.refresh();
    });
  };

  // Flatten all items for display
  const allDisplayItems = CATEGORY_OPTIONS.flatMap(({ label, value }) =>
    (allItems[value] || []).map((item) => ({ src: item.image_url, id: item.id, category: value, label }))
  );

  return (
    <div className="font-display">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2 text-black">Backgrounds</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-neutral-200 p-6 shadow-sm md:sticky md:top-24">
            <h2 className="text-xl font-serif mb-6 text-black">Upload New</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 text-sm">{error}</div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4 text-sm">Background uploaded successfully!</div>
            )}

            <form ref={formRef} onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Category</label>
                <select
                  name="categoryDisplay"
                  required
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-md px-4 py-2 text-black focus:outline-none focus:border-black transition-colors"
                >
                  <option value="" disabled>Select a section</option>
                  {CATEGORY_OPTIONS.map(({ label, value }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

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
                    <div className="relative w-full h-44 md:h-52">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium flex items-center gap-2 pointer-events-none"><Upload size={16} /> Change</span>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-8 md:py-12 pointer-events-none">
                      <Upload className="mx-auto h-8 w-8 text-neutral-400 group-hover:text-black mb-2 transition-colors" />
                      <span className="text-sm font-medium text-black block">Click or drag image</span>
                      <span className="text-[10px] text-neutral-400 block mt-1">Max file size: 25MB</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading || !selectedCategory}
                className="w-full bg-black text-white font-medium py-3 rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </form>
          </div>
        </div>

        {/* Image Grid */}
        <div className="lg:col-span-2">
          {allDisplayItems.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 border-2 border-dashed border-neutral-200 rounded-xl">
              No backgrounds uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
              {allDisplayItems.map(({ src, category, label, id }, idx) => (
                <div key={idx} className="group relative bg-white overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="relative h-44 w-full bg-neutral-100 shrink-0">
                      <Image src={src} alt={label} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(src, category, id)}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer shadow-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-white flex-1 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-black truncate">{label}</span>
                    {/* Mobile/Tablet persistent delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(src, category, id);
                      }}
                      className="lg:hidden p-2 bg-red-50 text-red-500 rounded-full active:bg-red-100 transition-colors"
                      title="Delete Background"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
