import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../helpers/renderWith';
import DrinkMock from './Mock/DrinkMock';
// import MealMock from './Mock/MealMock';

function drinksFetch() {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(DrinkMock),
  });
}

// function mealsFetch() {
//   jest.spyOn(global, 'fetch').mockResolvedValue({
//     json: jest.fn().mockResolvedValue(MealMock),
//   });
// }

async function getDoneRecipesDrink(history) {
  const startRecipe = screen.getByTestId('start-recipe-btn');
  act(() => {
    userEvent.click(startRecipe);
  });
  expect(global.fetch).toHaveBeenCalled();
  expect(history.location.pathname).toBe('/drinks/17256/in-progress');
  const checkbox1 = (await screen.findByText(/Gin/i)).querySelector('input');
  expect(checkbox1).toBeInTheDocument();
  const checkbox2 = (await screen.findByText(/Sweet Vermouth/i)).querySelector('input');
  expect(checkbox2).toBeInTheDocument();
  const checkbox3 = (await screen.findByText(/Maraschino Liqueur/i)).querySelector('input');
  expect(checkbox3).toBeInTheDocument();
  const checkbox4 = (await screen.findByText(/Angostura Bitters/i)).querySelector('input');
  expect(checkbox4).toBeInTheDocument();
  const finishBtn = screen.getByTestId('finish-recipe-btn');

  userEvent.click(checkbox1);
  userEvent.click(checkbox2);
  userEvent.click(checkbox3);
  userEvent.click(checkbox4);
  expect(finishBtn).toBeEnabled();
  userEvent.click(finishBtn);
  expect(history.location.pathname).toBe('/done-recipes');
}

describe('Bloco de testes da página de receitas prontas, usando um drink', () => {
  it('Testes do botão de copiar URL', async () => {
    const { history } = renderWithRouter(<App />);
    drinksFetch();
    getDoneRecipesDrink(history);

    const tags = await screen.findByText(/Cocktail - Alcoholic/i);
    expect(tags).toBeInTheDocument();
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();

    userEvent.click(shareBtn);
  });
});
