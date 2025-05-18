import { Recipe, RecipeDetail, MealDBRecipe } from "./types";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function formatRecipeDetails(meal: MealDBRecipe): RecipeDetail {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof MealDBRecipe;
    const measureKey = `strMeasure${i}` as keyof MealDBRecipe;
    if (meal[ingredientKey]) {
      ingredients.push({
        name: meal[ingredientKey] as string,
        measure: meal[measureKey] as string,
      });
    } else {
      break;
    }
  }

  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strInstructions: meal.strInstructions,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
    strTags: meal.strTags,
    strYoutube: meal.strYoutube,
    ingredients,
  };
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.meals) {
      return data.meals.map((meal: MealDBRecipe) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
      }));
    }
    return [];
  } catch (error) {
    console.error("Failed to search recipes:", error);
    throw error;
  }
}

export async function getRecipeDetails(
  id: string
): Promise<RecipeDetail | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return formatRecipeDetails(data.meals[0]);
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch recipe details for ID ${id}:`, error);
    throw error;
  }
}

export async function getRandomRecipe(): Promise<RecipeDetail | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/random.php`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return formatRecipeDetails(data.meals[0]);
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch random recipe:", error);
    throw error;
  }
}
