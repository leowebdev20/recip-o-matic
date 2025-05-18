// components/favorites/FavoriteButton.tsx
"use client";

import React from "react";
import Button from "../ui/Button";
import { Star } from "lucide-react"; // Using Star for consistency with header
import { useFavorites } from "../../../../lib/contexts/FavoritesContext";
import { Recipe } from "../../../../lib/types";

interface FavoriteButtonProps {
  recipe: Pick<Recipe, "idMeal" | "strMeal" | "strMealThumb">; // Only need basic info
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  recipe,
  className,
}) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(recipe.idMeal);

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent link navigation if button is inside a Link
    event.stopPropagation(); // Prevent event bubbling
    if (isCurrentlyFavorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <Button
      onClick={handleToggleFavorite}
      variant="secondary"
      size="sm"
      aria-label={
        isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"
      }
      className={`!p-2 ${className}`} // !p-2 to override default padding from Button for icon-only like feel
      title={isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        size={18}
        fill={isCurrentlyFavorite ? "currentColor" : "none"}
        className={isCurrentlyFavorite ? "text-yellow-400" : "text-gray-500"}
      />
    </Button>
  );
};

export default FavoriteButton;
