import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestMealByID, requestDrinkByID } from '../services/requestApi';
import Details from '../components/Details';
import Ingredients from '../components/Ingredients';
import AppContext from '../context/AppContext';
import '../style/RecipeInProgress.css';

function RecipeInProgress() {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.replace(/[^0-9]/g, '');

  const [localDoneRecipes, setLocalDoneRecipes] = useState({});

  const { mealInProgress, setMealInProgress,
    drinkInProgress, setDrinkInProgress, isChecked } = useContext(AppContext);

  const finishRecipeBtn = () => {
    let getLocal = localDoneRecipes;
    history.push('/done-recipes');
    if (pathname.match('/meals/')) {
      getLocal = [
        ...getLocal,
        {
          id: mealInProgress.idMeal,
          type: 'meal',
          nationality: mealInProgress.strArea,
          category: mealInProgress.strCategory,
          alcoholicOrNot: '',
          name: mealInProgress.strMeal,
          image: mealInProgress.strMealThumb,
          doneDate: new Date(),
          tags: mealInProgress.strTags ? mealInProgress.strTags.split(',') : '',
        }];
    } else {
      getLocal = [
        ...getLocal,
        {
          id: drinkInProgress.idDrink,
          type: 'drink',
          nationality: '',
          category: drinkInProgress.strCategory,
          alcoholicOrNot: drinkInProgress.strAlcoholic,
          name: drinkInProgress.strDrink,
          image: drinkInProgress.strDrinkThumb,
          doneDate: new Date(),
          tags: [],
        }];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(getLocal));
  };

  useEffect(() => {
    let getLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocal === null) {
      getLocal = [];
    }
    setLocalDoneRecipes(getLocal);
  }, []);

  // Lógica do UseEffect implementada por Ranilson
  useEffect(() => {
    const productDetails = async () => {
      if (pathname.match('/meals/')) {
        const response = await requestMealByID(id);
        setMealInProgress(response[0]);
      } else {
        const response = await requestDrinkByID(id);
        setDrinkInProgress(response[0]);
      }
    };
    productDetails();
  }, [history, pathname, setMealInProgress, setDrinkInProgress, id]);

  return (
    <div>
      { pathname.match('/meals/') ? (
        <div>
          <Details
            strCategory={ mealInProgress.strCategory }
            strMeal={ mealInProgress.strMeal }
            strMealThumb={ mealInProgress.strMealThumb }
            strInstructions={ mealInProgress.strInstructions }
          />
          <Ingredients response={ mealInProgress } />
        </div>
      ) : (
        <div>
          <Details
            strCategory={ drinkInProgress.strCategory }
            strMeal={ drinkInProgress.strDrink }
            strMealThumb={ drinkInProgress.strDrinkThumb }
            strInstructions={ drinkInProgress.strInstructions }
          />
          <Ingredients response={ drinkInProgress } />
        </div>
      )}
      <button type="button" data-testid="share-btn">Share</button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite

      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ finishRecipeBtn }
        disabled={ !isChecked }
      >
        Finish recipe

      </button>
    </div>
  );
}

export default RecipeInProgress;
