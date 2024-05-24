import type { AppDispatch } from '../../store/store';
import { deleteCustomer } from '../../store/slices/customer-slice';

export const logout = (dispatch: AppDispatch) => {
  localStorage.clear();
  dispatch(deleteCustomer());
};
