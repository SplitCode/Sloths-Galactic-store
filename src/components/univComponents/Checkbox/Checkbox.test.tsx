import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { Formik } from 'formik';

describe('Checkbox', () => {
  render(
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Checkbox name="address">It is a checkbox</Checkbox>
    </Formik>
  );

  it('Properties are passed correctly', () => {
    expect(screen.getByText('It is a checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'address');
  });
});
