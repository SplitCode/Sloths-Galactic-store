import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export enum Planets {
  earth = 'Earth',
  venus = 'Venus',
  mars = 'Mars'
}
export type Planet = 'Earth' | 'Venus' | 'Mars';

export interface planetSliceState {
  planet: null | Planet;
}

const initialState: planetSliceState = {
  planet: null
};
export const planetSlice = createSlice({
  name: 'planet_slice',
  initialState,
  reducers: {
    choosePlanet(state, action: PayloadAction<Planet>) {
      state.planet = action.payload;
    }
  }
});

export const choosePlanet = planetSlice.actions.choosePlanet;
