import React from "react";
import RecipeListItem from "./RecipeListItem";
import { Recipe } from "../../../../lib/types";

interface RecipeListProps {
  recipes: Recipe[];
  status?: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  status = "idle",
  error,
}) => {
    if (status === "loading") {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 animate-pulse w-52"
        >
          <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
    }

  if (status === "failed") {
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Error loading recipes: {error || "Unknown error"}
      </p>
    );
  }

  if (status === "succeeded" && recipes.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400">
        No recipes found. Try a different search!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
