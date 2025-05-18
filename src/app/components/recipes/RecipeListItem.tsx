import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "../ui/Card";
import FavoriteButton from "../favorites/FavoriteButton";
import { Utensils } from "lucide-react";
import { Recipe } from "../../../../lib/types";

interface RecipeListItemProps {
  recipe: Recipe;
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe }) => {
  const shortDescription = recipe.strInstructions
    ? recipe.strInstructions.substring(0, 70) + "..."
    : "Delicious recipe awaiting you!";

  return (
    <Card className="h-full flex flex-col group">
      <Link
        href={`/recipes/${recipe.idMeal}`}
        className="block focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-t-xl"
      >
        <div className="relative w-full h-48">
          <Image
            src={recipe.strMealThumb || "/placeholder.jpg"}  
            alt={recipe.strMeal}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
            priority={false}  
          />
        </div>
      </Link>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Link
            href={`/recipes/${recipe.idMeal}`}
            className="focus:outline-none"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              {recipe.strMeal}
            </h3>
          </Link>
          <FavoriteButton recipe={recipe} />
        </div>
        {recipe.strCategory && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
            {recipe.strCategory}
          </p>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex-grow">
          {shortDescription}
        </p>
        <Link
          href={`/recipes/${recipe.idMeal}`}
          className="mt-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800 transition-colors"
        >
          View Recipe <Utensils size={16} className="ml-2" />
        </Link>
      </div>
    </Card>
  );
};

export default RecipeListItem;
