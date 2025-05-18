import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <SearchX size={80} className="text-teal-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Sorry, the page you are looking for does not exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-lg font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800"
      >
        Go Back Home
      </Link>
    </div>
  );
}
