"use client";

import React from "react";
import Link from "next/link";
import { ChefHat } from "lucide-react";
import { useFavorites } from "../../../lib/contexts/FavoritesContext";
import RecipeList from "../components/recipes/RecipeList";
import { Recipe } from "../../../lib/types";

export default function FavoritesPage() {
  const { favoriteRecipes } = useFavorites();

  // The RecipeList component expects `Recipe[]`.
  // Our `favoriteRecipes` from context stores `FavoriteRecipeInfo[]`.
  // For this list, `FavoriteRecipeInfo` has the necessary fields (idMeal, strMeal, strMealThumb).
  // If RecipeList needed more fields not in FavoriteRecipeInfo, we'd need to fetch full details
  // or store more info in localStorage. For now, this direct usage is okay.
  const recipesToDisplay: Recipe[] = favoriteRecipes.map((fav) => ({
    idMeal: fav.idMeal,
    strMeal: fav.strMeal,
    strMealThumb: fav.strMealThumb,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Your Favorite Recipes
      </h1>
      {favoriteRecipes.length > 0 ? (
        <RecipeList recipes={recipesToDisplay} status="succeeded" />
      ) : (
        <div className="text-center py-10">
          <ChefHat
            size={64}
            className="mx-auto text-gray-400 dark:text-gray-500 mb-4"
          />
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            You hav not saved any favorite recipes yet.
          </p>
          <p className="text-gray-500 dark:text-gray-300">
            Start exploring and add some recipes to your collection!
          </p>
          <Link
            href="/"
            className="mt-6 inline-block px-6 py-3 text-base font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800"
          >
            Find Recipes
          </Link>
        </div>
      )}
    </div>
  );
}
