import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

// Provider
import AppProvider from './context/AppProvider';

// Components
import Login from './pages/Login';

import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import IdDrinks from './pages/IdDrinks';
import IdMeals from './pages/IdMeals';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals/:id" component={ IdMeals } />
        <Route exact path="/drinks/:id" component={ IdDrinks } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      </Switch>
    </AppProvider>
  );
}

export default App;
