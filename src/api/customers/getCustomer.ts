import type { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCustomer = createAsyncThunk<Customer, string>('customer/get', async (ID: string) => {
  try {
    const customer = (await apiRoot.customers().withId({ ID }).get().execute()).body;
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
