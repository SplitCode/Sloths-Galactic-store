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
            pending: 'Processing...',
            success: 'Successful registration!',
            error: 'error'
          });
          customerPromise.then(() => {
            login({ email: values.email, password: values.password }, dispatch);
          });
        }}
      >
        <CustomForm>
          <>
            <Title mainText={'Register'} additionText={'Welcome to the future'}></Title>
            <Input name={'email'} type="email" placeholder="Email"></Input>
            <Input name={'password'} type="password" placeholder="Password"></Input>
            <div className={styles.inputsGroup}>
              <Input name={'firstName'} type="text" placeholder="Name"></Input>
              <Input name={'lastName'} type="text" placeholder="Surname"></Input>
            </div>
            <Input name={'dateOfBirth'} type="date" placeholder="Date of birth"></Input>

            <Address name="shipping" />
            <Address name="billing" />

            <Button type="submit">Register</Button>
            <CustomLink text="Already have an account?" to="/login">
              Login
            </CustomLink>
          </>
        </CustomForm>
      </Formik>
    </>
  );
}
