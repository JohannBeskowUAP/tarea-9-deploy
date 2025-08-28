export interface Review {
  id: string;
  bookId: string;
  user: string;
  text: string;
  rating: number;
  votes: number;
}

export async function fetchReviews(bookId: string): Promise<Review[]> {
  const res = await fetch(`/api/reviews?bookId=${bookId}`);
  return res.json();
}

export async function addReview(bookId: string, user: string, text: string, rating: number): Promise<Review> {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId, user, text, rating }),
  });
  return res.json();
}

export async function voteReview(reviewId: string, delta: number): Promise<Review> {
  const res = await fetch("/api/voteReview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewId, delta }),
  });
  return res.json();
}
