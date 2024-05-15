import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Customer } from '@commercetools/platform-sdk';
export interface customerSliceState {
  customerId: null | string;
}
const initialState: customerSliceState = {
  customerId: null
};
export const customerSlice = createSlice({
  name: 'customer_slice',
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customerId = action.payload.id;
    }
  }
});

export const setCustomer = customerSlice.actions.setCustomer;
