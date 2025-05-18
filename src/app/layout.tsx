import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  
import Link from "next/link";
import { Home, Star } from "lucide-react";  
import { FavoritesProvider } from "../../lib/contexts/FavoritesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recip-O-Matic",
  description: "Find and save your favorite recipes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <FavoritesProvider>
          <header className="bg-teal-500 dark:bg-teal-700 text-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link
                href="/"
                className="text-2xl font-bold hover:opacity-80 transition-opacity"
              >
                Recip-O-Matic
              </Link>
              <div className="space-x-4 flex">
                <Link
                  href="/"
                  className="hover:text-teal-200 transition-colors flex items-center"
                >
                  <Home size={20} className="mr-1" /> Home
                </Link>
                <Link
                  href="/favorites"
                  className="hover:text-teal-200 transition-colors flex items-center"
                >
                  <Star size={20} className="mr-1" /> Favorites
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 border-t dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Recip-O-Matic. Powered by{" "}
              <a
                href="https://www.themealdb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:underline"
              >
                TheMealDB
              </a>
              .
            </p>
          </footer>
        </FavoritesProvider>
      </body>
    </html>
  );
}
