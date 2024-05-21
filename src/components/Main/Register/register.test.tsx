import { render, screen } from '@testing-library/react';
import { Register } from './Register';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './../../../store/store';

test('renders register form correctly', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Register />
      </Provider>
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText('Эл. почта');
  const passwordInput = screen.getByPlaceholderText('Пароль');
  const firstNameInput = screen.getByPlaceholderText('Имя');
  const lastNameInput = screen.getByPlaceholderText('Фамилия');
  const dateOfBirthInput = screen.getByPlaceholderText('Дата рождения');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(dateOfBirthInput).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: 'Создать аккаунт' });
  expect(submitButton).toBeInTheDocument();

  const loginLink = screen.getByRole('link', { name: 'Авторизуйтесь' });
  expect(loginLink).toBeInTheDocument();
});
