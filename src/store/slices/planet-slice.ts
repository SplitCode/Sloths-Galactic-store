import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export enum Planets {
  earth = 'Earth',
  venus = 'Venus',
  mars = 'Mars'
}

export interface planetSliceState {
  planet: null | Planets;
}

const initialState: planetSliceState = {
  planet: Planets.earth
};
export const planetSlice = createSlice({
  name: 'planet_slice',
  initialState,
  reducers: {
    choosePlanet(state, action: PayloadAction<Planets>) {
      state.planet = action.payload;
    }
  }
});

export const choosePlanet = planetSlice.actions.choosePlanet;
