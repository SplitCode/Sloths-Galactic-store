import { Formik } from 'formik';
import { CustomForm } from '../../univComponents/CustomForm/CustomForm';
import { Input } from '../../univComponents/CustomForm/Input/Input';
import { Button } from '../../univComponents/Button/Button';
import { Title } from '../../univComponents/CustomForm/Title/Title';
import styles from './Register.module.css';
import { RegisterSchema } from '../validationSchemes';
import type { RegisterValues } from '../Main.interfaces';
import { CustomLink } from '../../univComponents/CustomForm/CustomLink/CustomLink';
import { showToast } from '../../../helpers/showToast';
import { createCustomer } from '../../../api/customers/createCustomer';
import { useAppDispatch } from '../../../store/hooks';
import { Address } from '../../univComponents/CustomForm/Address/Address';
import { formatCustomerData, login } from '../Login/auth';
import type { ErrorResponse } from '@commercetools/platform-sdk';

const initialValues: RegisterValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  shipping: {
    street: '',
    city: '',
    postalCode: '',
    country: 'Russia',
    isDefault: false,
    isSameAddress: false
  },
  billing: {
    street: '',
    city: '',
    postalCode: '',
    country: 'Russia',
    isDefault: false
  }
};

function registerErrorHandler(error: ErrorResponse): string {
  if (error.statusCode.toString()[0] === '5') return `Ошибка сервера. Код: ${error.statusCode}`;
  if (!error.errors) throw new Error('errors array not found');

  const errorCode = error.errors[0].code;

  if (errorCode === 'DuplicateField') {
    return 'Уже есть существующий клиент с указанным адресом электронной почты.';
  } else return error.message;
}

export function Register() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={async (values: RegisterValues) => {
          const customerPromise = createCustomer(formatCustomerData(values));
          showToast({
            promise: customerPromise,
            pending: 'Ожидайте...',
            success: 'Успешная регистрация!',
            errorHandler: registerErrorHandler
          });
          customerPromise.then(() => {
            login({ email: values.email, password: values.password }, dispatch);
          });
        }}
      >
        <CustomForm>
          <>
            <Title mainText={'Регистрация'} additionText={'Добро пожаловать в будущее'}></Title>
            <Input name={'email'} type="email" placeholder="Эл. почта"></Input>
            <Input name={'password'} type="password" placeholder="Пароль"></Input>
            <div className={styles.inputsGroup}>
              <Input name={'firstName'} type="text" placeholder="Имя"></Input>
              <Input name={'lastName'} type="text" placeholder="Фамилия"></Input>
            </div>
            <Input name={'dateOfBirth'} type="date" placeholder="Дата рождения"></Input>

            <Address name="shipping" />
            <Address name="billing" />

            <Button type="submit">Создать аккаунт</Button>
            <CustomLink text="Уже есть аккаунт?" to="/login">
              Авторизуйтесь
            </CustomLink>
          </>
        </CustomForm>
      </Formik>
    </>
  );
}
