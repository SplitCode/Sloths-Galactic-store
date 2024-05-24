import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Title } from './Title';

describe('Title', () => {
  render(<Title mainText="Main text" additionText="Additional text" />);

  it('All headings are displayed correctly', () => {
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h1).toHaveTextContent('Main text');
    expect(h2).toHaveTextContent('Additional text');
  });
});
