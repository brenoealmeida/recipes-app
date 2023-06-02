import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWith';
import DrinkMock from './Mock/DrinkMock';
import MealMock from './Mock/MealMock';

// Mock do LocalStorage retirado de https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/
const localStorageMock = (function bliu() {
  let store = {};

  return {
    getItem(key) {
      if (store[key]) return store[key];
      return null;
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
}());

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// const setLocalStorage = (id, data) => {
//   window.localStorage.setItem(id, JSON.stringify(data));
// };

function drinksFetch() {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(DrinkMock),
  });
}

function mealsFetch() {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(MealMock),
  });
}

describe('Bloco de testes da página de receitas em progresso - drinks', () => {
  it('Testa se os itens estão na tela', async () => {
    renderWithRouter(<App />);
    drinksFetch();

    const startRecipe = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipe);
    expect(global.fetch).toHaveBeenCalled();

    const category = await screen.findByText('Cocktail');
    expect(category).toBeInTheDocument();

    const title = await screen.findByText('Martinez 2');
    expect(title).toBeInTheDocument();

    const checkbox1 = (await screen.findByText(/Gin/i)).querySelector('input');
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1).not.toBeChecked();
    const checkbox2 = (await screen.findByText(/Sweet Vermouth/i)).querySelector('input');
    expect(checkbox2).toBeInTheDocument();
    const checkbox3 = (await screen.findByText(/Maraschino Liqueur/i)).querySelector('input');
    expect(checkbox3).toBeInTheDocument();
    const checkbox4 = (await screen.findByText(/Angostura Bitters/i)).querySelector('input');
    expect(checkbox4).toBeInTheDocument();

    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();

    userEvent.click(checkbox1);
    expect(checkbox1).toBeChecked();
    userEvent.click(checkbox2);
    userEvent.click(checkbox3);
    userEvent.click(checkbox4);
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);
  });
});

describe('Bloco de testes da página de receitas em progresso - meals', () => {
  it('Testa a presença e funcionalidade dos itens', async () => {
    renderWithRouter(<App />);
    mealsFetch();

    const startRecipe = screen.getByTestId('start-meal-btn');
    userEvent.click(startRecipe);
    expect(global.fetch).toHaveBeenCalled();

    const category = await screen.findByText('Pasta');
    expect(category).toBeInTheDocument();

    const title = await screen.findByText('Fettuccine Alfredo');
    expect(title).toBeInTheDocument();

    const checkbox1 = (await screen.findByTestId('0-ingredient-step')).querySelector('input');
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1).not.toBeChecked();
    const checkbox2 = (await screen.findByTestId('1-ingredient-step')).querySelector('input');
    expect(checkbox2).toBeInTheDocument();
    const checkbox3 = (await screen.findByTestId('2-ingredient-step')).querySelector('input');
    expect(checkbox3).toBeInTheDocument();
    const checkbox4 = (await screen.findByTestId('3-ingredient-step')).querySelector('input');
    expect(checkbox4).toBeInTheDocument();
    const checkbox5 = (await screen.findByTestId('4-ingredient-step')).querySelector('input');
    expect(checkbox5).toBeInTheDocument();
    const checkbox6 = (await screen.findByTestId('5-ingredient-step')).querySelector('input');
    expect(checkbox6).toBeInTheDocument();

    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();

    userEvent.click(checkbox1);
    expect(checkbox1).toBeChecked();
    userEvent.click(checkbox2);
    userEvent.click(checkbox3);
    userEvent.click(checkbox4);
    userEvent.click(checkbox5);
    userEvent.click(checkbox6);
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);
  });
});
