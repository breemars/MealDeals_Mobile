export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strCountry: string;
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




export async function getMealByID(id: string) {

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch meal details");
  }

  const data = await response.json();

  return data.meals[0] ?? [];
}


export async function getMealsByCategory(category: string) {

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch meals by category");
  }

  const data = await response.json();

  return data.meals ?? [];
}


export async function getMealsByLetter(letter: string) {

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${encodeURIComponent(letter)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch meals by category");
  }

  const data = await response.json();

  return data.meals ?? [];
}