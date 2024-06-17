import { createSlice } from '@reduxjs/toolkit';
import type { Cart } from '@commercetools/platform-sdk';
import { getCart, getCartById } from '../../api/cart/getCart';
import { updateCart } from '../../api/cart/updateCart';

export interface CartSliceState {
  cart: Cart | null;
  isLoading: boolean;
  isUpdating: boolean;
  errorMessage?: string;
}

const initialState: CartSliceState = {
  cart: null,
  isLoading: false,
  isUpdating: false
};

export const cartSlice = createSlice({
  name: 'cart_slice',
  initialState,
  reducers: {
    deleteCart: (state) => {
      state.cart = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state: CartSliceState) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state: CartSliceState, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(getCart.rejected, (state: CartSliceState, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
      })
      .addCase(updateCart.fulfilled, (state: CartSliceState, action) => {
        state.isUpdating = false;
        state.cart = action.payload;
      })
      .addCase(updateCart.pending, (state: CartSliceState) => {
        state.isUpdating = true;
      })
      .addCase(updateCart.rejected, (state: CartSliceState, action) => {
        state.isUpdating = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getCartById.pending, (state: CartSliceState) => {
        state.isLoading = true;
      })
      .addCase(getCartById.fulfilled, (state: CartSliceState, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartById.rejected, (state: CartSliceState, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
      });
  }
});

export const { deleteCart } = cartSlice.actions;
