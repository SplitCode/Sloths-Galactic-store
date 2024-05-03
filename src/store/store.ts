import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices } from '@reduxjs/toolkit';

//Закомментировано до момента создания слайсеров

const rootReducer = combineSlices();
export type RootState = ReturnType<typeof rootReducer>;
// export const makeStore = (preloadedState?: Partial<RootState>) => {
//   const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => {
//       return getDefaultMiddleware().concat();
//     },
//     preloadedState,
//   });
//   setupListeners(store.dispatch);
//   return store;
// };
// export const store = makeStore();

export const store = undefined;

export type AppStore = typeof store;
// export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
