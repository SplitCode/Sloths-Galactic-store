import { Formik } from 'formik';
import { CustomForm } from '../../univComponents/CustomForm/CustomForm';
import { Input } from '../../univComponents/CustomForm/Input/Input';
import { Button } from '../../univComponents/Button/Button';
import { ValidError } from '../../univComponents/ValidError/ValidError';
import { Title } from '../../univComponents/CustomForm/Title/Title';
import { LoginSchema } from '../validationSchemes';
import type { LoginValues } from '../Main.interfaces';

const initialValues: LoginValues = {
  email: '',
  password: ''
};

export function Login() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values) => console.log(values)}
      >
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
          </>
        </CustomForm>
      </Formik>
    </>
  );
}
