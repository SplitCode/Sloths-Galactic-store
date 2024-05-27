import styles from './Sidebar.module.css';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { choosePlanet, Planets } from '../../store/slices/planet-slice';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import arrowIcon from '../../assets/img/arrow.svg';
import { BgPlanets } from './Bg-planets';

export function Sidebar() {
  const dispatch = useAppDispatch();
  const locationPath = useLocation().pathname;
  const isShow = ['/catalog', '/', '/about', '/profile'].includes(locationPath);
  const planet = useAppSelector((state) => state.planet_slice.planet);
  const [isSidebarVisible, setVisibility] = useState<boolean>(false);
  const onPlanetClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.target instanceof HTMLInputElement) {
      const value = e.target.value as Planets;
      if (value !== planet) {
        setVisibility(false);
        dispatch(choosePlanet(value));
      }
    }
  };

  return (
    isShow && (
      <>
        <BgPlanets />
        <aside className={styles.sidebar + ' ' + (isSidebarVisible ? styles.sidebar__visible : '')}>
          <form className={styles.form}>
            <div className={styles.planet_list}>
              <label className={styles.planet_item}>
                <input
                  type="radio"
                  name="picked"
                  value={Planets.mars}
                  className={styles.planet + ' ' + styles.mars}
                  defaultChecked={planet === Planets.mars}
                  onClick={onPlanetClick}
                />
                _Марс
              </label>
              <label className={styles.planet_item}>
                <input
                  type="radio"
                  name="picked"
                  value={Planets.venus}
                  className={styles.planet + ' ' + styles.venus}
                  defaultChecked={planet === Planets.venus}
                  onClick={onPlanetClick}
                />
                _Венера
              </label>
              <label className={styles.planet_item}>
                <input
                  type="radio"
                  name="picked"
                  value={Planets.earth}
                  defaultChecked={planet === Planets.earth}
                  className={styles.planet + ' ' + styles.earth}
                  onClick={onPlanetClick}
                />
                _Земля
              </label>
            </div>
            <div onClick={() => setVisibility(!isSidebarVisible)} className={styles.arrow_wrapper}>
              <img src={arrowIcon} alt="arrow" className={styles.arrow} />
            </div>
          </form>
        </aside>
      </>
    )
  );
}
