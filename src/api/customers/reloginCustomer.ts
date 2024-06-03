import { getRefreshFlowClient } from '../BuildClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Customer } from '@commercetools/platform-sdk';

export const reloginCustomer = createAsyncThunk<Customer>('customer/relogin', async () => {
  try {
    const client = getRefreshFlowClient();
    const response = await client.me().get().execute();
    return response.body;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
