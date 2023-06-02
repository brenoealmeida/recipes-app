import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestDrinkByID, requestMealsApi } from '../services/requestApi';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DrinkDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const id = pathname.replace(/[^0-9]/g, '');

  const [drinksDetails, setDrinksDetails] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [localFavRecipes, setLocalFavRecipes] = useState({});

  useEffect(() => {
    const NUM6 = 6;

    const productDetails = async () => {
      const response = await requestDrinkByID(id);
      setDrinksDetails(response);
      const response2 = await requestMealsApi();
      setRecomendations(response2.slice(0, NUM6));
    };
    productDetails();
  }, [history, id]);

  const doneRecipes = localStorage.getItem('doneRecipes');
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  const completedRecipes = (JSON.parse(doneRecipes)) || ([]);
  const progressRecipes = (JSON.parse(inProgressRecipes)) || ({ drinks: [], meals: [] });
  const checkWasDone = completedRecipes.some((recipe) => pathname.includes(recipe.id));

  const checkItProgress = (valueRecipes) => {
    if (pathname.includes('meals')) {
      const { meals } = valueRecipes;
      const mealsIds = Object.keys(meals);
      return mealsIds.some((mealId) => pathname.includes(mealId));
    }
    if (pathname.includes('drinks')) {
      const { drinks } = valueRecipes;
      const drinksIds = Object.keys(drinks);
      return drinksIds.some((drinkId) => pathname.includes(drinkId));
    }
  };

  const checkProgress = checkItProgress(progressRecipes);
  const textButton = (checkProgress) ? 'Continue Recipe' : 'Start Recipe';
  const location = history.location.pathname;

  const clickShared = () => {
    const timerToDeletePhrase = 3000;
    copy(`http://localhost:3000${location}`);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), timerToDeletePhrase);
  };

  const favoriteRecipes = () => {
    let getLocal = localFavRecipes;
    getLocal = [
      ...getLocal,
      {
        id: drinksDetails[0].idDrink,
        type: 'drink',
        nationality: '',
        category: drinksDetails[0].strCategory,
        alcoholicOrNot: drinksDetails[0].strAlcoholic,
        name: drinksDetails[0].strDrink,
        image: drinksDetails[0].strDrinkThumb,
      }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(getLocal));
  };

  useEffect(() => {
    let getLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocal === null) {
      getLocal = [];
    }
    setLocalFavRecipes(getLocal);
  }, []);

  return (
    <section>
      {
        drinksDetails?.map(({
          idDrink, strDrink, strDrinkThumb, strInstructions, strAlcoholic,
        }) => {
          const arrIngredients = [];
          const arrMeasures = [];
          let index = 1;
          const MAX_INDEX = 15;

          while (index <= MAX_INDEX) {
            const strIngredients = `strIngredient${index}`;
            const strMeasure = `strMeasure${index}`;
            arrIngredients.push(`${drinksDetails[0][strIngredients]}`);
            arrMeasures.push(`${drinksDetails[0][strMeasure]}`);
            index += 1;
          }

          const ingredients = arrIngredients.filter((element) => element !== null);
          const measure = arrMeasures.filter((element) => element !== null);

          return (
            <section key={ idDrink }>
              <img
                src={ strDrinkThumb }
                alt="recipe thumbnail"
                data-testid="recipe-photo"
              />
              <h3 data-testid="recipe-title">{strDrink}</h3>
              <h5 data-testid="recipe-category">{strAlcoholic}</h5>
              <ol>
                {
                  ingredients.map((ingredient, item) => (
                    <li
                      key={ `${ingredient}${item}` }
                      data-testid={ `${item}-ingredient-name-and-measure` }
                    >
                      {`${ingredient} - ${measure[item]}`}
                    </li>
                  ))
                }
              </ol>
              <span data-testid="instructions">{strInstructions}</span>
            </section>
          );
        })
      }

      <div
        style={ {
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'hidden',
          overflowX: 'scroll' } }
      >
        {recomendations.map((item, index) => (
          <div
            key={ item.idMeal }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              style={ { maxWidth: '300px' } }
            />
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              { item.strMeal }
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0px', right: '0px' } }
        disabled={ checkWasDone }
        onClick={ () => history.push(`/${path}/${id}/in-progress`) }
      >
        {textButton}
      </button>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ clickShared }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      {isLinkCopied && <p>Link copied!</p>}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favoriteRecipes }
      >
        Favorite

      </button>
    </section>
  );
}

export default DrinkDetails;
