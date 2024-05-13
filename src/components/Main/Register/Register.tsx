import { Formik } from 'formik';
import { CustomForm } from '../../univComponents/CustomForm/CustomForm';
import { Input } from '../../univComponents/CustomForm/Input/Input';
import { Button } from '../../univComponents/Button/Button';
import { ValidError } from '../../univComponents/ValidError/ValidError';
import { Title } from '../../univComponents/CustomForm/Title/Title';
import styles from './Register.module.css';
import { CountrySelect } from './CountrySelect/CountrySelect';
import { Planets } from './Planets/Planets';
import { RegisterSchema } from '../validationSchemes';
import type { RegisterValues } from '../Main.interfaces';
import { CustomLink } from '../../univComponents/CustomForm/Link/Link';
import { showToast } from '../../../helpers/showToast';
import { createCustomer } from '../../../api/customers/createCustomer';

const initialValues: RegisterValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  street: '',
  city: '',
  postalCode: '',
  country: 'Russia',
  planet: 'earth'
};

const submitCustomerData = (values: RegisterValues) => {
  return createCustomer({
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: values.dateOfBirth,
    addresses: [
      {
        country: values.country === 'Russia' ? 'RU' : 'BY',
        city: values.city,
        streetName: values.street,
        postalCode: values.postalCode
      }
    ]
  });
};

export function Register() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, { resetForm }) =>
          submitCustomerData(values).then(() => {
            resetForm();
            showToast('Successful registration!', 'success');
          })
        }
      >
        <CustomForm>
          <>
            <Title mainText={'Register'} additionText={'Welcome to the future'}></Title>
            <Input name={'email'} type="email" placeholder="Email">
              <ValidError name="email"></ValidError>
            </Input>

            <Input name={'password'} type="password" placeholder="Password">
              <ValidError name="password"></ValidError>
            </Input>

            <div className={styles.inputsGroup}>
              <Input name={'firstName'} type="text" placeholder="Name">
                <ValidError name="firstName"></ValidError>
              </Input>

              <Input name={'lastName'} type="text" placeholder="Surname">
                <ValidError name="lastName"></ValidError>
              </Input>
            </div>

            <Input name={'dateOfBirth'} type="date" placeholder="Date of birth">
              <ValidError name="dateOfBirth"></ValidError>
            </Input>

            <CountrySelect name={'country'}></CountrySelect>

            <div className={styles.inputsGroup}>
              <Input name={'city'} type="text" placeholder="City">
                <ValidError name="city"></ValidError>
              </Input>

              <Input name={'street'} type="text" placeholder="Street">
                <ValidError name="street"></ValidError>
              </Input>
            </div>

            <Input name={'postalCode'} type="text" placeholder="Postal code">
              <ValidError name="postalCode"></ValidError>
            </Input>

            <Planets />
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
