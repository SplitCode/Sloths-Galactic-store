import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Product, ProductData } from '@commercetools/platform-sdk';
import {
  getFilteredProducts,
  getPlanetProducts,
  getSubcategoryProducts
} from '../../api/products/getProducts';

export interface ProductsSliceState {
  isProductsLoading: boolean;
  isFilteredLoading: boolean;
  products: ProductData[];
  filteredProducts: ProductData[];
}

const initialState: ProductsSliceState = {
  isProductsLoading: false,
  isFilteredLoading: false,
  products: [],
  filteredProducts: []
};
export const productsSlice = createSlice({
  name: 'products_slice',
  initialState,
  reducers: {
    deleteProducts(state: ProductsSliceState) {
      state.products = [];
    },
    deleteFilteredProducts(state) {
      state.filteredProducts = [];
    }
  },
  extraReducers: (builder) => {
    const setLoading = (state: ProductsSliceState, isLoading: boolean) => {
      state.isProductsLoading = isLoading;
    };
    const setFilteredLoading = (state: ProductsSliceState, isLoading: boolean) => {
      state.isFilteredLoading = isLoading;
    };

    const setProducts = (state: ProductsSliceState, action: PayloadAction<Product[]>) => {
      state.products = action.payload.map((product) => product.masterData.current);
      state.filteredProducts = [];
      state.isProductsLoading = false;
    };
    const setFilteredProducts = (state: ProductsSliceState, action: PayloadAction<Product[]>) => {
      state.filteredProducts = action.payload.map((product) => product.masterData.current);
      state.isFilteredLoading = false;
    };

    builder
      .addCase(getPlanetProducts.pending, (state) => setLoading(state, true))
      .addCase(getPlanetProducts.fulfilled, (state, action) => setProducts(state, action))
      .addCase(getPlanetProducts.rejected, (state) => setLoading(state, false))
      .addCase(getSubcategoryProducts.pending, (state) => setLoading(state, true))
      .addCase(getSubcategoryProducts.fulfilled, (state, action) => setProducts(state, action))
      .addCase(getSubcategoryProducts.rejected, (state) => setLoading(state, false))
      .addCase(getFilteredProducts.pending, (state) => setFilteredLoading(state, true))
      .addCase(getFilteredProducts.fulfilled, (state, action) => setFilteredProducts(state, action))
      .addCase(getFilteredProducts.rejected, (state) => setFilteredLoading(state, false));
  }
});

export const deleteProducts = productsSlice.actions.deleteProducts;
export const deleteFilteredProducts = productsSlice.actions.deleteFilteredProducts;
