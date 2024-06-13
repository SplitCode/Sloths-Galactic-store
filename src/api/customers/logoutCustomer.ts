import type { AppDispatch } from '../../store/store';
import { deleteCustomer } from '../../store/slices/customer-slice';
import { defaultPlanet, setPlanet } from '../../store/slices/planet-slice';

export const logout = (dispatch: AppDispatch) => {
  dispatch(setPlanet(defaultPlanet));
  localStorage.clear();
  dispatch(deleteCustomer());
};
