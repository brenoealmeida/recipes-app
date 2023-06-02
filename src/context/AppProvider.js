import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppContext';

function AppProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [toggleSearchInput, setToggleSearchInput] = useState(false);
  const [mealInProgress, setMealInProgress] = useState([]);
  const [drinkInProgress, setDrinkInProgress] = useState([]);
  const [selectedRadioFilter, setSelectedRadioFilter] = useState('');
  const [searchBarClassName, setSearchBarClassName] = useState('search-input-bar');
  const [ingredients, setIngredients] = useState([]);
  const [localSave, setLocalSave] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    // estado do campo de pesquisa (bool)
    toggleSearchInput,
    setToggleSearchInput,

    // contém uma única receita que está em progresso
    mealInProgress,
    drinkInProgress,
    setMealInProgress,
    setDrinkInProgress,

    // array de arrays com todos os ingredientes da receita em
    ingredients,
    setIngredients,

    // diz se um input de ingrediente está marcado como check ou não
    isChecked,
    setIsChecked,

    // contém os dados dos ingredientes salvos no localStorage na chave inProgressRecipes
    localSave,
    setLocalSave,

    // estado tipo de pesquisa (Ingredient, Name, First letter) selecionado
    selectedRadioFilter,
    setSelectedRadioFilter,
    // estado da animação do search bar
    searchBarClassName,
    setSearchBarClassName,
  }), [
    user,
    setUser,
    toggleSearchInput,
    setToggleSearchInput,
    mealInProgress,
    drinkInProgress,
    setMealInProgress,
    setDrinkInProgress,
    selectedRadioFilter,
    setSelectedRadioFilter,
    searchBarClassName,
    setSearchBarClassName,
    ingredients,
    setIngredients,
    localSave,
    setLocalSave,
    isChecked,
    setIsChecked,
  ]);

  return (
    <appContext.Provider value={ contextValue }>
      {children}
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
