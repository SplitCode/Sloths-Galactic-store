import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { Input } from './Input';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  it('Displayed correctly', () => {
    render(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <Input type="text" placeholder="Your name" name="name" />
      </Formik>
    );

    const input = screen.getByPlaceholderText('Your name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'name');
  });

  it('The input of the password type is displayed correctly', async () => {
    render(
      <Formik initialValues={{ field: '' }} onSubmit={() => {}}>
        <Input type="password" placeholder="Some field" name="field" />
      </Formik>
    );
    const input = screen.getByPlaceholderText('Some field');
    const passwordBtn = screen.getByRole('button');
    expect(passwordBtn).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');

    const user = userEvent.setup();
    await user.click(passwordBtn);
    await user.type(input, 'some value');

    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('some value');
  });
});
