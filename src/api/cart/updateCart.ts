import type { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UpdateCartData } from '../api.interfaces';

export const updateCart = createAsyncThunk<Cart, UpdateCartData>(
  'cart/update',
  async ({ actions, version, ID }) => {
    try {
      const cart = (await apiRoot.carts().withId({ ID }).post({ body: { version, actions } }).execute()).body;
      return cart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
