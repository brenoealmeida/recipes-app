import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState();
  const [copied, setCopied] = useState(false);
  const [renderRecipes, setRenderRecipes] = useState();

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  useEffect(() => {
    setRenderRecipes(doneRecipes);
  }, [doneRecipes]);

  async function handleShare(id, type) {
    const TIMEOUT = 5000;
    try {
      await copy(`http://localhost:3000/${type}s/${id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), TIMEOUT);
    } catch (e) {
      console.log(e);
    }
  }

  function handleFilter({ target: { name } }) {
    if (name === 'all') {
      setRenderRecipes(doneRecipes);
    } else {
      setRenderRecipes(doneRecipes.filter((e) => e.type === name));
    }
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
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}
                </p>
                {
                  recipe.tags.length > 0 ? (
                    recipe.tags.map((tag, i) => (i > 1 ? null
                      : (
                        <p
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                          key={ i }
                        >
                          {tag}
                        </p>)))) : ''
                }
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

              </div>
            )))}
        </section>
      </main>
    </div>
  );
}
