import { createSlice } from '@reduxjs/toolkit';
import type { ProductData } from '@commercetools/platform-sdk';
import { getProducts } from '../../api/products/getProducts';

export interface productsSliceState {
  isProductsLoading: boolean;
  products: ProductData[];
}

const initialState: productsSliceState = {
  isProductsLoading: false,
  products: []
};
export const productsSlice = createSlice({
  name: 'products_slice',
  initialState,
  reducers: {
    deleteProducts(state: productsSliceState) {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state: productsSliceState) => {
        state.isProductsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state: productsSliceState, action) => {
        state.products = action.payload.map((product) => product.masterData.current);
        state.isProductsLoading = false;
      })
      .addCase(getProducts.rejected, (state: productsSliceState) => {
        state.isProductsLoading = false;
      });
  }
});

export const deleteProducts = productsSlice.actions.deleteProducts;
