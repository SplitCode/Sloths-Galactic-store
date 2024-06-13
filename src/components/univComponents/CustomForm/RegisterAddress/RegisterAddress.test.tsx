import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RegisterAddress } from './RegisterAddress';
import { Formik } from 'formik';

describe('Address', () => {
  it('The billing address is displayed correctly', () => {
    render(
      <Formik initialValues={{ shipping: { isSameAddress: true } }} onSubmit={() => {}}>
        <RegisterAddress name="billing" />
      </Formik>
    );
    const fieldset = screen.getByRole('group');

    expect(fieldset).toBeInTheDocument();
    expect(fieldset).not.toHaveClass('false');
    expect(fieldset).not.toHaveClass('true');
    expect(screen.getByText('Адрес выставления счёта')).toBeInTheDocument();
    expect(screen.getByText('Россия')).toBeInTheDocument();
    expect(screen.getByText('Беларусь')).toBeInTheDocument();
    expect(screen.queryByText('Использовать как адрес выставления счёта')).not.toBeInTheDocument();
  });

  it('The shipping address is displayed correctly', () => {
    render(
      <Formik initialValues={{ shipping: { isSameAddress: false } }} onSubmit={() => {}}>
        <RegisterAddress name="shipping" />
      </Formik>
    );

    expect(screen.queryByText('Использовать как адрес выставления счёта')).toBeInTheDocument();
  });
});
