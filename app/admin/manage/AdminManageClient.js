'use client'

import { useState, useTransition, useMemo } from 'react';
import Image from 'next/image';
import { deleteImage } from '../actions/gallery';
import { Trash2, Search, SlidersHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminManageClient({ initialItems }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedItems = useMemo(() => {
    let items = [...initialItems];

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      items = items.filter(item => 
        (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
        (item.category && item.category.toLowerCase().includes(lowerQuery))
      );
    }

    switch (sortBy) {
      case 'oldest':
        items.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'title_asc':
        items.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'title_desc':
        items.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
        break;
      case 'category_asc':
        items.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
        break;
      case 'newest':
      default:
        items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    return items;
  }, [initialItems, searchQuery, sortBy]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    startTransition(async () => {
      const res = await deleteImage(id);
      if (res?.error) {
        alert(res.error);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto font-display">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-serif mb-2 text-black">Manage Gallery</h1>
          <p className="text-neutral-500">View and remove images from your main portfolio.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input 
              type="text"
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-black text-black bg-white"
            />
          </div>
          
          <div className="relative shrink-0">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-8 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-black text-black bg-white appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title_asc">Title (A-Z)</option>
              <option value="title_desc">Title (Z-A)</option>
              <option value="category_asc">Category</option>
            </select>
          </div>

          <div className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center whitespace-nowrap">
            {filteredAndSortedItems.length} Images
            {isPending && <span className="ml-2 animate-pulse text-neutral-400">Wait...</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredAndSortedItems.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-48 w-full bg-neutral-100">
              <Image 
                src={item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : '/placeholder.jpg'}
                alt={item.title}
                fill
                className="object-cover"
              />
              
              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors transform hover:scale-110 cursor-pointer"
                  title="Delete Image"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-medium text-sm text-black truncate">{item.title}</h3>
              <p className="text-xs text-neutral-500 mt-1 truncate">{item.category}</p>
            </div>
          </div>
        ))}
        
        {filteredAndSortedItems.length === 0 && (
          <div className="col-span-full py-12 text-center text-neutral-500 text-sm border-2 border-dashed border-neutral-200 rounded-xl">
            {searchQuery ? "No images match your search criteria." : "No images in the gallery yet."}
          </div>
        )}
      </div>
    </div>
  );
}
