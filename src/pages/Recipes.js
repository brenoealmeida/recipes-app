import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import useFetchCategories from '../services/useFetchCategories';
import useFetchRecipes from '../services/useFetchRecipes';

function Recipes() {
  const { pathname } = useLocation();
  const route = pathname.slice(1);

  const { meals, drinks, recipesError } = useFetchRecipes(route);
  const thumbKey = meals ? 'strMealThumb' : 'strDrinkThumb';
  const nameKey = meals ? 'strMeal' : 'strDrink';
  const idKey = meals ? 'idMeal' : 'idDrink';
  if (recipesError) console.error(recipesError.message);

  const { categories, categoriesError } = useFetchCategories(route);
  if (categoriesError) console.error(categoriesError.message);

  const [data, setData] = useState();

  useEffect(() => {
    setData(meals || drinks);
  }, [meals, drinks]);

  const [toggle, setToggle] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  function filter({ target }) {
    if (toggle[target.value]) {
      setData(meals || drinks);
      setToggle({
        ...toggle,
        [target.value]: !toggle[target.value],
      });
    } else {
      const arrayLength = 12;
      const url = route === 'meals'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.name}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.name}`;
      fetch(url)
        .then((response) => response.json())
        .then((results) => {
          setData(results[route].slice(0, arrayLength));
          setToggle({
            ...toggle,
            [target.value]: !toggle[target.value],
          });
        })
        .catch((error) => console.error(error.message));
    }
  }

  function handleAll() {
    setData(meals || drinks);
  }

  return (
    <>
      <Header />
      <h1>Receitas</h1>
      <div>
        {
          categories
            ? categories.map((category, index) => (
              <button
                data-testid={ `${category.strCategory}-category-filter` }
                type="button"
                key={ index }
                value={ index }
                onClick={ filter }
                name={ category.strCategory }
              >
                {category.strCategory}
              </button>
            ))
            : ''
        }
        <button
          data-testid="All-category-filter"
          name="All"
          type="button"
          onClick={ handleAll }
        >
          All
        </button>
      </div>

      {
        data ? data.map((element, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <Link
              to={ `/${route}/${element[idKey]}` }
            >
              <img
                src={ element[thumbKey] }
                data-testid={ `${index}-card-img` }
                alt={ element[nameKey] }
                height="200px"
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                { element[nameKey] }
              </h3>
            </Link>
          </div>
        )) : <p>Loading...</p>
      }
    </>
  );
}

export default Recipes;
