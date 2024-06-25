import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ProductProjection } from '@commercetools/platform-sdk';
import type { GetProductsResponse } from '../../api/api.interfaces';
import { getProducts } from '../../api/products/getProducts';
import type { Filter, SortValues } from '../../components/Main/Main.interfaces';

export interface ProductsSliceState {
  isProductsLoading: boolean;
  products: ProductProjection[];
  filter: Filter | null;
  sort: SortValues | null;
  searchQuery: string;
  total: number;
}

const initialState: ProductsSliceState = {
  isProductsLoading: false,
  products: [],
  filter: null,
  sort: null,
  searchQuery: '',
  total: 0
};

export const productsSlice = createSlice({
  name: 'products_slice',
  initialState,
  reducers: {
    deleteProducts(state: ProductsSliceState) {
      state.products = [];
    },
    setFilter(state: ProductsSliceState, action: PayloadAction<Filter | null>) {
      state.filter = action.payload;
    },
    setSort(state: ProductsSliceState, action: PayloadAction<SortValues | null>) {
      state.sort = action.payload;
    },
    setSearchQuery(state: ProductsSliceState, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    resetSearch(state: ProductsSliceState) {
      state.searchQuery = '';
    }
  },
  extraReducers: (builder) => {
    const setLoading = (state: ProductsSliceState, isLoading: boolean) => {
      state.isProductsLoading = isLoading;
    };

    const setProducts = (state: ProductsSliceState, action: PayloadAction<GetProductsResponse>) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.isProductsLoading = false;
    };
    builder
      .addCase(getProducts.pending, (state) => setLoading(state, true))
      .addCase(getProducts.fulfilled, (state, action) => setProducts(state, action))
      .addCase(getProducts.rejected, (state) => setLoading(state, false));
  }
});

export const { deleteProducts, setFilter, setSort, setSearchQuery, resetSearch } = productsSlice.actions;
