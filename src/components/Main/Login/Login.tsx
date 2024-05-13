import { Formik } from 'formik';
import { CustomForm } from '../../univComponents/CustomForm/CustomForm';
import { Input } from '../../univComponents/CustomForm/Input/Input';
import { Button } from '../../univComponents/Button/Button';
import { CustomLink } from '../../univComponents/CustomForm/Link/Link';
import { ValidError } from '../../univComponents/ValidError/ValidError';
import { Title } from '../../univComponents/CustomForm/Title/Title';
import { LoginSchema } from '../validationSchemes';
import type { LoginValues } from '../Main.interfaces';
import { loginCustomer } from '../../../api/customers/loginCustomer';

const login = async ({ email, password }: LoginValues): Promise<void> => {
  try {
    await loginCustomer({ email, password });
    console.log('Logined');
  } catch (error) {
    console.error('Error:', error);
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
            <Input name={'email'} type="text" placeholder="Email">
              <ValidError name="email"></ValidError>
            </Input>

            <Input name={'password'} type="password" placeholder="Password">
              <ValidError name="password"></ValidError>
            </Input>

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
