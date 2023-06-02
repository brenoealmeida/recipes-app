import React, { useEffect, useState } from 'react';
import teste from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import { requestMealByID } from '../services/requestApi';

export default function IdMeals(props) {
  const [data, setData] = useState([]);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const fazOFetch = async () => {
      const dadoFetchado = await requestMealByID(id);
      setData(dadoFetchado);
    };
    fazOFetch();
  }, [id]);

  return (
    <div>
      { data.length > 0 && <RecipeDetails recipe={ data[0] } ehMeal="true" /> }
    </div>
  );
}

IdMeals.propTypes = {
  match: teste.shape({}),
  params: teste.shape({}),
  id: teste.number,
}.isRequired;
