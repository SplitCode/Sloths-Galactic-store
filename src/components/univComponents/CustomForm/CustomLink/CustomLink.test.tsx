import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomLink } from './CustomLink';
import { MemoryRouter } from 'react-router-dom';

describe('CustomLink', () => {
  it('Displayed correctly', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <CustomLink to="/login" text="Already have an account?">
          Login
        </CustomLink>
      </MemoryRouter>
    );
    const link = screen.getByRole('link');

    expect(screen.getByText('Already have an account?', { exact: false })).toBeInTheDocument();
    expect(link).toHaveTextContent('Login');
    expect(link).toHaveAttribute('href', '/login');
  });
});
