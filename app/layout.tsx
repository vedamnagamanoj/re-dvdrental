import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-6 font-sans">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              🎬 re-dvdrental
            </h1>
            <p className="text-gray-600">
              Explore the PostgreSQL DVD Rental Database (read-only)
            </p>
          </div>
          <nav className="flex gap-4 mb-6">
            <Link href="/" className="text-blue-600 hover:underline">
              Films
            </Link>
            <Link href="/customers" className="text-blue-600 hover:underline">
              Customers
            </Link>
            <Link href="/rentals" className="text-blue-600 hover:underline">
              Rentals
            </Link>
          </nav>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
