import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipeDetails } from "../../../../lib/api";
import RecipeDetailDisplay from "@/app/components/recipes/RecipeDetail";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = await getRecipeDetails(params.id);
  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }
  return {
    title: `${recipe.strMeal} | Recip-O-Matic`,
    description: `View the recipe for ${
      recipe.strMeal
    }. Ingredients: ${recipe.ingredients
      .slice(0, 3)
      .map((i) => i.name)
      .join(", ")}...`,
    openGraph: {
      title: recipe.strMeal,
      description: `Detailed recipe for ${recipe.strMeal}.`,
      images: [
        {
          url: recipe.strMealThumb,
          width: 500,
          height: 500,
          alt: recipe.strMeal,
        },
      ],
    },
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { id } = params;
  let recipe = null;
  let error = null;

  try {
    recipe = await getRecipeDetails(id);
  } catch (e) {
    console.error("Failed to fetch recipe for detail page:", e);
    error = e instanceof Error ? e.message : "An unknown error occurred";
  }

  if (error) {
    // You could render a more specific error component here
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-10">
        Failed to load recipe: {error}
      </div>
    );
  }

  if (!recipe) {
    notFound();
  }

  return <RecipeDetailDisplay recipe={recipe} />;
}
