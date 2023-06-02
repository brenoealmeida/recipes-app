import React from 'react';
import PropTypes from 'prop-types';

function Details(props) {
  const { strCategory, strMeal, strMealThumb, strInstructions } = props;
  return (
    <div>
      <p data-testid="recipe-category">{ strCategory }</p>
      <p data-testid="recipe-title">{ strMeal }</p>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />
      <p data-testid="instructions">{ strInstructions }</p>
    </div>
  );
}

Details.propTypes = ({
  strCategory: PropTypes.string,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  strInstructions: PropTypes.string,
}).isRequired;

export default Details;
