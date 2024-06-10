import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EditorTitle } from './EditorTitle';

describe('EditorTitle', () => {
  it('Displayed correctly', () => {
    render(<EditorTitle>Заголовок</EditorTitle>);

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Заголовок');
  });
});
