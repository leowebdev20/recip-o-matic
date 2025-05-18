"use client";

import React, { useState, useEffect, useCallback } from "react";
import { RefreshCcw } from "lucide-react"; // Added RefreshCcw
import { Recipe, RecipeDetail } from "../../lib/types";
import { getRandomRecipe, searchRecipes } from "../../lib/api";
import SearchBar from "./components/search/SearchBar";
import Button from "./components/ui/Button";
import RecipeList from "./components/recipes/RecipeList";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchInitialRandomRecipes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSearchStatus("loading");
    try {
      // Create an array of 4 promises, each fetching a random recipe
      const recipePromises: Promise<RecipeDetail | null>[] = [];
      for (let i = 0; i < 4; i++) {
        recipePromises.push(getRandomRecipe());
      }
      const results = await Promise.all(recipePromises);

      // Filter out any null results (if an API call failed)
      const fetchedRecipes = results.filter(Boolean) as RecipeDetail[];

      if (fetchedRecipes.length > 0) {
        setRecipes(
          fetchedRecipes.map((recipe) => ({
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strMealThumb: recipe.strMealThumb,
            strInstructions: recipe.strInstructions?.substring(0, 100) + "...",
            strCategory: recipe.strCategory,
          }))
        );
        setSearchStatus("succeeded");
      } else {
        setRecipes([]);
        setError(
          "Could not fetch initial recipe suggestions. Please try refreshing."
        );
        setSearchStatus("failed");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch initial recipes.";
      setError(errorMessage);
      setRecipes([]);
      setSearchStatus("failed");
    } finally {
      setIsLoading(false);
      // Mark initial load as complete
      setIsInitialLoad(false);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    setSearchStatus("loading");
    // A search action means it's no longer the initial empty load
    setIsInitialLoad(false);
    try {
      const results = await searchRecipes(query);
      // searchRecipes already returns Recipe[]
      setRecipes(results);
      setSearchStatus("succeeded");
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch recipes.";
      setError(errorMessage);
      setRecipes([]);
      setSearchStatus("failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch initial recipes only if there's no search query and it's the first load
    if (!searchQuery && isInitialLoad) {
      fetchInitialRandomRecipes();
    }
  }, [searchQuery, fetchInitialRandomRecipes, isInitialLoad]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-soft-text dark:text-white mb-3 text-center">
        Find Your Next Meal!
      </h1>
      <p className="text-lg text-muted-text dark:text-gray-300 mb-8 text-center max-w-xl">
        Discover delightful recipes by searching with ingredients or keywords,
        or get inspired by our random suggestions.
      </p>

      <SearchBar
        onSearch={handleSearch}
        isLoading={isLoading && searchQuery !== ""}
        initialQuery={searchQuery}
      />

      {/* Show title for random suggestions if no search is active and recipes are present */}
      {isInitialLoad &&
        !searchQuery &&
        recipes.length > 0 &&
        searchStatus === "succeeded" && (
          <h2 className="text-2xl font-semibold text-soft-text dark:text-white mt-8 mb-6 text-center">
            Recipe Inspirations
          </h2>
        )}
      {/* Show title for search results */}
      {!isInitialLoad &&
        searchQuery &&
        recipes.length > 0 &&
        searchStatus === "succeeded" && (
          <h2 className="text-2xl font-semibold text-soft-text dark:text-white mt-8 mb-6 text-center">
            Search Results for {searchQuery}
          </h2>
        )}

      {/* Button to refresh random recipes, shown only during initial load state or if random fetch failed */}
      {(isInitialLoad || (searchStatus === "failed" && !searchQuery)) &&
        (recipes.length === 0 || searchStatus === "failed") &&
        !isLoading && (
          <div className="text-center my-6">
            <Button
              onClick={fetchInitialRandomRecipes}
              isLoading={isLoading}
              leftIcon={<RefreshCcw size={18} />}
              variant="secondary"
            >
              {searchStatus === "failed" && !searchQuery
                ? "Try Again"
                : "Get Fresh Suggestions"}
            </Button>
          </div>
        )}

      <RecipeList recipes={recipes} status={searchStatus} error={error} />
    </div>
  );
}
