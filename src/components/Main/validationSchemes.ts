import { date, object, string } from 'yup';

const email = string()
  .email('Некорректный адрес эл. почты')
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Некорректный адрес эл. почты')
  .required('Обязательное поле');

const password = string()
  .min(8, 'Слишком коротко. Минимум 8 символов')
  .matches(/.*[A-Z].*/, 'Минимум 1 заглавная буква')
  .matches(/.*[a-z].*/, 'Минимум 1 строчная буква')
  .matches(/.*[0-9].*/, 'Минимум 1 число')
  .matches(/[!@#$%^&*]/, 'Как минимум 1 спец. символ !@#$%^&*')
  .required('Обязательное поле')
  .test('no-whitespace', 'Не должно быть пробелов в начале и в конце', (value) => {
    return !(/^\s/.test(value) || /\s$/.test(value));
  });

const firstName = string()
  .min(1, 'Слишком коротко')
  .matches(/^[a-zA-Zа-яА-Я]+$/, 'Уберите специальные символы и числа')
  .trim()
  .required('Обязательное поле');

const lastName = string()
  .min(1, 'Слишком коротко')
  .matches(/^[a-zA-Zа-яА-Я]+$/, 'Уберите специальные символы и числа')
  .trim()
  .required('Обязательное поле');

const dateOfBirth = date()
  .required('Обязательное поле')
  .test('dateOfBirth', 'Допускаются пользователи от 13 лет', function (value: Date | undefined) {
    if (!value) return false;
    return new Date().getFullYear() - value.getFullYear() >= 13;
  });

const address = object({
  street: string().min(1, 'Слишком коротко').required('Обязательное поле'),
  city: string()
    .min(1, 'Слишком коротко')
    .matches(/^[a-zA-Zа-яА-Я]+$/, 'Уберите специальные символы и числа')
    .required('Обязательное поле'),
  postalCode: string()
    .required('Обязательное поле')
    .length(6, 'Требуется 6 цифр')
    .matches(/^[0-9]+$/, 'Разрешены только цифры')
});

export const RegisterSchema = object().shape({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  shipping: address,
  billing: address.when('shipping.isSameAddress', {
    is: true,
    then: () => object().shape({}),
    otherwise: () => address
  })
});

export const LoginSchema = object().shape({
  email,
  password
});

export const PersonalDataSchema = object().shape({
  email,
  firstName,
  lastName,
  dateOfBirth
});

export const PasswordEditorSchema = object().shape({
  currentPassword: password,
  newPassword: password
});

export const AddressSchema = address;
