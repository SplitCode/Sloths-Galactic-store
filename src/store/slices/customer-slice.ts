import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Customer } from '@commercetools/platform-sdk';
import { getCustomer } from '../../api/customers/getCustomer';
import { reloginCustomer } from '../../api/customers/reloginCustomer';

export interface CustomerSliceState {
  customerId: null | string;
  isCustomerLoading: boolean;
  isUnknownStatus: boolean;
  customerData?: Customer;
  errorMessage?: string;
}

const initialState: CustomerSliceState = {
  customerId: null,
  isCustomerLoading: false,
  isUnknownStatus: true
};

export const customerSlice = createSlice({
  name: 'customer_slice',
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customerId = action.payload.id;
      state.customerData = action.payload;
      state.isUnknownStatus = false;
    },
    deleteCustomer(state) {
      state.customerId = null;
      state.isUnknownStatus = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.pending, (state: CustomerSliceState) => {
        state.isCustomerLoading = true;
      })
      .addCase(getCustomer.fulfilled, (state: CustomerSliceState, action) => {
        state.customerData = action.payload;
        state.isCustomerLoading = false;
        state.isUnknownStatus = false;
      })
      .addCase(getCustomer.rejected, (state: CustomerSliceState, action) => {
        state.errorMessage = action.error.message;
        state.isCustomerLoading = false;
        state.isUnknownStatus = false;
      })
      .addCase(reloginCustomer.pending, (state: CustomerSliceState) => {
        state.isCustomerLoading = true;
      })
      .addCase(reloginCustomer.fulfilled, (state: CustomerSliceState, action) => {
        state.customerId = action.payload.id;
        state.isCustomerLoading = false;
        state.customerData = action.payload;
        state.isUnknownStatus = false;
      })
      .addCase(reloginCustomer.rejected, (state: CustomerSliceState) => {
        state.isCustomerLoading = false;
        state.isUnknownStatus = false;
      });
  }
});

export const setCustomer = customerSlice.actions.setCustomer;
export const deleteCustomer = customerSlice.actions.deleteCustomer;
