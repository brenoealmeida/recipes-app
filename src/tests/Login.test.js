import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWith';

describe('Bloco de testes da tela de Login', () => {
  it('Testa presença dos inputs e botão', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    const enterBtn = screen.getByRole('button', { name: /enter/i });
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toBeDisabled();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    expect(enterBtn).toBeEnabled();

    userEvent.click(enterBtn);
    expect(history.location.pathname).toBe('/meals');
  });
});
