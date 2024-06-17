import type { LoginValues } from '../Main.interfaces';
import type { AppDispatch } from '../../../store/store';
import { showToast } from '../../../helpers/showToast';
import { setCustomer } from '../../../store/slices/customer-slice';
import { loginCustomer } from '../../../api/customers/loginCustomer';
import type { FormikState } from 'formik';
import { errorHandler } from '../../../helpers/errorHandler';
import { getCart } from '../../../api/cart/getCart';

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
    dispatch(getCart(response.customer.id));
    if (resetForm) {
      resetForm();
    }
  });
};
