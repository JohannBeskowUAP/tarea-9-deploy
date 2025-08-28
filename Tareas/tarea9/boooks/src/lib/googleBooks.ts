const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks(query: string) {
  const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=12`);
  const data = await res.json();
  return data.items || [];
}

export async function getBookById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}
