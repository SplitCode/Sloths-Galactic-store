import { Formik } from 'formik';
import { CustomForm } from '../../univComponents/CustomForm/CustomForm';
import { Input } from '../../univComponents/CustomForm/Input/Input';
import { Button } from '../../univComponents/Button/Button';
import { CustomLink } from '../../univComponents/CustomForm/CustomLink/CustomLink';
import { Title } from '../../univComponents/CustomForm/Title/Title';
import { LoginSchema } from '../validationSchemes';
import type { LoginValues } from '../Main.interfaces';
import { useAppDispatch } from '../../../store/hooks';
import { login } from './auth';

const initialValues: LoginValues = {
  email: '',
  password: ''
};

export function Login() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={({ email, password }, { resetForm }) => login({ email, password }, dispatch, resetForm)}
      >
        <CustomForm>
          <Title mainText={'Login'} additionText={'Welcome back to the future'} />
          <Input name={'email'} type="text" placeholder="Email" />
          <Input name={'password'} type="password" placeholder="Password" />
          <Button type="submit">Login</Button>
          <CustomLink text="Don't have an account yet?" to="/register">
            Register
          </CustomLink>
        </CustomForm>
      </Formik>
    </>
  );
}
