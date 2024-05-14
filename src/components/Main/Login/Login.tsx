import { Formik } from 'formik';
import { showToast } from '../../../helpers/showToast';
import { CustomForm } from '../../univComponents/CustomForm/CustomForm';
import { Input } from '../../univComponents/CustomForm/Input/Input';
import { Button } from '../../univComponents/Button/Button';
import { CustomLink } from '../../univComponents/CustomForm/CustomLink/CustomLink';
import { Title } from '../../univComponents/CustomForm/Title/Title';
import { LoginSchema } from '../validationSchemes';
import type { LoginValues } from '../Main.interfaces';
import { loginCustomer } from '../../../api/customers/loginCustomer';

const login = async (values: LoginValues): Promise<void> => {
  try {
    await loginCustomer(values);
    showToast({
      text: 'Successful login!',
      type: 'success'
    });
    values.email = '';
    values.password = '';
  } catch (error) {
    showToast({
      text: 'Incorrect email or password. Please try again!',
      type: 'error'
    });
  }
};

const initialValues: LoginValues = {
  email: '',
  password: ''
};

export function Login() {
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={login}>
        <CustomForm>
          <>
            <Title mainText={'Login'} additionText={'Welcome back to the future'}></Title>
            <Input name={'email'} type="text" placeholder="Email"></Input>

            <Input name={'password'} type="password" placeholder="Password"></Input>

            <Button type="submit">Login</Button>
            <CustomLink text="Don't have an account yet?" to="/register">
              Register
            </CustomLink>
          </>
        </CustomForm>
      </Formik>
    </>
  );
}
