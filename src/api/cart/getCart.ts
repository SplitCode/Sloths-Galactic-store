import type { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isApiError } from '../../helpers/isApiError';

export const getCart = createAsyncThunk<Cart, string>('cart/get', async (customerId: string) => {
  try {
    const cart = (await apiRoot.carts().withCustomerId({ customerId }).get().execute()).body;
    return cart;
  } catch (error) {
    console.error(error);
    if (isApiError(error) && error.body.errors && error.body.errors[0].code === 'ResourceNotFound') {
      throw new Error('Кажется, вы ещё ничего не добавляли в свою корзину');
    } else throw error;
  }
});
