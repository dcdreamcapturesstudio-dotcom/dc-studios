'use client'

import { useState, useTransition } from 'react';
import { addReview, deleteReview } from '../actions/reviews';
import { Trash2, Star, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

function StarRating({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            size={22}
            className={star <= value ? 'text-black fill-black' : 'text-neutral-300'}
          />
        </button>
      ))}
    </div>
  );
}

export default function ManageReviewsClient({ initialReviews }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    setError(null);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);
    formData.set('rating', rating.toString());
    try {
      const res = await addReview(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        e.target.reset();
        setRating(5);
        setSuccess(true);
        startTransition(() => router.refresh());
      }
    } catch {
      setError('An error occurred.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this review?')) return;
    startTransition(async () => {
      const res = await deleteReview(id);
      if (res?.error) alert(res.error);
      else router.refresh();
    });
  };

  return (
    <div className="font-display">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2 text-black">Manage Reviews</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Add Review Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm md:sticky md:top-24">
            <h2 className="text-xl font-serif mb-6 text-black">Add Review</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 text-sm">{error}</div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4 text-sm">Review added successfully!</div>
            )}

            <form onSubmit={handleAdd} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Customer Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-md px-4 py-2 text-black focus:outline-none focus:border-black transition-colors"
                  placeholder="e.g. Priya Mehta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Rating</label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Review</label>
                <textarea
                  name="text"
                  required
                  rows={4}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-md px-4 py-2 text-black focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Write the customer's review here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-md px-4 py-2 text-black focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isAdding}
                className="w-full bg-black text-white font-medium py-3 rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                {isAdding ? 'Adding...' : 'Add Review'}
              </button>
            </form>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          {initialReviews.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 border-2 border-dashed border-neutral-200 rounded-xl">
              No reviews yet. Add your first one!
            </div>
          ) : (
            initialReviews.map((review) => (
              <div key={review.id} className="group bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-black">{review.client_name}</span>
                      <span className="text-xs text-neutral-400">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-3">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={14} className={s <= review.rating ? 'text-black fill-black' : 'text-neutral-200 fill-neutral-200'} />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{review.review_text}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer shrink-0"
                    title="Delete Review"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
