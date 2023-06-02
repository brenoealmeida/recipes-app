import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinksDetails from './DrinksDetails';
import MealsDetails from './MealsDetails';

function RecipeDetails() {
  const location = useLocation();
  if (location.pathname.match('/meals/')) {
    return <MealsDetails />;
  }
  return <DrinksDetails />;
}

export default RecipeDetails;
