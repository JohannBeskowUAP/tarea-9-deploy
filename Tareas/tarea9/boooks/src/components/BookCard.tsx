import Link from "next/link";

type BookCardProps = {
  id: string;
  title: string;
  authors?: string[];
  thumbnail?: string;
};

export default function BookCard({ id, title, authors, thumbnail }: BookCardProps) {
  return (
    <Link href={`/book/${id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition cursor-pointer">
        {thumbnail && (
          <img src={thumbnail} className="w-full h-48 object-cover rounded" />
        )}
        <h3 className="font-bold mt-2">{title}</h3>
        {authors && <p className="text-gray-500 text-sm">{authors.join(", ")}</p>}
      </div>
    </Link>
  );
}
