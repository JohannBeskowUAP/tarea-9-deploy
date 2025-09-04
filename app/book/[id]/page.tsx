import { getBookById } from "../../lib/googleBooks";
import ReviewSection from "../../components/ReviewSection";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;              // 👈 esperar params
  const book = await getBookById(id);

  if (!book) {
    return (
      <div className="p-6 text-center text-red-600">
        Book not found.
      </div>
    );
  }

  const info = book.volumeInfo;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow rounded-xl p-6">
        {/* Book Cover */}
        {info.imageLinks?.thumbnail && (
          <img
            src={info.imageLinks.thumbnail}
            alt={info.title}
            className="w-full rounded-lg shadow-md"
          />
        )}

        {/* Book Details */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{info.title}</h1>
          {info.authors && (
            <p className="text-gray-600 italic">
              by {info.authors.join(", ")}
            </p>
          )}
          {info.description && (
            <p className="text-gray-800 leading-relaxed">
              {info.description}
            </p>
          )}
        </div>
      </div>

      {/* Review Section */}
      <ReviewSection bookId={id} />
    </div>
  );
}
