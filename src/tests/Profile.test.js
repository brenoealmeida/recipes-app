import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWith';

const userEmail = 'teste@teste.com';

function getProfile(history) {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const enterBtn = screen.getByRole('button', { name: /enter/i });
  userEvent.type(emailInput, userEmail);
  userEvent.type(passwordInput, '1234567');
  userEvent.click(enterBtn);

  const profileBtn = screen.getByTestId('profile-top-btn');
  expect(profileBtn).toBeInTheDocument();
  userEvent.click(profileBtn);
  expect(history.location.pathname).toBe('/profile');
}

describe('Bloco de testes da tela de Login', () => {
  it('Testa presença do email e botão de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    getProfile(history);

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent(userEmail);

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    expect(doneRecipesBtn).toBeInTheDocument();
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa botão de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    getProfile(history);

    const favoritesRecipesBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoritesRecipesBtn).toBeInTheDocument();
    userEvent.click(favoritesRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testa botão de logout', () => {
    const { history } = renderWithRouter(<App />);
    getProfile(history);

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa botão de logout', () => {
    const { history } = renderWithRouter(<App />);
    getProfile(history);

    expect(history.location.pathname).toBe('/profile');
    localStorage.clear();

    const doneRecipes = screen.getByTestId('profile-done-btn');
    expect(doneRecipes).toBeInTheDocument();
    userEvent.click(doneRecipes);
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('');
  });
});
