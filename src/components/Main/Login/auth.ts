import type { LoginValues } from '../Main.interfaces';
import type { AppDispatch } from '../../../store/store';
import { showToast } from '../../../helpers/showToast';
import { setCustomer } from '../../../store/slices/customer-slice';
import { loginCustomer } from '../../../api/customers/loginCustomer';
import type { FormikState, FormikValues } from 'formik';
import type { RegisterValues } from '../Main.interfaces';
import type { CustomerBody } from '../../../api/api.interfaces';

export const login = async (
  values: LoginValues,
  dispatch: AppDispatch,
  resetForm?: (nextState?: Partial<FormikState<FormikValues>>) => void
): Promise<void> => {
  try {
    await loginCustomer(values).then(({ body }) => {
      showToast({
        text: 'Successful login!',
        type: 'success'
      });
      if (resetForm) {
        resetForm();
      }
      dispatch(setCustomer(body.customer));
    });
  } catch (error) {
    showToast({
      text: 'Incorrect email or password. Please try again!',
      type: 'error'
    });
  }
};

export const formatCustomerData = (values: RegisterValues): CustomerBody => {
  const customerBody: CustomerBody = {
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: values.dateOfBirth,
    addresses: [
      {
        country: values.address.country === 'Russia' ? 'RU' : 'BY',
        city: values.address.city,
        streetName: values.address.street,
        postalCode: values.address.postalCode
      }
    ]
  };

  if (values.address.isDefault) {
    customerBody.defaultShippingAddress = 0;
    customerBody.defaultBillingAddress = 0;
  }

  return customerBody;
};
