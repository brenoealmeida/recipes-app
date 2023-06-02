export const requestMealByID = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  const json = await response.json();
  return json.meals;
};

export const requestDrinkByID = async (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  const json = await response.json();
  return json.drinks;
};

export const requestMealsApi = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint);
  const json = await response.json();
  return json.meals;
};

export const requestDrinksApi = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint);
  const json = await response.json();
  return json.drinks;
};
