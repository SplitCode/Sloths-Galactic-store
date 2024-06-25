import type { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UpdateCartData } from '../api.interfaces';
import { errorHandler } from '../../helpers/errorHandler';
import { showToast } from '../../helpers/showToast';

export const updateCart = createAsyncThunk<Cart, UpdateCartData>(
  'cart/update',
  async ({ actions, version, ID }) => {
    try {
      const cartPromise = apiRoot.carts().withId({ ID }).post({ body: { version, actions } }).execute();
      showToast({
        promise: cartPromise,
        pending: 'В процессе...',
        success: 'Сделано!',
        errorHandler
      });
      return (await cartPromise).body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
