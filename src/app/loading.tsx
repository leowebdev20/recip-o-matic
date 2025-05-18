export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Adjust min-h based on header/footer */}
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
      <p className="ml-4 text-xl text-gray-700 dark:text-gray-300">Loading...</p>
    </div>
  );
}