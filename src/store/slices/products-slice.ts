import { createSlice } from '@reduxjs/toolkit';
import type { ProductData } from '@commercetools/platform-sdk';
import { getProducts } from '../../api/products/getProducts';

export interface ProductsSliceState {
  isProductsLoading: boolean;
  products: ProductData[];
}

const initialState: ProductsSliceState = {
  isProductsLoading: false,
  products: []
};
export const productsSlice = createSlice({
  name: 'products_slice',
  initialState,
  reducers: {
    deleteProducts(state: ProductsSliceState) {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state: ProductsSliceState) => {
        state.isProductsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state: ProductsSliceState, action) => {
        state.products = action.payload.map((product) => product.masterData.current);
        state.isProductsLoading = false;
      })
      .addCase(getProducts.rejected, (state: ProductsSliceState) => {
        state.isProductsLoading = false;
      });
  }
});

export const deleteProducts = productsSlice.actions.deleteProducts;
