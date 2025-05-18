"use client";

import React, { useState, FormEvent } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  initialQuery = "",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      setError("Please enter an ingredient or keyword to search.");
      return;
    }
    setError(null);
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2 items-start">
        <Input
          type="search"
          name="recipe-search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error && e.target.value.trim()) {
              setError(null);
            }
          }}
          placeholder="Search recipes by ingredient or name..."
          aria-label="Search recipes"
          className="flex-grow !mb-0"
          wrapperClassName="flex-grow w-full sm:w-auto !mb-0"
        />
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full sm:w-auto"
          leftIcon={<Search size={18} />}
        >
          Search
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </form>
  );
};

export default SearchBar;
