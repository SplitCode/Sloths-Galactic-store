import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { getProducts } from '../../api/products/getProducts';
import type { Filter, SortValues } from '../../components/Main/Main.interfaces';

export interface ProductsSliceState {
  isProductsLoading: boolean;
  products: ProductProjection[];
  filter: Filter;
  sort: SortValues | null;
  searchQuery: string;
}

const initialState: ProductsSliceState = {
  isProductsLoading: false,
  products: [],
  filter: { type: '', value: '' },
  sort: null,
  searchQuery: ''
};

export const productsSlice = createSlice({
  name: 'products_slice',
  initialState,
  reducers: {
    deleteProducts(state: ProductsSliceState) {
      state.products = [];
    },
    setFilter(state: ProductsSliceState, action: PayloadAction<Filter | null>) {
      if (action.payload) {
        state.filter.type = action.payload.type;
        state.filter.value = action.payload.value;
      } else {
        state.filter = initialState.filter;
      }
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

    const setProducts = (state: ProductsSliceState, action: PayloadAction<ProductProjection[]>) => {
      state.products = action.payload.map((product) => product);
      state.isProductsLoading = false;
    };

    builder
      .addCase(getProducts.pending, (state) => setLoading(state, true))
      .addCase(getProducts.fulfilled, (state, action) => setProducts(state, action))
      .addCase(getProducts.rejected, (state) => setLoading(state, false));
  }
});

export const { deleteProducts, setFilter, setSort, setSearchQuery, resetSearch } = productsSlice.actions;
