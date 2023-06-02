import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../helpers/renderWith';

const testEmail = 'teste@teste.com';
const testPswd = '1234567';
const emailTestId = 'email-input';
const pswdTestId = 'password-input';
const searchInptTestId = 'search-input';
const titleTestId = 'page-title';
const headerTestId = 'header-styled';
const profileBtnTestId = 'profile-top-btn';
const searchBtnTestId = 'search-top-btn';
const btnRole = 'button';

describe('Testes do componente Header: ', () => {
  it('Verifica se o componente não é renderizado na tela de login.', () => {
    renderWithRouter(<App />);
    expect(screen.queryByTestId(headerTestId)).not.toBeInTheDocument();
  });

  it('Verifica se na página /meals o componente é renderizado conforme suas regras.', () => {
    renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(emailTestId), testEmail);
    userEvent.type(screen.getByTestId(pswdTestId), testPswd);
    userEvent.click(screen.getByRole(btnRole, { name: /enter/i }));
    expect(screen.getByTestId(titleTestId)).toContainHTML('Meals');
    expect(screen.getByTestId(profileBtnTestId)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtnTestId)).toBeInTheDocument();
  });

  it('Verifica se na página /drinks o componente é renderizado conforme suas regras.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(emailTestId), testEmail);
    userEvent.type(screen.getByTestId(pswdTestId), testPswd);
    userEvent.click(screen.getByRole(btnRole, { name: /enter/i }));
    act(() => {
      history.push('/drinks');
    });
    expect(screen.getByTestId(titleTestId)).toContainHTML('Drinks');
    expect(screen.getByTestId(profileBtnTestId)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtnTestId)).toBeInTheDocument();
  });

  it('Verifica se na página /profile o componente é renderizado conforme suas regras.', () => {
    renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(emailTestId), testEmail);
    userEvent.type(screen.getByTestId(pswdTestId), testPswd);
    userEvent.click(screen.getByRole(btnRole, { name: /enter/i }));
    userEvent.click(screen.getByTestId(profileBtnTestId), { name: /profile/i });
    expect(screen.getByTestId(titleTestId)).toContainHTML('Profile');
    expect(screen.getByTestId(profileBtnTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(searchBtnTestId)).not.toBeInTheDocument();
  });

  it('Verifica se na página /done-recipes o componente é renderizado conforme suas regras.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(emailTestId), testEmail);
    userEvent.type(screen.getByTestId(pswdTestId), testPswd);
    userEvent.click(screen.getByRole(btnRole, { name: /enter/i }));
    act(() => {
      history.push('/done-recipes');
    });
    expect(screen.getByTestId(titleTestId)).toContainHTML('Done Recipes');
    expect(screen.getByTestId(profileBtnTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(searchBtnTestId)).not.toBeInTheDocument();
  });

  it('Verifica se na página /favorite-recipes o componente é renderizado conforme suas regras.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(emailTestId), testEmail);
    userEvent.type(screen.getByTestId(pswdTestId), testPswd);
    userEvent.click(screen.getByRole(btnRole, { name: /enter/i }));
    act(() => {
      history.push('/favorite-recipes');
    });
    expect(screen.getByTestId(titleTestId)).toContainHTML('Favorite Recipes');
    expect(screen.getByTestId(profileBtnTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(searchBtnTestId)).not.toBeInTheDocument();
  });

  it('Verifica se no endereço /drinks/:drink_id o componente é renderizado conforme suas regras.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(emailTestId), testEmail);
    userEvent.type(screen.getByTestId(pswdTestId), testPswd);
    userEvent.click(screen.getByRole(btnRole, { name: /enter/i }));
    act(() => {
      history.push('/drink/3');
    });
    expect(screen.queryByTestId(headerTestId)).not.toBeInTheDocument();
  });

  it('Verifica se o campo para pesquisa se comporta conforme suas regras.', () => {
    renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(emailTestId), testEmail);
    userEvent.type(screen.getByTestId(pswdTestId), testPswd);
    userEvent.click(screen.getByRole(btnRole, { name: /enter/i }));
    expect(screen.queryByTestId(searchInptTestId)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(searchBtnTestId, { name: /search/i }));
    expect(screen.getByTestId(searchInptTestId)).toBeInTheDocument();
  });
});
