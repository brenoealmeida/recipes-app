import { useEffect, useState } from 'react';

function useFetchRecipes(route) {
  const url = route === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const [meals, setMeals] = useState();
  const [drinks, setDrinks] = useState();
  const [recipesError, setError] = useState();

  useEffect(() => {
    const arrayLength = 12;
    fetch(url)
      .then((response) => response.json())
      .then((results) => {
        // refatorar if, não é mais necessário pegar as keys com o route como parâmetro
        if (Object.keys(results)[0] === 'drinks') {
          setDrinks(results.drinks.slice(0, arrayLength));
        } else {
          setMeals(results.meals.slice(0, arrayLength));
        }
      })
      .catch(setError);
  }, [url]);

  return ({ meals, drinks, recipesError });
}

export default useFetchRecipes;
