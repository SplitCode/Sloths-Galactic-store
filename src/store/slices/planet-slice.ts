import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export enum Planets {
  earth = 'earth',
  venus = 'venus',
  mars = 'mars'
}

enum PlanetsColor {
  venus = 'rgb(255,219,75)',
  earth = 'rgb(31, 163, 240)',
  mars = 'rgb(197,42,9)'
}

export interface PlanetSliceState {
  planet: Planets;
  accentColor: PlanetsColor;
}
export const defaultPlanet: Planets = Planets.earth;
const savedPlanet = localStorage.getItem('sloth-selectedPlanet') as Planets | null;

const initialState: PlanetSliceState = {
  planet: savedPlanet ?? defaultPlanet,
  accentColor: savedPlanet ? PlanetsColor[savedPlanet] : PlanetsColor[defaultPlanet]
};

export const planetSlice = createSlice({
  name: 'planet_slice',
  initialState,
  reducers: {
    setPlanet(state, action: PayloadAction<Planets>) {
      state.planet = action.payload;
      state.accentColor = PlanetsColor[action.payload];
      localStorage.setItem('sloth-selectedPlanet', action.payload);
    }
  }
});

export const setPlanet = planetSlice.actions.setPlanet;
