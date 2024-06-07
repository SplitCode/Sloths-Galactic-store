import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { planetSlice } from './slices/planet-slice';
import { customerSlice } from './slices/customer-slice';
import { productsSlice } from './slices/products-slice';
import { cartSlice } from './slices/cart-slice';

const rootReducer = combineSlices(planetSlice, customerSlice, productsSlice, cartSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
