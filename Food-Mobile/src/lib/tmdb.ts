export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
}

export async function searchMeals(searchTerm: string) {

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  const data = await response.json();

  return data.meals ?? [];
}