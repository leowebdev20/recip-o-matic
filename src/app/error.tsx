"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import Button from "./components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <AlertTriangle size={64} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        Oops, something went wrong!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        variant="primary"
      >
        Try again
      </Button>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
        If the problem persists, please contact support. (Digest: {error.digest}
        )
      </p>
    </div>
  );
}
