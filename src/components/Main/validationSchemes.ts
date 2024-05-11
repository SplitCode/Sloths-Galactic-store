import { date, object, string } from 'yup';

const email = string()
  .email('Invalid email')
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
  .required('Required field!');

const password = string()
  .min(8, "It's too short! Minimum of 8 characters")
  .matches(/.*[A-Z].*/, 'At least 1 uppercase letter')
  .matches(/.*[a-z].*/, 'At least 1 lowercase letter')
  .matches(/.*[0-9].*/, 'At least 1 number')
  .matches(/[!@#$%^&*]/, 'At least 1 special character !@#$%^&*')
  .required('Required field!')
  .test('no-whitespace', 'No leading or trailing whitespace', (value) => {
    return !(/^\s/.test(value) || /\s$/.test(value));
  });

export const RegisterSchema = object().shape({
  email,
  password,
  firstName: string()
    .min(1, 'Too short!')
    .matches(/^[a-zA-Z]+$/, 'No special characters or numbers')
    .required('Required field!'),
  lastName: string()
    .min(1, 'Too short!')
    .matches(/^[a-zA-Z]+$/, 'No special characters or numbers')
    .required('Required field!'),
  dateOfBirth: date()
    .required('Required field!')
    .test('dateOfBirth', '13 years old or older', function (value: Date | undefined) {
      if (!value) return false;
      return new Date().getFullYear() - value.getFullYear() >= 13;
    }),
  street: string().min(1, 'Too short!').required('Required field!'),
  city: string()
    .min(1, 'Too short!')
    .matches(/^[a-zA-Z]+$/, 'No special characters or numbers')
    .required('Required field!'),
  postalCode: string()
    .required('Required field!')
    .length(6, '6 numbers are needed')
    .matches(/^[0-9]+$/, 'Only numbers are allowed')
});

export const LoginSchema = object().shape({
  email,
  password
});
