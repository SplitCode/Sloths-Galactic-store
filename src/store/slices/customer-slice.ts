import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Customer } from '@commercetools/platform-sdk';
export interface customerSliceState {
  customerId: null | string | undefined;
  customerName: null | string | undefined;
}
const initialState: customerSliceState = {
  customerId: undefined,
  customerName: undefined
};
export const customerSlice = createSlice({
  name: 'customer_slice',
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customerId = action.payload.id;
      state.customerName = action.payload.firstName;
    },
    deleteCustomer(state) {
      state.customerId = null;
      state.customerName = null;
    }
  }
});

export const setCustomer = customerSlice.actions.setCustomer;
export const deleteCustomer = customerSlice.actions.deleteCustomer;
