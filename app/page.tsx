"use client"
import { searchBooks } from "./lib/googleBooks";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import './globals.css'

export default function HomePage() {
  const [books, setBooks] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    const results = await searchBooks(query);
    setBooks(results);
  };

  // Suggested books on first load
  const suggestedBooks = [
    "harry potter",
    "lord of the rings",
    "to kill a mockingbird",
  ];

  const fetchSuggestedBooks = async () => {
    const all: any[] = [];
    for (let title of suggestedBooks) {
      const res = await searchBooks(title);
      all.push(...res);
    }
    setBooks(all);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Book Explorer</h1>

      <SearchBar onSearch={handleSearch} />

      <button
        onClick={fetchSuggestedBooks}
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Load Suggested Books
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book: any) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            thumbnail={book.volumeInfo.imageLinks?.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}
