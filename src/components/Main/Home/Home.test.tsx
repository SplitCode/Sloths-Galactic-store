import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Home } from './Home';
import { renderWithProviders } from '../../../helpers/renderWithProviders';
import { Planets, PlanetsColor } from '../../../store/slices/planet-slice';
import { BrowserRouter } from 'react-router-dom';

describe('Home', () => {
  it('displayed correctly', () => {
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      {
        preloadedState: {
          planet_slice: {
            planet: Planets.earth,
            accentColor: PlanetsColor.earth
          }
        }
      }
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Sloth's galactic store");
    const headingsLevel2 = screen.getAllByRole('heading', { level: 2 });
    expect(headingsLevel2.length).toBe(2);
  });
});
