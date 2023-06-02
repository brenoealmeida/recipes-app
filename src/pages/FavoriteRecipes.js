import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState();
  const [renderRecipes, setRenderRecipes] = useState();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  useEffect(() => {
    setRenderRecipes(favoriteRecipes);
  }, [favoriteRecipes]);

  function handleShare(id, type) {
    const TIMEOUT = 5000;
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), TIMEOUT);
  }

  function handleFilter({ target: { name } }) {
    if (name === 'all') {
      setRenderRecipes(favoriteRecipes);
    } else {
      setRenderRecipes(favoriteRecipes.filter((e) => e.type === name));
    }
  }

  function removeFavorite(id) {
    const newArr = favoriteRecipes.filter((e) => e.id !== id);
    setRenderRecipes(newArr);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <main>
        <section>
          <button
            type="button"
            name="all"
            data-testid="filter-by-all-btn"
            onClick={ handleFilter }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            name="meal"
            onClick={ handleFilter }
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            name="drink"
            onClick={ handleFilter }
          >
            Drinks
          </button>
        </section>
        <section>
          { !renderRecipes ? null : (
            renderRecipes.map((recipe, index) => (
              <div key={ index }>
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                    height="200px"
                  />
                  <h2
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h2>
                </Link>
                <h4
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {
                    recipe.nationality ? (
                      `${recipe.nationality} - ${recipe.category}`
                    ) : `${recipe.category} - ${recipe.alcoholicOrNot}`
                  }
                </h4>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleShare(recipe.id, recipe.type) }
                  src="../images/shareIcon.svg"
                >
                  Share
                </button>
                {
                  copied ? (<p>Link copied!</p>) : null
                }
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => removeFavorite(recipe.id) }
                  src="../images/blackHeartIcon.svg"
                >
                  Desfavoritar
                </button>

              </div>
            )))}
        </section>
      </main>
    </div>
  );
}

export default FavoriteRecipes;
