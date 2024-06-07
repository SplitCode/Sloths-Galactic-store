import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Cart } from '@commercetools/platform-sdk';

const initialState: { cart: Cart | null } = {
  cart: null
};

export const cartSlice = createSlice({
  name: 'cart_slice',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    deleteCart: (state) => {
      state.cart = null;
    }
  }
});

export const { setCart, deleteCart } = cartSlice.actions;
