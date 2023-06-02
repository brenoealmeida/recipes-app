import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Ingredients({ response }) {
  const { ingredients, setIngredients, localSave,
    setLocalSave, setIsChecked } = useContext(AppContext);
  const [updated, setUpdated] = useState({});

  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.replace(/[^0-9]/g, '');
  const path = pathname.split('/')[1];

  const handleClick = (ischecked, index) => {
    const getLocal = localSave;
    if (path === 'meals') {
      if (ischecked) {
        getLocal.meals[id] = [
          ...getLocal.meals[id], index,
        ];
      } else {
        getLocal.meals[id] = [
          ...getLocal.meals[id].filter((i) => i !== index),
        ];
      }
    } else if (ischecked) {
      getLocal.drinks[id] = [
        ...getLocal.drinks[id], index,
      ];
    } else {
      getLocal.drinks[id] = [
        ...getLocal.drinks[id].filter((i) => i !== index),
      ];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocal));
    setUpdated(getLocal[path][id].length);
  };

  // cuidado com esse useEffect, pois não tem dependências
  useEffect(() => {
    const inputs = document.querySelectorAll('.checkbox-input');
    if (inputs.length > 0) {
      const isItTrue = [];
      for (let index = 0; index < inputs.length; index += 1) {
        isItTrue.push(inputs[index].checked);
      }
      const isAllChecked = isItTrue.every((bool) => bool === true);
      setIsChecked(isAllChecked);
    }
  });

  useEffect(() => {
    let getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocal === null) {
      getLocal = {
        drinks: {},
        meals: {},
      };
    }
    if (!getLocal[path][id]) getLocal[path][id] = [];
    setLocalSave(getLocal);
  }, [updated, setUpdated, id, path, setLocalSave]);

  useEffect(() => {
    function filterIngredients() {
      const chaves = Object.entries(response);
      const ingKeys = chaves.filter((i) => {
        const isIngredient = i[0].includes('Ingredient');
        const haveValue = i[1] !== null && i[1].length > 0;
        return isIngredient && haveValue;
      });
      setIngredients(ingKeys);
    }
    filterIngredients();
  }, [response, setIngredients]);

  return (
    <div>
      {
        ingredients.map((i, index) => (

          <label
            htmlFor={ i[0] }
            key={ i[0] }
            data-testid={ `${index}-ingredient-step` }
            className={ localSave[path][id]
              .some((n) => n === index + 1) ? 'risk' : 'normal' }
          >
            <input
              type="checkbox"
              name={ i[0] }
              className="checkbox-input"
              onChange={ ({ target }) => handleClick(target.checked, index + 1) }
              checked={ localSave[path][id].some((n) => n === index + 1) }
            />
            { i[1] }
          </label>
        ))
      }
    </div>
  );
}

Ingredients.propTypes = ({
  response: PropTypes.shape(),
}).isRequired;

export default Ingredients;
