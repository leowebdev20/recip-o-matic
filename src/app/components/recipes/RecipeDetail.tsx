import React from "react";
import Image from "next/image";
import { RecipeDetail as RecipeDetailType } from "../../../../lib/types";
import FavoriteButton from "../favorites/FavoriteButton";
import { Youtube, Tag, MapPin, Utensils } from "lucide-react";

interface RecipeDetailProps {
  recipe: RecipeDetailType;
}

const RecipeDetailDisplay: React.FC<RecipeDetailProps> = ({ recipe }) => {
  if (!recipe) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400">
        Recipe not found.
      </p>
    );
  }

  const recipeForFavoriteButton = {
    idMeal: recipe.idMeal,
    strMeal: recipe.strMeal,
    strMealThumb: recipe.strMealThumb,
  };

  return (
    <article className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
      <div className="relative w-full h-64 md:h-96">
        <Image
          src={recipe.strMealThumb || "/placeholder.jpg"}
          alt={recipe.strMeal}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute top-4 right-4">
          <FavoriteButton
            recipe={recipeForFavoriteButton}
            className="bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
          />
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {recipe.strMeal}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6 text-sm">
          {recipe.strCategory && (
            <span className="flex items-center bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 px-3 py-1 rounded-full">
              <Utensils size={16} className="mr-1.5" /> {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="flex items-center bg-sky-100 dark:bg-sky-800 text-sky-700 dark:text-sky-200 px-3 py-1 rounded-full">
              <MapPin size={16} className="mr-1.5" /> {recipe.strArea}
            </span>
          )}
          {recipe.strTags &&
            recipe.strTags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-3 py-1 rounded-full"
                >
                  <Tag size={16} className="mr-1.5" /> {tag}
                </span>
              ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b-2 border-teal-500 pb-1">
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>
                  <span className="font-medium">{ing.measure}</span> {ing.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b-2 border-teal-500 pb-1">
              Instructions
            </h2>
            <div
              className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: recipe.strInstructions.replace(/\r\n/g, "<br />"),
              }}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors"
            >
              <Youtube size={20} className="mr-2" /> Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default RecipeDetailDisplay;
