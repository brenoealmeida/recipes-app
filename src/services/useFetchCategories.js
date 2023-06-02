import { useEffect, useState } from 'react';

function useFetchCategories(route) {
  const url = route === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const [categories, setCategories] = useState();
  const [categoriesError, setError] = useState();

  useEffect(() => {
    const arrayLength = 5;
    fetch(url)
      .then((response) => response.json())
      .then((results) => {
        setCategories(results[route].slice(0, arrayLength));
      })
      .catch(setError);
  }, []);

  return ({ categories, categoriesError });
}

export default useFetchCategories;
