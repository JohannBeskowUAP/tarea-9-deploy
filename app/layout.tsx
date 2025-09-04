import "./styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="p-6">
        <h1 className="text-3xl font-bold mb-4">📚 Book Reviews App</h1>
        {children}
      </body>
    </html>
  );
}
