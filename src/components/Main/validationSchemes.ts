import { date, object, string } from 'yup';

export const RegisterSchema = object().shape({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, "It's too short! Minimum of 8 characters")
    .matches(/.*[A-Z].*/, 'At least 1 uppercase letter')
    .matches(/.*[a-z].*/, 'At least 1 lowercase letter')
    .matches(/.*[0-9].*/, 'At least 1 number')
    .required('Required'),
  firstName: string()
    .min(1, 'Too short!')
    .matches(/^[a-zA-Z]+$/, 'No special characters or numbers')
    .required('Required'),
  lastName: string()
    .min(1, 'Too short!')
    .matches(/^[a-zA-Z]+$/, 'No special characters or numbers')
    .required('Required'),
  dateOfBirth: date()
    .required('Required!')
    .test('dateOfBirth', '13 years old or older', function (value: Date | undefined) {
      if (!value) return false;
      return new Date().getFullYear() - value.getFullYear() >= 13;
    }),
  street: string().min(1, 'Too short!').required('Required'),
  city: string()
    .min(1, 'Too short!')
    .matches(/^[a-zA-Z]+$/, 'No special characters or numbers')
    .required('Required'),
  postalCode: string()
    .required('Required')
    .length(6, '6 numbers are needed')
    .matches(/^[0-9]+$/, 'Only numbers are allowed')
});
