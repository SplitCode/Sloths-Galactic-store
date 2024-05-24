import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Customer } from '@commercetools/platform-sdk';
import { getCustomer } from '../../api/customers/getCustomer';

export interface CustomerSliceState {
  customerId: null | string;
  customerName: null | string;
  isCustomerLoading: boolean;
  customerData?: Customer;
  errorMessage?: string;
}

const initialState: CustomerSliceState = {
  customerId: null,
  customerName: null,
  isCustomerLoading: false
};

export const customerSlice = createSlice({
  name: 'customer_slice',
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customerId = action.payload.id;
      state.customerName = action.payload.firstName || null;
    },
    deleteCustomer(state) {
      state.customerId = null;
      state.customerName = null;
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
      })
      .addCase(getCustomer.rejected, (state: CustomerSliceState, action) => {
        state.errorMessage = action.error.message;
        state.isCustomerLoading = false;
      });
  }
});

export const setCustomer = customerSlice.actions.setCustomer;
export const deleteCustomer = customerSlice.actions.deleteCustomer;
