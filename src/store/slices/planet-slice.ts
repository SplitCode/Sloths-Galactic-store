import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export enum Planets {
  earth = 'earth',
  venus = 'venus',
  mars = 'mars'
}

enum VenusColors {
  Light = 'rgb(234 188 0)',
  Dark = 'rgb(126 104 16)'
}

enum EarthColors {
  Light = 'rgb(36 174 255)',
  Dark = 'rgb(23 90 130)'
}

enum MarsColors {
  Light = 'rgb(237 52 12)',
  Dark = 'rgb(140 33 9)'
}

const PlanetsColor = {
  venus: VenusColors,
  earth: EarthColors,
  mars: MarsColors
};

export interface PlanetSliceState {
  planet: Planets;
  accentColor: typeof VenusColors | typeof EarthColors | typeof MarsColors;
}
export const defaultPlanet: Planets = Planets.earth;
const savedPlanet = localStorage.getItem('sloth-selectedPlanet') as Planets | null;

const initialState: PlanetSliceState = {
  planet: savedPlanet ?? defaultPlanet,
  accentColor: PlanetsColor[savedPlanet ?? defaultPlanet]
};

export const planetSlice = createSlice({
  name: 'planet_slice',
  initialState,
  reducers: {
    setPlanet(state, action: PayloadAction<Planets>) {
      state.planet = action.payload;
      state.accentColor = PlanetsColor[action.payload];
    }
  }
});

export const setPlanet = planetSlice.actions.setPlanet;
