// lib/contexts/FavoritesContext.tsx
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Recipe } from "../types"; // Using Recipe for basic info storage

type FavoriteRecipeInfo = Pick<Recipe, "idMeal" | "strMeal" | "strMealThumb">;

interface FavoritesContextType {
  favoriteRecipes: FavoriteRecipeInfo[];
  addFavorite: (recipe: FavoriteRecipeInfo) => void;
  removeFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  getFavoriteDetails: (recipeId: string) => FavoriteRecipeInfo | undefined;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage<
    FavoriteRecipeInfo[]
  >("favoriteRecipes", []);

  const addFavorite = (recipe: FavoriteRecipeInfo) => {
    setFavoriteRecipes((prevFavorites) => {
      if (!prevFavorites.find((fav) => fav.idMeal === recipe.idMeal)) {
        return [...prevFavorites, recipe];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (recipeId: string) => {
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe.idMeal !== recipeId)
    );
  };

  const isFavorite = (recipeId: string): boolean => {
    return favoriteRecipes.some((recipe) => recipe.idMeal === recipeId);
  };

  const getFavoriteDetails = (
    recipeId: string
  ): FavoriteRecipeInfo | undefined => {
    return favoriteRecipes.find((recipe) => recipe.idMeal === recipeId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteRecipes,
        addFavorite,
        removeFavorite,
        isFavorite,
        getFavoriteDetails,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
