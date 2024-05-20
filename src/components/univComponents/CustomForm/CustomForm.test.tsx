import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomForm } from './CustomForm';
import { Formik } from 'formik';

describe('CustomForm', () => {
  render(
    <Formik initialValues={{}} onSubmit={() => {}}>
      <CustomForm>
        <input placeholder="password" name="password"></input>
      </CustomForm>
    </Formik>
  );

  it('Children is passed correctly', () => {
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });
});
