import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordButton } from './PasswordButton';
import { userEvent } from '@testing-library/user-event';

describe('PasswordButton', () => {
  it('The component is displayed', () => {
    render(<PasswordButton passwordVisibility={false} togglePasswordVisibility={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByAltText('password visibility')).toBeInTheDocument();
  });

  it('The click is handled correctly', async () => {
    let passwordVisibility = false;
    const togglePasswordVisibility = () => {
      passwordVisibility = !passwordVisibility;
    };

    render(
      <PasswordButton
        passwordVisibility={passwordVisibility}
        togglePasswordVisibility={togglePasswordVisibility}
      />
    );
    const img = screen.getByAltText('password visibility');

    const user = userEvent.setup();
    expect(passwordVisibility).toBe(false);
    expect(img).toHaveAttribute('src', '/src/assets/img/noVisible.svg');

    await user.click(screen.getByRole('button'));
    expect(passwordVisibility).toBe(true);
  });

  it('Correct src attribute', () => {
    render(<PasswordButton passwordVisibility={true} togglePasswordVisibility={() => {}} />);
    expect(screen.getByAltText('password visibility')).toHaveAttribute('src', '/src/assets/img/visible.svg');
  });
});
