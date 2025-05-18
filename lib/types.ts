export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions?: string;  
  strCategory?: string;
  strArea?: string;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface RecipeDetail extends Recipe {
  strInstructions: string;
  strCategory: string;
  strArea: string;
  strTags: string | null;
  strYoutube: string | null;
  ingredients: Ingredient[];
}

// For API responses directly from TheMealDB
export interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}
