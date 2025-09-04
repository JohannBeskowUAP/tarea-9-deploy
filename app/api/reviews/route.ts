// app/api/reviews/route.ts
import { NextResponse } from "next/server";

// Fake in-memory reviews (replace with DB later)
let reviews: {
  id: number;
  bookId: string;
  author: string;
  content: string;
  rating: number;
}[] = [
  { id: 1, bookId: "1", author: "Alice", content: "Loved it!", rating: 5 },
  { id: 2, bookId: "2", author: "Bob", content: "Not bad, a bit slow.", rating: 3 },
];

// GET /api/reviews?bookId=1 → fetch reviews for a book
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("bookId");

  if (!bookId) {
    return NextResponse.json(reviews);
  }

  const filtered = reviews.filter((r) => r.bookId === bookId);
  return NextResponse.json(filtered);
}

// POST /api/reviews → add a new review
export async function POST(req: Request) {
  try {
    const { bookId, author, content, rating } = await req.json();

    if (!bookId || !author || !content || rating == null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReview = {
      id: reviews.length + 1,
      bookId,
      author,
      content,
      rating: Math.max(1, Math.min(5, rating)), // clamp 1–5
    };

    reviews.push(newReview);
    return NextResponse.json(newReview, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }
}

// DELETE /api/reviews/:id → delete review (optional)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Review ID is required" },
      { status: 400 }
    );
  }

  const before = reviews.length;
  reviews = reviews.filter((r) => r.id !== Number(id));

  if (reviews.length === before) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Review deleted" });
}
