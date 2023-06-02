import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../helpers/renderWith';
import meals from './Mock/meals';

function mealsFetch() {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(meals),
  });
}

function getRecipesPage() {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const enterBtn = screen.getByRole('button', { name: /enter/i });
  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(enterBtn);
}

describe('Bloco de testes da página de receitas', () => {
  it('Testa renderização de componentes', async () => {
    const { history } = renderWithRouter(<App />);
    mealsFetch();
    getRecipesPage();
    expect(history.location.pathname).toBe('/meals');

    const corba = await screen.findByTestId('0-card-img');
    expect(corba).toBeInTheDocument();
    const corbaText = await screen.findByRole('heading', { name: 'Corba', level: 3 });
    expect(corbaText).toBeInTheDocument();

    const burekText = await screen.findByTestId('1-card-name');
    expect(burekText).toBeInTheDocument();

    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');
    // const beefBtn = await screen.findAllByRole('button');

    // console.log(beefBtn[0]);

    // const mustardPie = await screen.findByRole('heading', { name: 'Corba', level: 3 });
    // expect(mustardPie).toBeInTheDocument();
  });
});
