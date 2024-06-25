import { Planets, setPlanet } from '../store/slices/planet-slice';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import type { MouseEventHandler } from 'react';
import { setFilter } from '../store/slices/products-slice';

export const planetsConfig = [
  { value: Planets.mars, label: 'Марс', className: 'mars' },
  { value: Planets.venus, label: 'Венера', className: 'venus' },
  { value: Planets.earth, label: 'Земля', className: 'earth' }
];

export const usePlanetClickHandler = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const onPlanetClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.target instanceof HTMLInputElement) {
      const value = e.target.value as Planets;
      localStorage.setItem('sloth-selectedPlanet', value);
      dispatch(setPlanet(value));
      dispatch(setFilter(null));
      navigation(`/catalog/${value}`);
    }
  };

  return onPlanetClick;
};
