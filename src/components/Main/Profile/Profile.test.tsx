import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Profile } from './Profile';
import { renderWithProviders } from '../../../helpers/renderWithProviders';
import type { Customer } from '@commercetools/platform-sdk';

describe('Profile', () => {
  const customerData = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'someEmail@mail.com',
    dateOfBirth: '10-04-2002'
  } as Customer;

  it('Displayed correctly', () => {
    renderWithProviders(<Profile />, {
      preloadedState: {
        customer_slice: {
          customerId: 'someId',
          customerData,
          isCustomerLoading: false,
          isUnknownStatus: false
        }
      }
    });

    expect(screen.getByRole('heading')).toHaveTextContent('Профиль');
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
    expect(screen.getByText(/имя/i)).toBeInTheDocument();
    expect(screen.getByText(/фамилия/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/дата рождения/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /редактировать/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /изменить пароль/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /управление адресами/i })).toBeInTheDocument();
  });
});
