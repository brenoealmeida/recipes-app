import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestMealByID, requestDrinksApi } from '../services/requestApi';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function MealsDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.split('/')[1];
  const id = pathname.replace(/[^0-9]/g, '');
  const [mealsDetails, setMealsDetails] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    const NUM6 = 6;

    const productDetails = async () => {
      const response = await requestMealByID(id);
      setMealsDetails(response);
      const response2 = await requestDrinksApi();
      setRecomendations(response2.slice(0, NUM6));
    };
    productDetails();
  }, [history, id]);

  const doneRecipes = localStorage.getItem('doneRecipes');
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  const completedRecipes = (JSON.parse(doneRecipes)) || ([]);
  const progressRecipes = (JSON.parse(inProgressRecipes)) || ({ drinks: [], meals: [] });
  const checkWasDone = completedRecipes.some((recipe) => pathname.includes(recipe.id));
  const [localFavRecipes, setLocalFavRecipes] = useState({});

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
        id: mealsDetails[0].idMeal,
        type: 'meal',
        nationality: mealsDetails[0].strArea,
        category: mealsDetails[0].strCategory,
        alcoholicOrNot: '',
        name: mealsDetails[0].strMeal,
        image: mealsDetails[0].strMealThumb,
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
        mealsDetails.map(({
          idMeal, strMealThumb, strMeal, strCategory, strInstructions,
          strYoutube,
        }) => {
          const linkVideo = strYoutube.replace('watch?v=', 'embed/');
          const arrIngredients = [];
          const arrMeasures = [];
          let index = 1;
          const MAX_INDEX = 20;

          while (index <= MAX_INDEX) {
            const strIngredients = `strIngredient${index}`;
            const strMeasure = `strMeasure${index}`;
            arrIngredients.push(`${mealsDetails[0][strIngredients]}`);
            arrMeasures.push(`${mealsDetails[0][strMeasure]}`);
            index += 1;
          }

          const ingredients = arrIngredients.filter((element) => element !== '');
          const measure = arrMeasures.filter((element) => element !== '');

          return (
            <section key={ idMeal }>
              <img
                src={ strMealThumb }
                alt="recipe thumbnail"
                data-testid="recipe-photo"
              />
              <h3 data-testid="recipe-title">{strMeal}</h3>
              <h5 data-testid="recipe-category">{strCategory}</h5>
              <ol>
                {
                  ingredients.map((ingredient, i) => (
                    <li
                      key={ `${ingredient}${i}` }
                      data-testid={ `${i}-ingredient-name-and-measure` }
                    >
                      {`${ingredient} - ${measure[i]}`}
                    </li>
                  ))
                }
              </ol>
              <span data-testid="instructions">{strInstructions}</span>
              <iframe
                data-testid="video"
                title={ strMeal }
                width="420"
                height="315"
                src={ linkVideo }
              />
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
            key={ item.idDrink }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              style={ { maxWidth: '300px' } }
            />
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              { item.strDrink }
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

export default MealsDetails;
