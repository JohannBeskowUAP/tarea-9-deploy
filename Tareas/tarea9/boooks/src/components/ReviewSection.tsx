"use client";
import { useState } from "react";

interface Review {
  id: number;
  content: string;
  rating: number;
}

interface ReviewSectionProps {
  bookId: string;
}

export default function ReviewSection({ bookId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const addReview = () => {
    if (!content.trim() || rating === 0) return;
    setReviews([
      ...reviews,
      { id: reviews.length + 1, content, rating }
    ]);
    setContent("");
    setRating(0);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>✨</span> Reviews <span>✨</span>
      </h2>

      {/* Review form */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">Calificación</label>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl focus:outline-none transition transform hover:scale-125"
            >
              <span
                className={
                  star <= (hoverRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe tu reseña aquí..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
        />

        <button
          onClick={addReview}
          className="bg-blue-500 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Publicar reseña
        </button>
      </div>

      {/* Reviews list */}
      <ul className="space-y-4">
        {reviews.map((r) => (
          <li
            key={r.id}
            className="p-5 rounded-lg shadow-md bg-gradient-to-r from-yellow-50 to-white hover:shadow-lg transition"
          >
            <p className="text-yellow-400 text-lg font-semibold mb-2">
              {"★".repeat(r.rating)}
            </p>
            <p className="text-gray-700">{r.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
