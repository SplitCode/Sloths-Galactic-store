import { getRefreshFlowClient } from '../BuildClient';
import { setCustomer } from '../../store/slices/customer-slice';
import type { AppDispatch } from '../../store/store';

export const reloginCustomer = async (dispatch: AppDispatch) => {
  try {
    const client = getRefreshFlowClient();
    const response = await client.me().get().execute();
    if (response.statusCode === 200) {
      dispatch(setCustomer(response.body));
    }
  } catch (error) {
    console.error(error);
  }
};
