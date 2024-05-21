import { render, screen } from '@testing-library/react';
import { Login } from './Login';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './../../../store/store';

test('renders login form correctly', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText('Эл. почта');
  const passwordInput = screen.getByPlaceholderText('Пароль');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: 'Войти' });
  expect(submitButton).toBeInTheDocument();
});
