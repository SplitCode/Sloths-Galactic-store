import type { LoginValues } from '../Main.interfaces';
import type { AppDispatch } from '../../../store/store';
import { showToast } from '../../../helpers/showToast';
import { setCustomer } from '../../../store/slices/customer-slice';
import { loginCustomer } from '../../../api/customers/loginCustomer';
import type { FormikState } from 'formik';
import type { RegisterValues } from '../Main.interfaces';
import type { CustomerBody } from '../../../api/api.interfaces';
import { errorHandler } from '../../../helpers/errorHandler';

export const login = async (
  values: LoginValues,
  dispatch: AppDispatch,
  resetForm?: (nextState?: Partial<FormikState<LoginValues>> | undefined) => void
): Promise<void> => {
  const { email, password } = values;
  const loginPromise = loginCustomer(email, password);
  showToast({
    promise: loginPromise,
    pending: 'Ожидайте...',
    success: 'Успешная авторизация!',
    errorHandler: errorHandler
  });
  loginPromise.then((response) => {
    dispatch(setCustomer(response.customer));
    if (resetForm) {
      resetForm();
    }
  });
};

export const formatCustomerData = (values: RegisterValues): CustomerBody => {
  const shippingIndex = 0;
  const billingIndex = 1;

  const customerBody: CustomerBody = {
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: values.dateOfBirth,
    addresses: [
      {
        city: values.shipping.city,
        country: values.shipping.country === 'Russia' ? 'RU' : 'BY',
        postalCode: values.shipping.postalCode,
        streetName: values.shipping.street
      }
    ],
    shippingAddresses: [shippingIndex],
    billingAddresses: values.shipping.isSameAddress ? [shippingIndex] : [billingIndex]
  };

  if (values.shipping.isSameAddress && values.shipping.isDefault) {
    customerBody.defaultShippingAddress = shippingIndex;
    customerBody.defaultBillingAddress = shippingIndex;
  } else if (!values.shipping.isSameAddress) {
    customerBody.addresses.push({
      city: values.billing.city,
      country: values.billing.country === 'Russia' ? 'RU' : 'BY',
      postalCode: values.billing.postalCode,
      streetName: values.billing.street
    });

    if (values.shipping.isDefault) {
      customerBody.defaultShippingAddress = shippingIndex;
    }
    if (values.billing.isDefault) {
      customerBody.defaultBillingAddress = billingIndex;
    }
  }
  return customerBody;
};
